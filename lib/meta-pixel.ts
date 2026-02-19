import { createHash } from "crypto";

const META_CAPI_URL = "https://graph.facebook.com/v22.0";

function assertMetaConfig(): { accessToken: string; datasetId: string } {
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
  const datasetId = process.env.META_DATASET_ID;
  if (!accessToken) throw new Error("META_CONVERSIONS_API_TOKEN not set");
  if (!datasetId) throw new Error("META_DATASET_ID not set");
  return { accessToken, datasetId };
}

function hashForMeta(value: string): string {
  return createHash("sha256")
    .update(value.toLowerCase().trim())
    .digest("hex");
}

type MetaUserData = {
  em?: string;
  fn?: string;
  ln?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string;
  fbp?: string;
};

type MetaEventPayload = {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: "website";
  user_data: MetaUserData;
  custom_data?: Record<string, unknown>;
};

export async function sendConversionEvent(params: {
  eventName: string;
  eventId: string;
  sourceUrl: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbc?: string;
  fbp?: string;
  customData?: Record<string, unknown>;
}): Promise<void> {
  const { accessToken, datasetId } = assertMetaConfig();

  const userData: MetaUserData = {};
  if (params.email) userData.em = hashForMeta(params.email);
  if (params.firstName) userData.fn = hashForMeta(params.firstName);
  if (params.lastName) userData.ln = hashForMeta(params.lastName);
  if (params.clientIpAddress)
    userData.client_ip_address = params.clientIpAddress;
  if (params.clientUserAgent)
    userData.client_user_agent = params.clientUserAgent;
  if (params.fbc) userData.fbc = params.fbc;
  if (params.fbp) userData.fbp = params.fbp;

  const event: MetaEventPayload = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: params.eventId,
    event_source_url: params.sourceUrl,
    action_source: "website",
    user_data: userData,
    custom_data: params.customData,
  };

  const response = await fetch(
    `${META_CAPI_URL}/${datasetId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Meta CAPI error: ${response.status} ${errorText}`);
  }
}
