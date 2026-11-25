"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useRenderQuality, type RenderQuality } from "@/hooks/use-client-quality";
import SerumBottle from "./serum-bottle";
import Wordmark3D from "./wordmark-3d";

type Quality = RenderQuality;

/**
 * Studio lighting built from Lightformers instead of an HDR panorama: no
 * network fetch, no 4K texture decode, and `frames={1}` bakes the env map
 * exactly once at mount. The map resolution is the single biggest lever on
 * both VRAM and per-pixel cost, so it stays small.
 */
function StudioLights({ quality }: { quality: Quality }) {
  return (
    <Environment resolution={quality === "high" ? 128 : 64} frames={1}>
      <Lightformer
        form="rect"
        intensity={2.6}
        color="#ffffff"
        position={[0, 4.5, -4]}
        scale={[12, 6, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.8}
        color="#f4e3c8"
        position={[-5, 1.5, 2]}
        scale={[5, 9, 1]}
        rotation={[0, Math.PI / 2.4, 0]}
      />
      <Lightformer
        form="rect"
        intensity={1.4}
        color="#efe6d6"
        position={[5.5, 0.5, 1]}
        scale={[5, 8, 1]}
        rotation={[0, -Math.PI / 2.4, 0]}
      />
      <Lightformer
        form="ring"
        intensity={1.6}
        color="#d9c39a"
        position={[0, -3.2, 2]}
        scale={[3, 3, 1]}
      />
      <Lightformer
        form="rect"
        intensity={0.7}
        color="#ffffff"
        position={[0, 2, 7]}
        scale={[14, 4, 1]}
        rotation={[0, Math.PI, 0]}
      />
    </Environment>
  );
}

/**
 * Scroll choreography. Mouse parallax and scroll progress arrive as refs
 * written by rAF-coalesced passive listeners, so this frame loop is the only
 * place that touches three.js objects — no React render per frame, no second
 * animation loop competing with Lenis/GSAP.
 */
function Rig({
  children,
  scrollRef,
  pointerRef,
}: {
  children: React.ReactNode;
  scrollRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const { size, invalidate } = useThree();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // Clamp delta so a tab that regains focus after being backgrounded cannot
    // produce one giant integration step.
    const dt = Math.min(delta, 0.05);
    const p = scrollRef.current ?? 0;
    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    const k = 1 - Math.pow(0.0015, dt);

    // Desktop editorial layout: object sits right of centre; mobile centres it
    // and drops it so the headline keeps a clean field.
    const wide = size.width > 900;
    const baseX = wide ? 1.15 : 0;
    const baseY = wide ? -0.32 : -0.55;

    const targetX = baseX + pointer.x * 0.16;
    const targetY = baseY - pointer.y * 0.1 - p * 0.9;
    const targetRotX = -pointer.y * 0.06 + p * 0.28;
    const targetRotY = pointer.x * 0.12;
    const targetScale = 1 - p * 0.28;

    g.position.x += (targetX - g.position.x) * k;
    g.position.y += (targetY - g.position.y) * k;
    g.rotation.x += (targetRotX - g.rotation.x) * k;
    g.rotation.y += (targetRotY - g.rotation.y) * k;
    const s = THREE.MathUtils.lerp(g.scale.x, targetScale, k);
    g.scale.setScalar(s);
    g.position.z = p * 1.1;

    // The bottle and wordmark idle on their own slow motion, so keep requesting
    // frames for as long as this canvas is mounted; the parent unmounts the
    // whole scene once the hero leaves the viewport.
    invalidate();
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene({
  scrollRef,
  pointerRef,
}: {
  scrollRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
}) {
  const quality = useRenderQuality();

  // Cap DPR at 1.5 even on retina: a 3x display otherwise renders nine times
  // the pixels of a 1x display for an object that is all soft gradients.
  const dpr = useMemo<[number, number]>(() => [1, 1.5], []);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={dpr}
      // Idle-free rendering: frames are requested only while something moves
      // (scroll, pointer, or the rig easing into place).
      frameloop="demand"
      camera={{ position: [0, 0.2, 7.6], fov: 36 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 5]} intensity={2.1} color="#fff6e8" />
        <directionalLight position={[-6, 2, -3]} intensity={1.1} color="#e9dcc4" />
        <StudioLights quality={quality} />
        <Rig scrollRef={scrollRef} pointerRef={pointerRef}>
          <SerumBottle quality={quality} />
          <Wordmark3D quality={quality} size={quality === "high" ? 0.86 : 0.94} />
        </Rig>
      </Suspense>
    </Canvas>
  );
}
