"use client";

import * as React from "react";

export function FailureBridge({ reason }: { reason: string }) {
  React.useEffect(() => {
    try {
      const w = window as typeof window & {
        AarithPayBridge?: { onFailure?: (reason: string) => void };
      };
      w.AarithPayBridge?.onFailure?.(reason);
    } catch {
      /* no-op outside WebView */
    }
  }, [reason]);
  return null;
}
