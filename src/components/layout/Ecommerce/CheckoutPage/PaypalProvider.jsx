"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCurrency } from "@/context/CurrencyContext";

export default function PayPalProvider({ children }) {
  const { currency } = useCurrency();
  return (
    <PayPalScriptProvider
      options={{
        clientId: "AVqCM8TYJ9Llax_gZrGRQ1VtBCaIemk7n0wXJFWfPIHlz4Fl_PqZgEgnHqK6S8oeOIBtcaNOVKbGXC0G",
        currency: currency || "EUR",
        intent: "capture",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}