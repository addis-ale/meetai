"use client";

import { authClient } from "@/lib/auth-client";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  if (!session) {
    <p>Loading...</p>;
  }
  return <div>home view</div>;
};
