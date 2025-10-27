// TypeScript interfaces for Clash Royale API responses

export interface ClashRoyalePlayer {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  wins: number;
  losses: number;
  battleCount: number;
  threeCrownWins: number;
  clan: {
    tag: string;
    name: string;
    badgeId: number;
  };
  arena: {
    id: number;
    name: string;
  };
  badges: Badge[];
  achievements: Achievement[];
  currentFavouriteCard: {
    name: string;
    id: number;
    maxLevel: number;
    maxEvolutionLevel?: number;
    elixirCost: number;
    iconUrls: {
      medium: string;
      evolutionMedium?: string;
    };
    rarity: string;
  };
}

export interface Badge {
  name: string;
  level: number;
  maxLevel: number;
  progress: number;
  target?: number;
  iconUrls: {
    large: string;
  };
}

export interface Achievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo: string | null;
}

export interface CRStatsResponse {
  tag: string;
  name: string;
  clan: {
    tag: string;
    name: string;
    badgeId: number;
  };
  expLevel: number;
  topBadges: Badge[];
  trophies: number;
  bestTrophies: number;
  battleCount: number;
  wins: number;
  losses: number;
  threeCrownWins: number;
  arena: {
    id: number;
    name: string;
  };
  achievements: Achievement[];
  currentFavouriteCard: {
    name: string;
    id: number;
    maxLevel: number;
    maxEvolutionLevel?: number;
    elixirCost: number;
    iconUrls: {
      medium: string;
      evolutionMedium?: string;
    };
    rarity: string;
  };
  isFallback: boolean;
}
