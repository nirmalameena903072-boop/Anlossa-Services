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
 * Extruded serif wordmark with a champagne-metal bevel. Bevel segments are
 * dropped on low quality, which is where most of the geometry cost lives.
 */
export default function Wordmark3D({
  text = "ANLOSSA",
  size = 1.05,
  depth = 0.2,
  quality = "high",
}: Wordmark3DProps) {
  const group = useRef<THREE.Group>(null);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#C9AD80"),
        metalness: 1,
        roughness: 0.24,
        clearcoat: 0.65,
        clearcoatRoughness: 0.22,
        envMapIntensity: 1.4,
        reflectivity: 1,
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
          curveSegments={quality === "high" ? 10 : 4}
          bevelEnabled
          bevelThickness={quality === "high" ? 0.035 : 0.02}
          bevelSize={quality === "high" ? 0.014 : 0.008}
          bevelOffset={0}
          bevelSegments={quality === "high" ? 4 : 1}
          letterSpacing={0.045}
          material={material}
        >
          {text}
        </Text3D>
      </Center>
    </group>
  );
}
