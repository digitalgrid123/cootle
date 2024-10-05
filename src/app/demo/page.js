// app/demo/page.js
import { redirect } from "next/navigation";

export default function DemoPage() {
  // Redirect to the external URL
  redirect("https://bit.ly/Cootle-Demo-Video");

  // No need to return any content, as the redirect happens immediately
  return null;
}
