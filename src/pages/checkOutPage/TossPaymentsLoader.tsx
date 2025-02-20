import { useEffect } from "react";

declare global {
  interface Window {
    TossPayments?: any;
  }
}

export default function TossPaymentsLoader() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.TossPayments) {
      const script = document.createElement("script");
      script.src = "https://js.tosspayments.com/v1";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null; // UI를 렌더링할 필요 없음
}
