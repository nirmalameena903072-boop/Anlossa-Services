"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type SerumBottleProps = {
  quality?: "high" | "low";
  amplitude?: number;
};

/**
 * The serum bottle, built to read as glass without paying for glass.
 *
 * This previously used MeshTransmissionMaterial, which renders the scene to an
 * off-screen buffer every frame and samples it six times per pixel — by far
 * the most expensive thing on the page. A standard material with high
 * metalness, low roughness and the baked studio env map gives the same
 * lacquered, light-catching silhouette for a fraction of the GPU cost.
 *
 * Geometry segments are also cut hard: at this camera distance a 24-segment
 * cylinder is visually identical to 96, and the silhouette is anti-aliased.
 */
export default function SerumBottle({
  quality = "high",
  amplitude = 1,
}: SerumBottleProps) {
  const group = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.Mesh>(null);

  const segments = quality === "high" ? 48 : 24;

  // Glass body: bright, glossy, faintly warm. Reads as thick glass in the
  // studio env without any refraction pass.
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#eef0ee"),
        metalness: 0.85,
        roughness: 0.18,
        envMapIntensity: 1.5,
        transparent: true,
        opacity: 0.58,
      }),
    []
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C6A87C"),
        metalness: 0.9,
        roughness: 0.24,
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
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D6B383"),
        metalness: 0.35,
        roughness: 0.22,
        envMapIntensity: 1.2,
        emissive: new THREE.Color("#6b5228"),
        emissiveIntensity: 0.14,
      }),
    []
  );

  const shadowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#000000"),
        transparent: true,
        opacity: 0.055,
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
      <mesh position={[0, -0.06, 0]} material={glassMaterial}>
        <cylinderGeometry args={[0.62, 0.66, 1.86, segments, 1]} />
      </mesh>

      {/* Champagne liquid core */}
      <mesh ref={liquid} position={[0, -0.18, 0]} material={liquidMaterial}>
        <cylinderGeometry args={[0.5, 0.54, 1.5, segments, 1]} />
      </mesh>

      {/* Inner stem — reads as a dropper */}
      <mesh position={[0, 0.42, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.055, 0.055, 0.86, 12]} />
      </mesh>

      {/* Gold collar */}
      <mesh position={[0, 0.95, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.34, 0.36, 0.2, segments]} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.16, 0]} material={capMaterial}>
        <cylinderGeometry args={[0.31, 0.31, 0.24, segments]} />
      </mesh>

      {/* Cap bevel ring */}
      <mesh position={[0, 1.285, 0]} material={goldMaterial}>
        <torusGeometry args={[0.29, 0.012, 8, segments]} />
      </mesh>

      {/* Soft grounding puck */}
      <mesh
        position={[0, -1.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={shadowMaterial}
      >
        <circleGeometry args={[0.85, 24]} />
      </mesh>
    </group>
  );
}
