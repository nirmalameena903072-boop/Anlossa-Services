"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useRenderQuality, type RenderQuality } from "@/hooks/use-client-quality";
import SerumBottle from "./serum-bottle";
import Wordmark3D from "./wordmark-3d";

type Quality = RenderQuality;

/** Noise-free studio replacement: soft key, warm rim, champagne bounce. */
function StudioLights({ quality }: { quality: Quality }) {
  return (
    <Environment resolution={quality === "high" ? 256 : 64} frames={1}>
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
 * Scroll choreography: the rig composes mouse parallax, scroll progress and
 * a slow idle breath into one camera-relative group transform.
 */
function Rig({
  children,
  scrollRef,
}: {
  children: React.ReactNode;
  scrollRef: React.RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      target.current = { x: nx, y: ny };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = scrollRef.current ?? 0;
    const k = 1 - Math.pow(0.0015, delta);

    // Desktop editorial layout: object sits right of centre; mobile centres it
    // and drops it so the headline keeps a clean field.
    const wide = size.width > 900;
    const baseX = wide ? 1.15 : 0;
    const baseY = wide ? -0.32 : -0.55;

    const targetX = baseX + target.current.x * 0.16;
    const targetY = baseY - target.current.y * 0.1 - p * 0.9;
    const targetRotX = -target.current.y * 0.06 + p * 0.28;
    const targetRotY = target.current.x * 0.12;
    const targetScale = 1 - p * 0.28;

    g.position.x += (targetX - g.position.x) * k;
    g.position.y += (targetY - g.position.y) * k;
    g.rotation.x += (targetRotX - g.rotation.x) * k;
    g.rotation.y += (targetRotY - g.rotation.y) * k;
    const s = THREE.MathUtils.lerp(g.scale.x, targetScale, k);
    g.scale.setScalar(s);
    g.position.z = p * 1.1;
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  const quality = useRenderQuality();
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      scrollRef.current = THREE.MathUtils.clamp(window.scrollY / vh, 0, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dpr = useMemo<[number, number]>(() => (quality === "high" ? [1, 2] : [1, 1.5]), [quality]);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={dpr}
      frameloop="always"
      camera={{ position: [0, 0.2, 7.6], fov: 36 }}
      gl={{
        antialias: quality === "high",
        alpha: true,
        powerPreference: "high-performance",
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
        <Rig scrollRef={scrollRef}>
          <SerumBottle quality={quality} />
          <Wordmark3D quality={quality} size={quality === "high" ? 0.86 : 0.94} />
        </Rig>
      </Suspense>
    </Canvas>
  );
}
