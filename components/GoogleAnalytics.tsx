"use client";

import Script from "next/script";
import { getConsent } from "./CookieConsent";

const GA_MEASUREMENT_ID = "G-7GQD24BRCR";

export function GoogleAnalytics() {
  return (
    <>
      {/* Google Consent Mode v2 — Default: denied */}
      <Script id="google-consent" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
        `}
      </Script>

      {/* Google Analytics — nur laden */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });

          // Check if consent was already given
          const consent = localStorage.getItem('learnhub-cookie-consent');
          if (consent === 'all') {
            gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted'
            });
          }
        `}
      </Script>
    </>
  );
}
