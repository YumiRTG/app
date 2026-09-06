# Tweak Vale — website roster addition

Tweak Vale is now in the shared hero catalogue, so the hero details and Bestiary both show seven heroes. His entry is directly addressable at `/features/heroes#tweak-vale`.

The portrait is a 960-pixel WebP conversion of the existing game asset `Assets/Resources/bloodfang_warlord_hero.png`; the original is unchanged. Name, legendary rarity and infantry class were checked against `HeroManager.CreateBloodfangWarlordHeroData`. Area damage, bleed and the once-per-battle survival at exactly 1 HP with no shield were checked against `CampaignSkillRegistry` and `TweakValeHeroTests`. No invented character artwork or stats.

Validation: TypeScript, targeted ESLint and production build passed (existing build warnings remain). Browser verified the seven entries, loaded original portrait, Bestiary link and desktop/mobile layout. The settled 390-pixel view has no horizontal overflow; initial reveal animations can temporarily extend its bounds. No game logic or reward functionality changed.

Prepared separately from other in-progress website edits, on top of `baac9f4f21b9065cc00ffa742da293efc6b3b221`.
