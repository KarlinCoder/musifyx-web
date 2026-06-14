"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: true } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider
        height="2px"
        color="#48e"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </QueryClientProvider>
  );
}
