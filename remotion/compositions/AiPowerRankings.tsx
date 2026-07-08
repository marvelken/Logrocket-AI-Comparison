import React from 'react';
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// AI Model data
const aiModels = [
  { name: 'Claude Opus 4.7', elo: 1567, rank: 1, indicator: '' },
  { name: 'Qwen 3.7 Max', elo: 1541, rank: 2, indicator: '🆕' },
  { name: 'Claude Opus 4.6', elo: 1538, rank: 3, indicator: '' },
  { name: 'Claude Sonnet 4.6', elo: 1523, rank: 4, indicator: '↔️' },
  { name: 'GPT-5.5', elo: 1505, rank: 5, indicator: '🆕' },
];

// AI Tool data
const aiTools = [
  { name: 'OpenCode', position: 1, indicator: '🆕', detail: '160K+ GitHub Stars' },
  { name: 'Cursor', position: 2, indicator: '⬇️', detail: 'Full-IDE' },
  { name: 'Claude Code', position: 3, indicator: '↔️', detail: 'Quality-First CLI' },
  { name: 'Windsurf', position: 4, indicator: '⬇️', detail: 'Arena Mode' },
  { name: 'Antigravity', position: 5, indicator: '⬇️', detail: 'Free Disruptor' },
];

// AnimatedBar component (reusable)
const AnimatedBar: React.FC<{
  index: number;
  label: string;
  value: number;
  maxValue: number;
  isGold: boolean;
  indicator?: string;
  sectionStartFrame: number;
}> = ({ index, label, value, maxValue, isGold, indicator, sectionStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = sectionStartFrame + index * 12;
  const animationDuration = 30;

  const barProgress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 0.8,
      mass: 1,
      overshootClamping: false,
      tension: 170,
    },
    durationInFrames: animationDuration,
  });

  const finalWidth = (value / maxValue) * 550;
  const currentWidth = barProgress * finalWidth;

  const textOpacity = interpolate(frame - startFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barColor = isGold ? '#ffd700' : '#4a7c9e';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: 24,
        height: 50,
      }}
    >
      {/* Label with indicator */}
      <div
        style={{
          width: '240px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {label}
        </span>
        {indicator && (
          <span style={{ fontSize: 18 }}>{indicator}</span>
        )}
      </div>

      {/* Bar background */}
      <div
        style={{
          width: 550,
          height: 36,
          backgroundColor: '#1f2937',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        {/* Animated bar */}
        <div
          style={{
            width: currentWidth,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: 6,
          }}
        />
      </div>

      {/* Value display */}
      <div
        style={{
          width: '100px',
          fontSize: 16,
          fontWeight: 600,
          color: '#e5e7eb',
          opacity: textOpacity,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {typeof value === 'number' && value > 100
          ? `${value} Elo`
          : `#${value}`}
      </div>
    </div>
  );
};

// Section component
const Section: React.FC<{
  title: string;
  subtitle: string;
  footerText: string;
  data: Array<{ name: string; elo?: number; position?: number; rank?: number; indicator?: string; detail?: string }>;
  isModels: boolean;
  sectionStartFrame: number;
  sectionDuration: number;
}> = ({
  title,
  subtitle,
  footerText,
  data,
  isModels,
  sectionStartFrame,
  sectionDuration,
}) => {
  const frame = useCurrentFrame();

  // Title fade in
  const titleOpacity = interpolate(
    frame - sectionStartFrame,
    [0, 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Footer fade in (last 3 seconds = 90 frames)
  const footerStartFrame = sectionStartFrame + sectionDuration - 90;
  const footerOpacity = interpolate(
    frame,
    [footerStartFrame, footerStartFrame + 40],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const maxValue = Math.max(
    ...data.map((item) => item.elo || item.position || 0)
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '50px',
        fontFamily: 'Inter, sans-serif',
        color: '#ffffff',
        position: 'relative',
      }}
    >
      {/* Title */}
      <div style={{ opacity: titleOpacity, marginBottom: '30px', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin: '0 0 8px 0',
            color: '#ffffff',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 20,
            margin: 0,
            color: '#9ca3af',
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Bars */}
      <div style={{ marginTop: '40px', paddingLeft: '60px', width: '100%' }}>
        {data.map((item, index) => (
          <AnimatedBar
            key={`${item.name}-${index}`}
            index={index}
            label={item.name}
            value={item.elo || item.position || 0}
            maxValue={maxValue}
            isGold={index === 0}
            indicator={item.indicator}
            sectionStartFrame={sectionStartFrame}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          fontSize: 14,
          color: '#6b7280',
          opacity: footerOpacity,
          textAlign: 'center',
        }}
      >
        {footerText}
      </div>
    </div>
  );
};

// Main composition
export const AiPowerRankings: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Section timing
  const section1Start = 0;
  const section1End = 360; // 12 seconds
  const transitionStart = 360;
  const transitionEnd = 390; // 1 second transition
  const section2Start = 390;
  const section2End = 750; // 25 seconds total

  // Transition opacity
  const section1Opacity = interpolate(
    frame,
    [section1Start, transitionStart, transitionEnd],
    [1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const section2Opacity = interpolate(
    frame,
    [transitionStart, transitionEnd, section2End],
    [0, 0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Section 1: AI Models */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: section1Opacity }}>
        <Section
          title="AI Model Rankings — June 2026"
          subtitle="WebDev Arena Elo Scores"
          footerText="Full rankings: blog.logrocket.com/ai-dev-tool-power-rankings"
          data={aiModels}
          isModels={true}
          sectionStartFrame={section1Start}
          sectionDuration={section1End - section1Start}
        />
      </div>

      {/* Section 2: AI Tools */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: section2Opacity }}>
        <Section
          title="AI Tool Rankings — June 2026"
          subtitle="Ranked by workflow integration, value, and performance"
          footerText="Full rankings: blog.logrocket.com/ai-dev-tool-power-rankings"
          data={aiTools}
          isModels={false}
          sectionStartFrame={section2Start}
          sectionDuration={section2End - section2Start}
        />
      </div>
    </div>
  );
};
