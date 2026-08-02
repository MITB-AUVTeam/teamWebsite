"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform vec3 uColor;
varying vec2 vUv;

// Tileable 2D Hash function
vec2 hash2(vec2 p, float period) {
    p = mod(p, period);
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123);
}

// Tileable Voronoi calculating F2 - F1 for sharp caustic ridges
float causticPattern(vec2 p, float period, float t) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    
    float F1 = 8.0;
    float F2 = 8.0;
    
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash2(n + g, period);
            
            // Animate with constrained jitter to prevent cell-crossing artifacts
            o = 0.5 + 0.4 * sin(t + 6.2831853 * o);
            
            vec2 r = g + o - f;
            float d = dot(r, r);
            
            if (d < F1) {
                F2 = F1;
                F1 = d;
            } else if (d < F2) {
                F2 = d;
            }
        }
    }
    return F2 - F1;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalize coordinates
    vec2 uv = fragCoord.xy / iResolution.xy;
    
    // Time scaling for fluid motion
    float t = iTime * 0.8;
    
    // Wave Refraction Distortion: Warping UVs dynamically with sinusoidal wave patterns
    // This creates an organic liquid flow look
    vec2 distortedUv = uv;
    distortedUv.x += sin(uv.y * 6.28 + t) * 0.025;
    distortedUv.y += cos(uv.x * 6.28 + t * 0.8) * 0.025;
    
    // Grid scale and matching period for perfect tiling
    float period = 4.0;
    
    // We compute the pattern with slight offsets for different channels to achieve
    // high-fidelity Chromatic Aberration/Dispersion (color splitting through water refraction)
    
    // Red Channel
    vec2 pR = (distortedUv + vec2(0.003, 0.0)) * period;
    float c1R = causticPattern(pR, period, t);
    float c2R = causticPattern(pR * 5.0, period * 5.0, t * 1.4);
    float c3R = causticPattern(pR * 4.0, period * 4.0, t * 0.7);
    float causticsR = (1.0 - c1R) * 0.6 + (1.0 - c2R) * 0.3 + (1.0 - c3R) * 0.1;
    causticsR = pow(causticsR, 3.0);
    causticsR = smoothstep(0.3, 1.0, causticsR) * 1.25;

    // Green Channel
    vec2 pG = distortedUv * period;
    float c1G = causticPattern(pG, period, t);
    float c2G = causticPattern(pG * 5.0, period * 5.0, t * 1.4);
    float c3G = causticPattern(pG * 4.0, period * 4.0, t * 0.7);
    float causticsG = (1.0 - c1G) * 0.6 + (1.0 - c2G) * 0.3 + (1.0 - c3G) * 0.1;
    causticsG = pow(causticsG, 3.0);
    causticsG = smoothstep(0.3, 1.0, causticsG) * 1.25;

    // Blue Channel
    vec2 pB = (distortedUv - vec2(0.003, 0.0)) * period;
    float c1B = causticPattern(pB, period, t);
    float c2B = causticPattern(pB * 5.0, period * 5.0, t * 1.4);
    float c3B = causticPattern(pB * 4.0, period * 4.0, t * 0.7);
    float causticsB = (1.0 - c1B) * 0.6 + (1.0 - c2B) * 0.3 + (1.0 - c3B) * 0.1;
    causticsB = pow(causticsB, 3.0);
    causticsB = smoothstep(0.3, 1.0, causticsB) * 1.25;
    
    // Combine channels
    vec3 baseColor = uColor;
    vec3 color = vec3(
        baseColor.r * causticsR,
        baseColor.g * causticsG,
        baseColor.b * causticsB
    );
    
    // Unified caustics average for glow and alpha mapping
    float caustics = (causticsR + causticsG + causticsB) / 3.0;
    
    // Softly glow the core of the caustics
    color += baseColor * vec3(0.4) * pow(caustics, 2.0);
    
    // Add a deep-water ambient background gradient that pulses gently
    // This fills the black void with a rich marine gradient (denser at the bottom)
    vec3 ambientColor = baseColor * 0.12 * (1.0 - uv.y) * (0.85 + 0.15 * sin(t * 0.4));
    color += ambientColor;
    
    // Soft alpha blending
    float alpha = clamp(caustics * 0.85 + 0.1, 0.0, 1.0);
    
    fragColor = vec4(color, alpha);
}

void main() {
    mainImage(gl_FragColor, vUv * iResolution);
}
`;

const ShaderPlane = ({ color }: { color: string }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color(color) },
    }),
    [color],
  );

  useEffect(() => {
    uniforms.uColor.value.set(color);
  }, [color, uniforms]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.iResolution.value.set(
        state.size.width * state.viewport.dpr,
        state.size.height * state.viewport.dpr,
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export interface WaterCausticProps {
  className?: string;
  color?: string;
}

export default function WaterCaustic({
  className,
  color = "#ffffff",
}: WaterCausticProps) {
  return (
    <div
      className={cn(
        "w-full h-full absolute inset-0 pointer-events-none",
        className,
      )}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 2]}
      >
        <ShaderPlane color={color} />
      </Canvas>
    </div>
  );
}
