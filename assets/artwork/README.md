# Section artwork goes here

| Section | Desktop file | Optional phone file |
|---|---|---|
| Hero (top of page) | `hero.jpg` | `hero-mobile.jpg` |
| Discover music | `discover.jpg` | `discover-mobile.jpg` |
| Built for independent artists | `artists.jpg` | `artists-mobile.jpg` |
| Made for music fans | `fans.jpg` | `fans-mobile.jpg` |
| Final call to action | `cta.jpg` | `cta-mobile.jpg` |

Tips: desktop ~2400px wide, phone ~1200px wide, under 500 KB each (jpg or webp).
Keep important details away from the bottom-left of the hero image — the headline sits there.

After uploading, list the files in `assets/js/config.js` under `artwork`, e.g.
`hero: { src: "assets/artwork/hero.jpg", mobile: "assets/artwork/hero-mobile.jpg" }`.
Until then each section shows its built-in pink-and-black visual.
