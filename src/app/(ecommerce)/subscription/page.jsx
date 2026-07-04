import { redirect } from "next/navigation";

export default function SubscriptionFallbackPage() {
  redirect("/subscribe");
}
