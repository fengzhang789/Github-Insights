import React, { useEffect, useRef, useState } from "react";
import { NeatConfig, NeatGradient } from "@firecms/neat";

export const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gradientRef = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      colors: [
        {
          color: "#1E3A8A", // Dark Blue
          enabled: true,
        },
        {
          color: "#50E3C2", // Aqua
          enabled: false,
        },
        {
          color: "#9013FE", // Purple
          enabled: true,
        },
        {
          color: "#BD10E0", // Light Purple
          enabled: true,
        },
        {
          color: "#7B61FF", // Medium Purple
          enabled: true,
        },
      ],
      speed: 2,
      horizontalPressure: 4,
      verticalPressure: 5,
      waveFrequencyX: 2,
      waveFrequencyY: 3,
      waveAmplitude: 5,
      shadows: 0,
      highlights: 1,
      colorSaturation: 0,
      colorBrightness: 1,
      wireframe: true,
      colorBlending: 6,
      backgroundAlpha: 0,
      resolution: 1 / 2,
    });

    return gradientRef.current.destroy;
  }, [canvasRef.current]);

  return (
    <canvas
      style={{
        isolation: "isolate",
        height: "100%",
        width: "100%",
      }}
      ref={canvasRef}
    />
  );
};
