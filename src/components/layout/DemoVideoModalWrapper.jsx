import { getAboutPayload } from "@/app/api/about/about";
import DemoVideoModalClient from "./DemoVideoModalClient";

export default async function DemoVideoModalWrapper() {
  const about = await getAboutPayload();
  
  if (!about) return null;

  return (
    <DemoVideoModalClient 
      demoVideoUrl={about.demoVideoUrl}
      triggerTimeInSeconds={about.triggerTimeInSeconds}
      isRenderVideoDisable={about.isRenderVideoDisable}
    />
  );
}
