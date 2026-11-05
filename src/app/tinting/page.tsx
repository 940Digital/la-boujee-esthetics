import { ServicePage, serviceMetadata } from "@/components/editorial/ServicePage";

export const metadata = serviceMetadata("tinting");

export default function Page() {
  return <ServicePage slug="tinting" />;
}
