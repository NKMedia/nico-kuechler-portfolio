// GA4 initialization - waits for consent (loaded as external script for CSP without 'unsafe-inline')
globalThis.dataLayer = globalThis.dataLayer || [];
function gtag() {
  globalThis.dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  wait_for_update: 500,
});
gtag("config", "G-GS1PXKRQ8D", {
  anonymize_ip: true,
  cookie_flags: "SameSite=None;Secure",
  // SPA: page_views are sent manually on route change (see AnalyticsTracker)
  send_page_view: false,
});

// Function to load GA4 script after consent
globalThis.loadGA4 = function () {
  if (document.getElementById("ga4-script")) return;
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-GS1PXKRQ8D";
  document.head.appendChild(script);
  gtag("consent", "update", {
    analytics_storage: "granted",
  });
};
