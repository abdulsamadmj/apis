// Helper functions for filtering and processing Clash Royale data

import type { Badge, Achievement, ClashRoyalePlayer, CRStatsResponse } from './types';

/**
 * Get top 3 badges sorted by level (descending)
 */
export function getTopBadges(badges: Badge[]): Badge[] {
  return badges
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);
}

/**
 * Get top 3 achievements sorted by value (descending)
 */
export function getTopAchievements(achievements: Achievement[]): Achievement[] {
  return achievements
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);
}

/**
 * Transform Clash Royale API response to our custom format
 */
export function transformPlayerData(playerData: ClashRoyalePlayer): CRStatsResponse {
  return {
    tag: playerData.tag,
    name: playerData.name,
    clan: playerData.clan,
    expLevel: playerData.expLevel,
    topBadges: getTopBadges(playerData.badges),
    trophies: playerData.trophies,
    bestTrophies: playerData.bestTrophies,
    battleCount: playerData.battleCount,
    wins: playerData.wins,
    losses: playerData.losses,
    threeCrownWins: playerData.threeCrownWins,
    arena: playerData.arena,
    achievements: getTopAchievements(playerData.achievements),
    currentFavouriteCard: playerData.currentFavouriteCard,
  };
}
