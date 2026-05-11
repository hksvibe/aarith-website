"use client";

import * as React from "react";

/**
 * Notifies the Android WebView's JS bridge a second time on the success
 * page. The /pay page already calls onSuccess in its handler, but if the
 * WebView arrives here via deep-link or refresh, this guarantees the app
 * sees the event.
 */
export function SuccessBridge({
  subscriptionId,
  paymentId
}: {
  subscriptionId?: string;
  paymentId?: string;
}) {
  React.useEffect(() => {
    if (!subscriptionId) return;
    try {
      const w = window as typeof window & {
        AarithPayBridge?: {
          onSuccess?: (subscriptionId: string, paymentId: string) => void;
        };
      };
      w.AarithPayBridge?.onSuccess?.(subscriptionId, paymentId ?? "");
    } catch {
      /* no-op in a normal browser */
    }
  }, [subscriptionId, paymentId]);
  return null;
}
