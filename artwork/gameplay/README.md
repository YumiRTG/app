# Gameplay screenshots

These development captures are published with the game owner's permission from the website tasks on 2–3 November 2026.

Five images are frames from the native Unity gameplay trailer, including its original English captions. The alliance image uses the existing game interface source with sample teams and scores, rendered using the game's English translation catalogue. No gameplay imagery was generated or retouched for the website.

The Live Arena bracket and Hall of Fame are native Unity UI renders using the existing game interface and `Loc.SetLanguage("en")`. Both were captured in an isolated Unity 6000.4.11f1 project for this website update. They contain simulated participants and example results; they do not represent a current live season. The website uses English feature descriptions and a general development notice instead of technical preview labels on individual images. The bracket render includes the Sunday third-place match. Its trophy and flame sprites are existing game assets, whose source is documented in `Docs/TournamentBracketAssets_2026-10-10.md` in the game project.

`provenance.json` records the project-relative sources, video timestamps, source SHA-256 hashes and hashes of both proportional WebP sizes. The 480-pixel files serve the selector thumbnails; 1600-pixel files serve the selected image and full screenshot link. Generated review PNGs remain local.

Game facts were checked against `Docs/LiveRounds_2026-09-26.md`, `Docs/LiveArenaSpectators_2026-10-09.md` and the alliance event client services in the game project. The planned December 2026 Android release was confirmed by the owner in this session; it is a target, not a fixed launch date.

The 3 November refresh also checks `CloudFunctions/functions/live-rounds-policy.js` for the 19:30 UTC third-place match, `live-rounds-service.js` for podium completion, and `Docs/LiveRoundsHallOfFame_2026-10-13.md` for stored season history. The three interface captures use English controls, headings, round labels and captions; native text dumps were checked alongside the images. Original source PNGs, isolated Unity projects and preparation scripts remain local; only the optimized WebP assets and provenance are committed. No real account data or live API writes are used for the captures.
