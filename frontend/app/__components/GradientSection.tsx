import React, { useEffect, useRef, useState } from "react";
import { NeatConfig, NeatGradient } from "@firecms/neat";

export const GradientSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gradientRef = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      "colors": [
        {
            "color": "#000000",
            "enabled": true
        },
        {
            "color": "#633987",
            "enabled": true
        },
        {
            "color": "#000000",
            "enabled": true
        },
        {
            "color": "#632A8E",
            "enabled": true
        },
        {
            "color": "#a2d2ff",
            "enabled": false
        }
    ],
    "speed": 4,
    "horizontalPressure": 3,
    "verticalPressure": 3,
    "waveFrequencyX": 2,
    "waveFrequencyY": 4,
    "waveAmplitude": 5,
    "shadows": 0,
    "highlights": 2,
    "colorBrightness": 1,
    "colorSaturation": 3,
    "wireframe": false,
    "colorBlending": 5,
    "backgroundColor": "#003FFF",
    "backgroundAlpha": 1,
    "resolution": 1
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
