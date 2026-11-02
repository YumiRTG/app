/**
 * Checked against the game project on 2026-11-02.
 * Unlocks: Assets/Scripts/Progression/FeatureProgressionCatalog.cs.
 * Defense: TdStageLibrary, TdTowerCatalog, TdTowerUpgrades, TdDifficulty.
 * Horde: Assets/Scripts/Horde/HordeSimulation.cs (HordeRules).
 * Languages: Assets/Scripts/Core/Loc.cs, Supported (Arabic remains planned).
 */
export const GAME_GUIDE = {
  unlock: { campaign: 2, partner: 2, towerDefense: 3, horde: 10, worldMap: 10, arena: 13, teamArena: 21, campaignHard: 24, campaignExtreme: 30 },
  defense: { maps: 13, towerTypes: 13, maxTowerLevel: 6, capstoneMastery: 2 },
  horde: { areas: 300, chapters: 30 },
  languages: ['German', 'Dutch', 'English', 'French', 'Spanish', 'Italian', 'Portuguese', 'Korean', 'Japanese', 'Simplified Chinese', 'Traditional Chinese'],
} as const
