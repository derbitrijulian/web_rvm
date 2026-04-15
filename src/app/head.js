export default function Head() {
  return (
    <>
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

      {/* iOS Status Bar Color */}
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* iOS App Name */}
      <meta name="apple-mobile-web-app-title" content="RVM" />

      {/* Prevent iOS from auto-formatting phone numbers */}
      <meta name="format-detection" content="telephone=no" />

      {/* Full viewport for mobile */}
      <meta name="viewport" content="viewport-fit=cover" />
    </>
  );
}
