export default function Head() {
  return (
    <>
      {/* iOS PWA Capability - REQUIRED */}
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* iOS App Name */}
      <meta name="apple-mobile-web-app-title" content="RVM" />

      {/* iOS Status Bar Color */}
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* iOS Touch Icons - For Home Screen */}
      <link rel="apple-touch-icon" href="/png/LogoRVM-180.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/png/LogoRVM-180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/png/icon-192x192.png"
      />

      {/* iOS PWA Splash Screen */}
      <link
        rel="apple-touch-startup-image"
        href="/png/icon-512x512.png"
        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/png/icon-512x512.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/png/icon-192x192.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
      />

      {/* Prevent iOS from auto-formatting phone numbers */}
      <meta name="format-detection" content="telephone=no" />

      {/* Full viewport for mobile */}
      <meta name="viewport" content="viewport-fit=cover" />
    </>
  );
}
