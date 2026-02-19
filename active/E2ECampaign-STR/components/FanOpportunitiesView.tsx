'use client';

import { useState, useEffect } from 'react';
import { getFanProfileRecommendations, OpportunityData } from '../lib/mockRecommendations';
import OpportunityCard from './OpportunityCard';

export default function FanOpportunitiesView() {
  const [isVisible, setIsVisible] = useState(false);
  const userTypes = getFanProfileRecommendations();

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Group recommendations by event (fan segment)
  const eventGroups = userTypes.reduce((groups, rec) => {
    const eventKey = rec.event.title;
    if (!groups[eventKey]) {
      groups[eventKey] = {
        event: rec.event,
        recommendations: []
      };
    }
    groups[eventKey].recommendations.push(rec);
    return groups;
  }, {} as Record<string, { event: OpportunityData['event']; recommendations: OpportunityData[] }>);

  let cardIndex = 0;

  return (
    <div className="px-8 py-6">
      {/* Section Header */}
      <div
        className="mb-6 transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        <h2 className="text-2xl font-bold text-black tracking-tight mb-2">
          Fan Profile-Based Opportunities
        </h2>
        <p className="text-sm text-[rgba(0,0,0,0.65)] tracking-tight">
          Campaign opportunities based on fan attendance history, milestones, streaks, and memorable moments
        </p>
      </div>

      {/* Info Banner */}
      <div
        className="mb-8 p-6 bg-gradient-to-r from-[rgba(76,101,240,0.08)] to-[rgba(76,101,240,0.03)] border border-[rgba(76,101,240,0.2)] rounded-lg transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          transitionDelay: '100ms',
        }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#4c65f0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-black tracking-tight mb-2">
              Powered by Fan Profile Stats
            </h3>
            <p className="text-sm text-[rgba(0,0,0,0.7)] tracking-tight mb-3">
              These opportunities are generated from a separate prototype showing detailed fan profiles including:
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#4c65f0" className="flex-shrink-0 mt-0.5">
                  <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" />
                </svg>
                <span className="text-[rgba(0,0,0,0.75)]">
                  <strong>Attendance Record:</strong> Season and all-time win/loss records
                </span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#4c65f0" className="flex-shrink-0 mt-0.5">
                  <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" />
                </svg>
                <span className="text-[rgba(0,0,0,0.75)]">
                  <strong>Milestones:</strong> 50th, 100th, 250th game celebrations coming up
                </span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#4c65f0" className="flex-shrink-0 mt-0.5">
                  <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" />
                </svg>
                <span className="text-[rgba(0,0,0,0.75)]">
                  <strong>Current Streak:</strong> Consecutive wins/losses attended (neutral framing)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#4c65f0" className="flex-shrink-0 mt-0.5">
                  <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" />
                </svg>
                <span className="text-[rgba(0,0,0,0.75)]">
                  <strong>Most Memorables:</strong> Top 3 playoff/championship games attended
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Fan Segment Sections */}
      <div className="flex flex-col gap-8">
        {Object.entries(eventGroups).map(([eventTitle, { event, recommendations: groupRecs }], groupIndex) => (
          <div
            key={eventTitle}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: `${200 + groupIndex * 150}ms`,
            }}
          >
            {/* Fan Segment Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#4c65f0">
                  <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 14a4 4 0 014-4h4a4 4 0 014 4v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" />
                </svg>
                <h3 className="text-lg font-bold text-black tracking-tight">
                  {eventTitle}
                </h3>
              </div>
              <span className="text-sm text-[rgba(0,0,0,0.65)] tracking-tight">
                {event.date}
              </span>
              <div className="flex-1 h-[1px] bg-[rgba(0,0,0,0.1)]"></div>
            </div>

            {/* Opportunity Cards for this Segment */}
            <div className="grid grid-cols-3 gap-6">
              {groupRecs.map((opportunity) => {
                const currentIndex = cardIndex++;
                return (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    delay={400 + (currentIndex * 150)}
                    isVisible={isVisible}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
