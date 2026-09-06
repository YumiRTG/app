# Feature page update — 2026-09-06

## Follow-up: scene artwork and homepage clarity

At the user's request, the dinosaur, army and alliance icon presentations are replaced by three full-bleed scenes generated with the built-in Imagegen tool. Sources and full prompts are in `artwork/features/README.md`; responsive WebP variants are checked in. All three images were decoded and checked in the browser using `object-fit: cover`.

Homepage copy now distinguishes four core modes from partner dinosaurs and world-boss events, uses “Claim reward” and “Download & Play”, replaces vague metaphors, and removes the only visible engine-name reference. Public beta labels consistently say “Android beta”; no invitation-only or open-access policy is invented. The gameplay portal selects a stable data attribute instead of relying on mutable heading text or IDs rewritten by the page's journey navigation.

Download verification: the existing Gofile link showed “This content does not exist”. The local `Dino Dominion.apk` measured 3,485,701,402 bytes (3.49 decimal GB / 3.25 GiB), but is not the hosted artifact. The user said a replacement link will come later. Download availability is therefore false; the dead link is not rendered, no unverified version/size is shown, and the page explains temporary unavailability. Old hardcoded 2.6-GB copy was removed from homepage, download settings and support answers. An unrelated obsolete management credential was removed from the old download-source comment; no credential values are recorded here.

Validation: TypeScript passed; production build passed with existing warnings. Targeted lint reports only the pre-existing `Navigation.tsx:27` set-state-in-effect finding; that hook was not changed. Browser confirms six feature nodes under the four-core-modes heading, preserved portal attachment after navigation/mutations, updated reward CTA, no obsolete user-reported copy, no mobile horizontal overflow, the three loaded scene images and the disabled download state.

## Initial overview update

The old overview embedded website screenshots in the base/campaign image slots, used an ice landscape for alliances, and described systems with teaser copy. The updated page presents nine concrete gameplay systems plus a partner-dinosaur entry, with descriptive links and artwork from the existing project library. The base and campaign detail banners also use clean artwork.

Content was checked against the Unity progression catalog, TroopType/TroopCombatHelper, CampaignMapUI and the existing mode implementations. No new unlock-level promises were added. Weekly Skill Test wording preserves the weekly reward claim. Artwork is illustrative project artwork; no fabricated gameplay screenshots were introduced.

`scripts/build-feature-images.mjs` reproducibly creates the checked-in 480/960 WebP variants from existing public assets. Sources remain unchanged. Cards reserve image space, lazy-load below-fold artwork, preserve complete roster/emblem images, and include keyboard focus indicators and alt text.

Validation: TypeScript build mode and targeted ESLint on all three changed TSX pages passed. Production Vite build passed (existing ambiguous-duration and bundle-size warnings remain). Agent-browser verified meaningful content, all 12 overview images decoding successfully, nine feature cards, no uncaught page errors, no horizontal overflow at 320/390/768/1440 pixels, and navigation to the base and campaign detail pages. Desktop and mobile screenshots were visually reviewed. No production reward claims or account modifications are part of this update.

Built on production commit `2709dbaee6a3e20765765a45d102ac3cd38b9ce7` in the separate `codex/features-game-content` worktree. The unshipped reward migration is not part of this branch.
