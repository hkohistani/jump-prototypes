// Mock data service for AI-recommended campaigns

export interface OpportunityData {
  id: string;
  type: 'underperforming_inventory' | 'at_risk_segment' | 'conversion_opportunity' | 'fan_engagement';
  title: string;
  description: string;
  metrics: {
    current: number;
    target: number;
    gap: number;
    unit: string;
  };
  impact: {
    value: number;
    currency: string;
    type: 'revenue' | 'retention' | 'upsell' | 'engagement';
  };
  urgency: {
    level: 'high' | 'medium' | 'low';
    deadline?: string;
    daysRemaining?: number;
  };
  confidence: number;
  suggestedAction: string;
  chatPrompt: string;
  event: {
    type: 'game' | 'deadline' | 'opportunity' | 'fan_segment';
    title: string;
    date: string;
  };
  relatedData: {
    eventId?: string;
    segmentId?: string;
    inventorySnapshot?: object;
    fanProfileStats?: {
      attendanceRecord?: { season: string; allTime: string };
      milestones?: string[];
      currentStreak?: { type: string; count: number };
      mostMemorables?: Array<{ game: string; reason: string }>;
    };
  };
  category?: 'season' | 'fan_profile';
}

const mockRecommendations: OpportunityData[] = [
  {
    id: 'rec-1',
    type: 'conversion_opportunity',
    title: 'Playoff Priority Access Campaign',
    description: '2,840 season ticket holders eligible for playoff priority',
    category: 'season',
    metrics: {
      current: 2840,
      target: 3500,
      gap: 660,
      unit: 'renewal targets'
    },
    impact: {
      value: 4200000,
      currency: 'USD',
      type: 'revenue'
    },
    urgency: {
      level: 'high',
      deadline: 'Mar 1, 2026',
      daysRemaining: 47
    },
    confidence: 92,
    suggestedAction: 'Launch playoff priority campaign to drive early season ticket renewals with exclusive playoff access',
    chatPrompt: 'Create a campaign offering priority playoff ticket access to season ticket holders who renew by March 1. Emphasize exclusive benefits, early bird pricing, and guaranteed playoff seats.',
    event: {
      type: 'deadline',
      title: 'Playoff Priority Deadline',
      date: 'Mar 1, 2026'
    },
    relatedData: {
      segmentId: 'segment-sth-playoff-priority',
      inventorySnapshot: {
        totalSeasonTicketHolders: 2840,
        targetRenewals: 3500,
        avgAccountValue: 4800,
        playoffInterestScore: 0.89
      }
    }
  },
  {
    id: 'rec-2',
    type: 'at_risk_segment',
    title: 'Retain At-Risk Season Ticket Holders',
    description: '847 accounts showing low engagement',
    category: 'season',
    metrics: {
      current: 847,
      target: 0,
      gap: 847,
      unit: 'at-risk accounts'
    },
    impact: {
      value: 2100000,
      currency: 'USD',
      type: 'retention'
    },
    urgency: {
      level: 'high',
      deadline: 'Feb 1, 2026',
      daysRemaining: 20
    },
    confidence: 89,
    suggestedAction: 'Launch personalized retention campaign with exclusive perks and early renewal incentives',
    chatPrompt: 'Create a retention campaign for 847 season ticket holders showing low engagement. Offer exclusive perks, VIP experiences, and early renewal discounts to prevent churn before Feb 1 deadline.',
    event: {
      type: 'deadline',
      title: 'Season Ticket Renewals',
      date: 'Feb 1, 2026'
    },
    relatedData: {
      segmentId: 'segment-atrisk-sth',
      inventorySnapshot: {
        totalAccounts: 847,
        avgAccountValue: 2480,
        riskScore: 'high'
      }
    }
  },
  {
    id: 'rec-3',
    type: 'conversion_opportunity',
    title: 'Convert Flex to Half Season Plans',
    description: '1,240 flex plan holders with 8+ game purchases',
    category: 'season',
    metrics: {
      current: 1240,
      target: 500,
      gap: 740,
      unit: 'conversion targets'
    },
    impact: {
      value: 620000,
      currency: 'USD',
      type: 'upsell'
    },
    urgency: {
      level: 'medium',
      deadline: 'Prime conversion window',
      daysRemaining: undefined
    },
    confidence: 87,
    suggestedAction: 'Create upsell campaign highlighting cost savings and premium benefits of half season plans',
    chatPrompt: 'Create an upsell campaign targeting 1,240 flex plan holders who have purchased 8+ games. Show them cost savings and exclusive benefits of upgrading to half season membership.',
    event: {
      type: 'opportunity',
      title: 'Flex Plan Conversions',
      date: 'Ongoing'
    },
    relatedData: {
      segmentId: 'segment-flex-heavy-users',
      inventorySnapshot: {
        totalFlexHolders: 1240,
        avgGamesAttended: 9.2,
        conversionRate: 0.42
      }
    }
  },
  // Fan Profile-Based Opportunities
  {
    id: 'fan-1',
    type: 'fan_engagement',
    category: 'fan_profile',
    title: 'Milestone Game Celebration',
    description: '423 fans approaching their 50th, 100th, or milestone games',
    metrics: {
      current: 423,
      target: 350,
      gap: 73,
      unit: 'milestone fans'
    },
    impact: {
      value: 280000,
      currency: 'USD',
      type: 'engagement'
    },
    urgency: {
      level: 'medium',
      deadline: 'Next 30 games',
      daysRemaining: undefined
    },
    confidence: 94,
    suggestedAction: 'Create personalized milestone celebration campaign with commemorative perks',
    chatPrompt: 'Create a campaign targeting 423 fans approaching milestone games (50th, 100th, 250th). Offer personalized recognition, commemorative gifts, exclusive photo ops, and special in-game announcements to celebrate their loyalty.',
    event: {
      type: 'fan_segment',
      title: 'Milestone Fans',
      date: 'Ongoing'
    },
    relatedData: {
      segmentId: 'segment-milestone-fans',
      fanProfileStats: {
        milestones: ['100th game (89 fans)', '50th game (201 fans)', '250th game (42 fans)', '500th game (12 fans)']
      }
    }
  },
  {
    id: 'fan-2',
    type: 'fan_engagement',
    category: 'fan_profile',
    title: 'Super Fan Recognition',
    description: '1,127 high-attendance fans with 5+ season streak',
    metrics: {
      current: 1127,
      target: 750,
      gap: 377,
      unit: 'super fans'
    },
    impact: {
      value: 1200000,
      currency: 'USD',
      type: 'upsell'
    },
    urgency: {
      level: 'high',
      deadline: 'Season Ticket Window',
      daysRemaining: 35
    },
    confidence: 91,
    suggestedAction: 'Launch VIP upgrade campaign offering exclusive super fan benefits and season ticket conversion',
    chatPrompt: 'Create a VIP campaign for 1,127 super fans with 5+ consecutive season attendance records and high engagement. Offer exclusive benefits, early playoff access, meet-and-greets, and priority season ticket conversion with special pricing.',
    event: {
      type: 'fan_segment',
      title: 'Super Fans',
      date: 'Ongoing'
    },
    relatedData: {
      segmentId: 'segment-super-fans',
      fanProfileStats: {
        attendanceRecord: { season: '15+ games avg', allTime: '200+ games' },
        currentStreak: { type: 'consecutive seasons', count: 5 }
      }
    }
  },
  {
    id: 'fan-3',
    type: 'fan_engagement',
    category: 'fan_profile',
    title: 'Win Streak Celebration',
    description: '892 fans on 3+ game winning streaks',
    metrics: {
      current: 892,
      target: 600,
      gap: 292,
      unit: 'streak fans'
    },
    impact: {
      value: 340000,
      currency: 'USD',
      type: 'engagement'
    },
    urgency: {
      level: 'medium',
      deadline: 'Next 10 games',
      daysRemaining: undefined
    },
    confidence: 88,
    suggestedAction: 'Create momentum campaign celebrating fan win streaks with streak continuation perks',
    chatPrompt: 'Create a win streak celebration campaign for 892 fans who attended 3+ consecutive wins. Encourage them to keep their streak alive with special "Keep the Streak" discounts, streak milestone rewards, and gamified leaderboards.',
    event: {
      type: 'fan_segment',
      title: 'Winning Streak Fans',
      date: 'Ongoing'
    },
    relatedData: {
      segmentId: 'segment-win-streak-fans',
      fanProfileStats: {
        currentStreak: { type: 'wins', count: 3 }
      }
    }
  },
  {
    id: 'fan-4',
    type: 'fan_engagement',
    category: 'fan_profile',
    title: 'Historic Moments Callback',
    description: '2,341 fans who attended playoff/championship games',
    metrics: {
      current: 2341,
      target: 1500,
      gap: 841,
      unit: 'memorable fans'
    },
    impact: {
      value: 890000,
      currency: 'USD',
      type: 'engagement'
    },
    urgency: {
      level: 'high',
      deadline: 'Prime matchups window',
      daysRemaining: 25
    },
    confidence: 93,
    suggestedAction: 'Target fans who attended historic games with nostalgia-driven campaign for upcoming marquee matchups',
    chatPrompt: 'Create a "Relive the Magic" campaign for 2,341 fans who attended playoff, championship, or milestone games. Use nostalgic callbacks to their most memorable moments and invite them to create new memories at upcoming marquee matchups.',
    event: {
      type: 'fan_segment',
      title: 'Historic Game Alumni',
      date: 'Ongoing'
    },
    relatedData: {
      segmentId: 'segment-memorable-fans',
      fanProfileStats: {
        mostMemorables: [
          { game: '2024 Playoff Game 7', reason: 'Conference Finals Win' },
          { game: '2023 Championship Night', reason: 'Record Night' },
          { game: '2022 Rival Showdown', reason: 'Playoff Win' }
        ]
      }
    }
  },
  {
    id: 'fan-5',
    type: 'fan_engagement',
    category: 'fan_profile',
    title: 'Casual to Regular Conversion',
    description: '3,218 fans with 5-10 games attended, not yet season ticket holders',
    metrics: {
      current: 3218,
      target: 1200,
      gap: 2018,
      unit: 'conversion targets'
    },
    impact: {
      value: 1800000,
      currency: 'USD',
      type: 'upsell'
    },
    urgency: {
      level: 'high',
      deadline: 'Mid-season window',
      daysRemaining: 42
    },
    confidence: 85,
    suggestedAction: 'Convert engaged casual fans to partial season plans with tailored upgrade paths',
    chatPrompt: 'Create a conversion campaign for 3,218 fans who attended 5-10 games this season but are not season ticket holders. Show them the value of upgrading to flex or half-season plans with cost savings, priority access, and exclusive member benefits.',
    event: {
      type: 'fan_segment',
      title: 'Regular Attendees',
      date: 'Ongoing'
    },
    relatedData: {
      segmentId: 'segment-casual-regulars',
      fanProfileStats: {
        attendanceRecord: { season: '5-10 games', allTime: '15-30 games' }
      }
    }
  }
];

