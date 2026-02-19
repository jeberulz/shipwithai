const BEEHIIV_API_URL = "https://api.beehiiv.com/v2";

// Maps application status → automation env var
const STATUS_AUTOMATION_MAP: Record<string, string | undefined> = {
  submitted: process.env.BEEHIIV_AUTOMATION_APPLICATION_RECEIVED,
  accepted: process.env.BEEHIIV_AUTOMATION_ACCEPTED,
  rejected: process.env.BEEHIIV_AUTOMATION_REJECTED,
  paid: process.env.BEEHIIV_AUTOMATION_PAID,
};

function assertBeehiivConfig(): { apiKey: string; publicationId: string } {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey) {
    throw new Error("BEEHIIV_API_KEY environment variable is not set");
  }
  if (!publicationId) {
    throw new Error("BEEHIIV_PUBLICATION_ID environment variable is not set");
  }

  return { apiKey, publicationId };
}

type BeehiivSubscriberPayload = {
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referring_site?: string;
  custom_fields?: { name: string; value: string }[];
  reactivate_existing?: boolean;
  send_welcome_email?: boolean;
};

type BeehiivSubscriberResponse = {
  data: {
    id: string;
    email: string;
    status: string;
  };
};

export async function createBeehiivSubscriber(payload: {
  email: string;
  fullName: string;
  role: string;
  company: string;
  cohortSlug: string;
}): Promise<string> {
  const { apiKey, publicationId } = assertBeehiivConfig();

  const body: BeehiivSubscriberPayload = {
    email: payload.email,
    reactivate_existing: true,
    send_welcome_email: false,
    utm_source: "shipwithai",
    utm_medium: "application",
    utm_campaign: "cohort-1",
    custom_fields: [
      { name: "full_name", value: payload.fullName },
      { name: "role", value: payload.role },
      { name: "company", value: payload.company || "" },
    ],
  };

  const response = await fetch(
    `${BEEHIIV_API_URL}/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Beehiiv API error: ${response.status} ${errorText}`);
  }

  const data: BeehiivSubscriberResponse = await response.json();
  const subscriberId = data.data.id;

  // Apply tags via separate PATCH call (best-effort; don't fail subscriber creation)
  try {
    await updateBeehiivTags(
      subscriberId,
      [`cohort:${payload.cohortSlug}`, "status:applied"],
      []
    );
  } catch (tagError) {
    console.error("Beehiiv tag assignment failed (subscriber was created):", tagError);
  }

  // Enroll in "Application Received" automation via dedicated journeys endpoint
  try {
    await enrollInAutomation(payload.email, "submitted");
  } catch (automationError) {
    console.error(
      "Beehiiv automation enrollment failed (subscriber was created):",
      automationError instanceof Error ? automationError.message : automationError
    );
  }

  return subscriberId;
}

export async function updateBeehiivTags(
  subscriberId: string,
  tagsToAdd: string[],
  tagsToRemove: string[]
): Promise<void> {
  const { apiKey, publicationId } = assertBeehiivConfig();

  const response = await fetch(
    `${BEEHIIV_API_URL}/publications/${publicationId}/subscriptions/${subscriberId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags_to_add: tagsToAdd,
        tags_to_remove: tagsToRemove,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Beehiiv tag update error: ${response.status} ${errorText}`);
  }
}

/**
 * Enroll an existing subscriber in an automation by status.
 * Called when admin changes application status (accepted, rejected, paid).
 */
export async function enrollInAutomation(
  email: string,
  status: string
): Promise<void> {
  const { apiKey, publicationId } = assertBeehiivConfig();
  const automationId = STATUS_AUTOMATION_MAP[status];
  if (!automationId || automationId === "your-automation-id-here") return;

  const response = await fetch(
    `${BEEHIIV_API_URL}/publications/${publicationId}/automations/${automationId}/journeys`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Beehiiv automation enrollment error: ${response.status} ${errorText}`);
  }
}
