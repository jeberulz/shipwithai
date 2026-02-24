import { WorkshopPage } from "@/components/workshop/workshop-page";
import { MetaPixelViewContent } from "@/components/meta-pixel-events";

export default function Home() {
  return (
    <>
      <MetaPixelViewContent
        contentName="Workshop Landing Page"
        contentCategory="workshop"
      />
      <WorkshopPage />
    </>
  );
}
