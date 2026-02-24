import { WorkshopPage } from "@/components/workshop/workshop-page";
import { MetaPixelViewContent } from "@/components/meta-pixel-events";
import { getSiteUrl } from "@/lib/site";
import { WORKSHOP_DETAILS, WORKSHOP_FAQ_ITEMS } from "@/lib/workshop-data";

export default function Home() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: WORKSHOP_DETAILS.organizerName,
        url: siteUrl,
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#instructor`,
        name: WORKSHOP_DETAILS.instructorName,
        jobTitle: WORKSHOP_DETAILS.instructorJobTitle,
        description: WORKSHOP_DETAILS.instructorDescription,
        worksFor: WORKSHOP_DETAILS.instructorEmployers.map((name) => ({
          "@type": "Organization",
          name,
        })),
      },
      {
        "@type": "EducationEvent",
        name: WORKSHOP_DETAILS.name,
        description: WORKSHOP_DETAILS.description,
        startDate: WORKSHOP_DETAILS.startDate,
        endDate: WORKSHOP_DETAILS.endDate,
        eventStatus: WORKSHOP_DETAILS.eventStatus,
        eventAttendanceMode: WORKSHOP_DETAILS.eventAttendanceMode,
        location: {
          "@type": "VirtualLocation",
          url: siteUrl,
          name: WORKSHOP_DETAILS.locationName,
        },
        organizer: { "@id": `${siteUrl}/#organization` },
        performer: { "@id": `${siteUrl}/#instructor` },
        offers: {
          "@type": "Offer",
          price: WORKSHOP_DETAILS.price,
          priceCurrency: WORKSHOP_DETAILS.currency,
          availability: "https://schema.org/InStock",
          url: siteUrl,
        },
        image: `${siteUrl}/opengraph-image`,
        url: siteUrl,
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        mainEntity: WORKSHOP_FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <MetaPixelViewContent
        contentName="Workshop Landing Page"
        contentCategory="workshop"
      />
      <WorkshopPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
