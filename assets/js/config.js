/* =====================================================================
   RelixZoon website settings
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to connect links, the logo,
   artwork and app screenshots. Leave a value as "" (empty) and the site
   automatically shows a tasteful "coming soon" state instead of a broken
   link or a missing image.

   After editing, commit this file to GitHub. No build step needed.
   ===================================================================== */

window.RZ_CONFIG = {

  /* ---------- Links (use full https:// addresses) ---------- */
  links: {
    waitlist:      "https://waitlist.relixzoon.com",   // Launch waitlist (live)
    app:           "",   // Main RelixZoon web app, e.g. "https://app.relixzoon.com"
    discover:      "",   // Public Discover feed in the app, if it can be opened without logging in
    artistSignup:  "",   // Artist registration page — leave empty until registration is public
    fanSignup:     "",   // Fan registration page — leave empty until registration is public
    privacy:       "",   // Privacy Policy page
    terms:         "",   // Terms and Conditions page
    contactEmail:  ""    // e.g. "hello@relixzoon.com" — real, monitored address only
  },

  /* ---------- Social accounts (only filled ones are shown) ---------- */
  social: {
    instagram: "",
    tiktok:    "",
    x:         "",
    youtube:   "",
    facebook:  ""
  },

  /* ---------- Logo ----------
     Put the approved logo files in  assets/brand/  and write the paths here.
     Until a logo is set, the site shows the name "RelixZoon" as plain text. */
  logo: {
    src:     "assets/brand/relixzoon-wordmark.webp",   // approved wordmark (transparent background)
    alt:     "RelixZoon",
    height:  34    // display height in pixels in the navigation
  },

  /* ---------- Section artwork ----------
     Put files in  assets/artwork/  using these names (jpg, png or webp):
       hero.jpg, discover.jpg, artists.jpg, fans.jpg, cta.jpg
     Optional smaller versions for phones: hero-mobile.jpg, etc.
     Recommended: 2400px wide for desktop, 1200px wide for mobile, under 500 KB each. */
  artwork: {
    hero:     { src: "", mobile: "" },   // e.g. { src: "assets/artwork/hero.jpg", mobile: "assets/artwork/hero-mobile.jpg" }
    discover: { src: "", mobile: "" },
    artists:  { src: "", mobile: "" },
    fans:     { src: "", mobile: "" },
    cta:      { src: "", mobile: "" }
  },

  /* ---------- Real app screenshots ----------
     Put PORTRAIT phone screenshots in  assets/screenshots/
     (around 1170 x 2532 px, png or webp). Only real screenshots, please. */
  screenshots: {
    discover:      "",   // e.g. "assets/screenshots/discover.png"
    artistProfile: "",
    releases:      "",
    dashboard:     ""
  }
};
