import React from 'react';
import {
  AbsoluteUrl,
  Composition,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Data for state management libraries
const libraries = [
  { name: 'Zustand', downloads: 4.2 },
  { name: 'Redux Toolkit', downloads: 3.8 },
  { name: 'Jotai', downloads: 1.1 },
  { name: 'Valtio', downloads: 0.52 },
  { name: 'Legend State', downloads: 0.085 },
];

// Color gradient from green to teal
const colors = [
  '#22c55e', // green for highest
  '#10b981', // emerald
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#0d9488', // dark teal for lowest
];

// Format download count (e.g., "4.2M", "520K")
const formatDownloads = (count: number): string => {
  if (count >= 1) {
    return `${count.toFixed(1)}M`;
  }
  return `${Math.round(count * 1000)}K`;
};

// Bar component with animation
const AnimatedBar: React.FC<{
  index: number;
  name: string;
  downloads: number;
  maxDownloads: number;
  color: string;
}> = ({ index, name, downloads, maxDownloads, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each bar starts animating 12 frames after the previous one
  const startFrame = index * 12;
  const animationDuration = 30; // frames for bar animation
  const barStartFrame = startFrame;
  const barEndFrame = startFrame + animationDuration;

  // Bar width animation (0 to full width)
  const barProgress = spring({
    frame: frame - barStartFrame,
    fps,
    config: {
      damping: 0.8,
      mass: 1,
      overshootClamping: false,
      tension: 170,
    },
    durationInFrames: animationDuration,
  });

  const finalWidth = (downloads / maxDownloads) * 600; // Max width is 600px
  const currentWidth = barProgress * finalWidth;

  // Text fade in after bar starts
  const textOpacity = interpolate(
    frame - barStartFrame,
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const containerHeight = 60;
  const gap = 20;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: gap,
        height: containerHeight,
      }}
    >
      {/* Library name */}
      <div
        style={{
          width: '180px',
          textAlign: 'right',
          fontSize: 18,
          fontWeight: 600,
          color: '#ffffff',
          opacity: textOpacity,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {name}
      </div>

      {/* Bar background */}
      <div
        style={{
          width: 600,
          height: 40,
          backgroundColor: '#1f2937',
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Animated bar */}
        <div
          style={{
            width: currentWidth,
            height: '100%',
            backgroundColor: color,
            borderRadius: 8,
            transition: 'none',
          }}
        />
      </div>

      {/* Download count */}
      <div
        style={{
          width: '100px',
          fontSize: 18,
          fontWeight: 600,
          color: '#e5e7eb',
          opacity: textOpacity,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {formatDownloads(downloads)}
      </div>
    </div>
  );
};

// Main composition
export const StateManagementComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const maxDownloads = Math.max(...libraries.map((lib) => lib.downloads));

  // Title fade in (frames 0-30)
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Footer fade in (starts at frame 520, 80 frames before end)
  const footerStartFrame = 520;
  const footerOpacity = interpolate(
    frame,
    [footerStartFrame, footerStartFrame + 40],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
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
        paddingTop: '60px',
        fontFamily: 'Inter, sans-serif',
        color: '#ffffff',
      }}
    >
      {/* Title section */}
      <div
        style={{
          opacity: titleOpacity,
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            margin: '0 0 12px 0',
            color: '#ffffff',
          }}
        >
          React State Management in 2026
        </h1>
        <p
          style={{
            fontSize: 24,
            margin: 0,
            color: '#9ca3af',
            fontWeight: 400,
          }}
        >
          Weekly npm downloads
        </p>
      </div>

      {/* Bars container */}
      <div
        style={{
          marginTop: '60px',
          paddingLeft: '80px',
          paddingRight: '80px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        {libraries.map((lib, index) => (
          <AnimatedBar
            key={lib.name}
            index={index}
            name={lib.name}
            downloads={lib.downloads}
            maxDownloads={maxDownloads}
            color={colors[index]}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          fontSize: 16,
          color: '#6b7280',
          opacity: footerOpacity,
        }}
      >
        Source: npmtrends.com · July 2026
      </div>
    </div>
  );
};
