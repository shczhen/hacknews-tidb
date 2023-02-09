import Script from 'next/script';

// https://nextjs.org/docs/messages/next-script-for-ga
export default function GA4() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-1KNCM2P86H"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-1KNCM2P86H');
        `}
      </Script>
    </>
  );
}