export function getActiveRecommendations(): OpportunityData[] {
  // Return all recommendations sorted by urgency and confidence
  return mockRecommendations.sort((a, b) => {
    // Sort by urgency first
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    const urgencyDiff = urgencyOrder[a.urgency.level] - urgencyOrder[b.urgency.level];
    if (urgencyDiff !== 0) return urgencyDiff;

    // Then by confidence
    return b.confidence - a.confidence;
  });
}

export function getRecommendationById(id: string): OpportunityData | null {
  return mockRecommendations.find(rec => rec.id === id) || null;
}

export function formatImpact(impact: OpportunityData['impact']): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: impact.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(impact.value);

  const typeLabels = {
    revenue: 'potential revenue',
    retention: 'churn risk',
    upsell: 'upsell revenue',
    engagement: 'engagement value'
  };

  return `${formatted} ${typeLabels[impact.type]}`;
}

export function formatUrgency(urgency: OpportunityData['urgency']): string {
  if (urgency.daysRemaining !== undefined) {
    const days = urgency.daysRemaining;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days left`;
  }
  return urgency.deadline || 'Prime opportunity';
}

export function getRecommendationsByCategory(category: 'season' | 'fan_profile'): OpportunityData[] {
  return mockRecommendations
    .filter(rec => rec.category === category)
    .sort((a, b) => {
      // Sort by urgency first
      const urgencyOrder = { high: 0, medium: 1, low: 2 };
      const urgencyDiff = urgencyOrder[a.urgency.level] - urgencyOrder[b.urgency.level];
      if (urgencyDiff !== 0) return urgencyDiff;

      // Then by confidence
      return b.confidence - a.confidence;
    });
}

export function getSeasonRecommendations(): OpportunityData[] {
  return getRecommendationsByCategory('season');
}

export function getFanProfileRecommendations(): OpportunityData[] {
  return getRecommendationsByCategory('fan_profile');
}
