# Cinematic Show image assets

The movie catalog uses local assets so the site works without an image host. Replace any SVG with a legally obtained JPG or PNG while keeping the same basename and updating the extension in `js/app.js` only when needed.

| Movie | Poster | Backdrop |
| --- | --- | --- |
| Leo | `images/posters/leo.svg` | `images/backdrops/leo-backdrop.svg` |
| Interstellar | `images/posters/interstellar.svg` | `images/backdrops/interstellar-backdrop.svg` |
| Avatar | `images/posters/avatar.svg` | `images/backdrops/avatar-backdrop.svg` |
| Dune: Part Two | `images/posters/dune-part-two.svg` | `images/backdrops/dune-part-two-backdrop.svg` |
| The Batman | `images/posters/the-batman.svg` | `images/backdrops/the-batman-backdrop.svg` |
| Jailer | `images/posters/jailer.svg` | `images/backdrops/jailer-backdrop.svg` |
| Oppenheimer | `images/posters/oppenheimer.svg` | `images/backdrops/oppenheimer-backdrop.svg` |
| Pathaan | `images/posters/pathaan.svg` | `images/backdrops/pathaan-backdrop.svg` |
| Salaar | `images/posters/salaar.svg` | `images/backdrops/salaar-backdrop.svg` |
| Kalki 2898 AD | `images/posters/kalki-2898-ad.svg` | `images/backdrops/kalki-2898-ad-backdrop.svg` |
| Maharaja | `images/posters/maharaja.svg` | `images/backdrops/maharaja-backdrop.svg` |
| Barbie | `images/posters/barbie.svg` | `images/backdrops/barbie-backdrop.svg` |
| Mission Impossible | `images/posters/mission-impossible.svg` | `images/backdrops/mission-impossible-backdrop.svg` |
| Maamannan | `images/posters/maamannan.svg` | `images/backdrops/maamannan-backdrop.svg` |

The SVGs are bundled, branded Cinematic Show artwork rather than third-party movie key art. They are valid local image assets and can be replaced with licensed movie artwork without changing any rendering code beyond the catalog path extension. Missing poster files are caught by `handlePosterError()` and replaced with a readable Cinematic Show fallback card.
