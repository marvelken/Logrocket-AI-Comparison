import React from 'react';
import { Composition } from 'remotion';
import { StateManagementComparison } from './compositions/StateManagementComparison';
import { AiPowerRankings } from './compositions/AiPowerRankings';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="state-management-comparison"
        component={StateManagementComparison}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="ai-power-rankings"
        component={AiPowerRankings}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
