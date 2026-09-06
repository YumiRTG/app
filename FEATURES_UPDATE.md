# Feature page update — 2026-09-06

The old overview embedded website screenshots in the base/campaign image slots, used an ice landscape for alliances, and described systems with teaser copy. The updated page presents nine concrete gameplay systems plus a partner-dinosaur entry, with descriptive links and artwork from the existing project library. The base and campaign detail banners also use clean artwork.

Content was checked against the Unity progression catalog, TroopType/TroopCombatHelper, CampaignMapUI and the existing mode implementations. No new unlock-level promises were added. Weekly Skill Test wording preserves the weekly reward claim. Artwork is illustrative project artwork; no fabricated gameplay screenshots were introduced.

`scripts/build-feature-images.mjs` reproducibly creates the checked-in 480/960 WebP variants from existing public assets. Sources remain unchanged. Cards reserve image space, lazy-load below-fold artwork, preserve complete roster/emblem images, and include keyboard focus indicators and alt text.

Validation: TypeScript build mode and targeted ESLint on all three changed TSX pages passed. Production Vite build passed (existing ambiguous-duration and bundle-size warnings remain). Agent-browser verified meaningful content, all 12 overview images decoding successfully, nine feature cards, no uncaught page errors, no horizontal overflow at 320/390/768/1440 pixels, and navigation to the base and campaign detail pages. Desktop and mobile screenshots were visually reviewed. No production reward claims or account modifications are part of this update.

Built on production commit `2709dbaee6a3e20765765a45d102ac3cd38b9ce7` in the separate `codex/features-game-content` worktree. The unshipped reward migration is not part of this branch.
