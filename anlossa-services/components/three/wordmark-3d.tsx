"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import * as THREE from "three";

const FONT_URL = "/fonts/cormorant-typeface.json";

type Wordmark3DProps = {
  text?: string;
  size?: number;
  depth?: number;
  quality?: "high" | "low";
};

/**
 * Extruded serif wordmark with a champagne-metal bevel.
 *
 * Geometry cost here is dominated by three multipliers that compound:
 * curveSegments (per glyph outline), bevelSegments (per bevel band) and the
 * number of glyphs. It is an extruded 2D shape, so it is cheap to over-tessellate
 * and expensive to bevel — the bevel is what pushes triangle count up fast.
 */
export default function Wordmark3D({
  text = "ANLOSSA",
  size = 1.05,
  depth = 0.2,
  quality = "high",
}: Wordmark3DProps) {
  const group = useRef<THREE.Group>(null);

  // Standard rather than Physical: the clearcoat layer on MeshPhysicalMaterial
  // costs an extra BRDF lobe per light per fragment for a difference invisible
  // against a baked env map at this scale.
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C9AD80"),
        metalness: 1,
        roughness: 0.24,
        envMapIntensity: 1.4,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.24) * 0.09;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.025;
    }
  });

  return (
    <group ref={group} position={[0, 1.95, 0]}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={size}
          height={depth}
          curveSegments={quality === "high" ? 6 : 3}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.015}
          bevelOffset={0}
          bevelSegments={quality === "high" ? 3 : 1}
          letterSpacing={0.045}
          material={material}
        >
          {text}
        </Text3D>
      </Center>
    </group>
  );
}
