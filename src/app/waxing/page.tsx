import { ServicePage, serviceMetadata } from "@/components/ServicePage";

export const metadata = serviceMetadata("waxing");

export default function Page() {
  return <ServicePage slug="waxing" />;
}
