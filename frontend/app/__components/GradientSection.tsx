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
            "color": "#4D1698",
            "enabled": false
        },
        {
            "color": "#573994",
            "enabled": true
        },
        {
            "color": "#797979",
            "enabled": false
        },
        {
            "color": "#482462",
            "enabled": true
        },
        {
            "color": "#f5e1e5",
            "enabled": false
        }
    ],
    "speed": 4,
    "horizontalPressure": 4,
    "verticalPressure": 5,
    "waveFrequencyX": 2,
    "waveFrequencyY": 3,
    "waveAmplitude": 5,
    "shadows": 0,
    "highlights": 2,
    "colorBrightness": 1,
    "colorSaturation": 7,
    "wireframe": false,
    "colorBlending": 6,
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
