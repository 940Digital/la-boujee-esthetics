import { ServicePage, serviceMetadata } from "@/components/editorial/ServicePage";

export const metadata = serviceMetadata("waxing");

export default function Page() {
  return <ServicePage slug="waxing" />;
}
