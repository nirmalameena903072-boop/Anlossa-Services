"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

type SerumBottleProps = {
  quality?: "high" | "low";
  amplitude?: number;
};

/**
 * A frosted-glass serum bottle: thick transmission walls, champagne liquid
 * core, brushed-gold collar and a matte cap. Rotates on a slow, organic bob.
 */
export default function SerumBottle({
  quality = "high",
  amplitude = 1,
}: SerumBottleProps) {
  const group = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.Mesh>(null);

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C6A87C"),
        metalness: 1,
        roughness: 0.28,
        envMapIntensity: 1.35,
      }),
    []
  );

  const capMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1A1A1D"),
        metalness: 0.85,
        roughness: 0.42,
        envMapIntensity: 0.9,
      }),
    []
  );

  const liquidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#D6B383"),
        metalness: 0,
        roughness: 0.18,
        transmission: 0.55,
        thickness: 1.6,
        ior: 1.38,
        transparent: true,
        opacity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        emissive: new THREE.Color("#6b5228"),
        emissiveIntensity: 0.12,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.32) * 0.42 + t * 0.06;
      group.current.position.y = Math.sin(t * 0.75) * 0.075 * amplitude;
      group.current.rotation.z = Math.sin(t * 0.5) * 0.035;
    }
    if (liquid.current) {
      liquid.current.scale.y = 1 + Math.sin(t * 1.4) * 0.006;
    }
  });

  return (
    <group ref={group} scale={0.92} dispose={null}>
      {/* Glass body */}
      <mesh castShadow position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.62, 0.66, 1.86, 96, 1]} />
        <MeshTransmissionMaterial
          samples={quality === "high" ? 6 : 2}
          resolution={quality === "high" ? 512 : 256}
          transmission={1}
          thickness={0.42}
          roughness={0.14}
          ior={1.46}
          chromaticAberration={quality === "high" ? 0.09 : 0.03}
          anisotropicBlur={0.35}
          distortion={0.08}
          distortionScale={0.28}
          temporalDistortion={0.05}
          attenuationColor="#f6efe2"
          attenuationDistance={2.6}
          color="#ffffff"
          background={undefined}
          backside={false}
        />
      </mesh>

      {/* Champagne liquid core */}
      <mesh ref={liquid} position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.5, 0.54, 1.5, 64, 1]} />
        <primitive object={liquidMaterial} attach="material" />
      </mesh>

      {/* Inner stem — reads as a dropper */}
      <mesh position={[0, 0.42, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.055, 0.055, 0.86, 24]} />
      </mesh>

      {/* Gold collar */}
      <mesh position={[0, 0.95, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.34, 0.36, 0.2, 64]} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.16, 0]} material={capMaterial}>
        <cylinderGeometry args={[0.31, 0.31, 0.24, 64]} />
      </mesh>

      {/* Cap bevel ring */}
      <mesh position={[0, 1.285, 0]} material={goldMaterial}>
        <torusGeometry args={[0.29, 0.012, 12, 64]} />
      </mesh>

      {/* Base shadow catcher puck (soft grounding, no environment needed) */}
      <mesh position={[0, -1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.055} />
      </mesh>
    </group>
  );
}
