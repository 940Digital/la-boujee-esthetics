import { ServicePage, serviceMetadata } from "@/components/ServicePage";

export const metadata = serviceMetadata("facials");

export default function Page() {
  return <ServicePage slug="facials" />;
}
