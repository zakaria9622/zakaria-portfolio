"use client";

import { Html, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  LineBasicMaterial,
  MathUtils,
  Object3D,
  Vector3,
} from "three";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

type SceneControls = {
  pointer: { current: { x: number; y: number } };
  scroll: { current: number };
  isVisible: { current: boolean };
  lastPointerAt: { current: number };
};

type DataPoint = {
  origin: Vector3;
  start: Vector3;
  end: Vector3;
  color: Color;
  weight: number;
};

const pointCount = 96;

const coreLabels = [
  { label: "Orders", value: "12K", color: "#7dd3fc", angle: 0 },
  { label: "Revenue", value: "EUR 2.05M", color: "#f2a93b", angle: 1.72 },
  { label: "Margin", value: "10.42%", color: "#22c55e", angle: 3.25 },
  { label: "VIP share", value: "75.4%", color: "#f97373", angle: 4.86 },
] as const;

const tempObject = new Object3D();
const tempVector = new Vector3();

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOutQuint(value: number) {
  return 1 - Math.pow(1 - value, 5);
}

function useSceneControls(anchorSelector: string): SceneControls {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const isVisible = useRef(true);
  const lastPointerAt = useRef(0);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(anchorSelector);
    if (!hero) return;

    let frame = 0;

    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const heroTop = hero.offsetTop;
        const projects = document.getElementById("projects");
        const projectsTop =
          projects?.offsetTop ?? heroTop + Math.max(hero.offsetHeight, 1);
        const distance = Math.max(projectsTop - heroTop, 1);
        scroll.current = clamp01((window.scrollY - heroTop) / distance);
      });
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointer.current.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.current.y = (event.clientY - rect.top) / rect.height - 0.5;
      lastPointerAt.current = performance.now();
    };

    const resetPointer = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      lastPointerAt.current = performance.now();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { rootMargin: "180px" }
    );

    updateScroll();
    observer.observe(hero);
    hero.addEventListener("pointermove", updatePointer);
    hero.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener("pointermove", updatePointer);
      hero.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [anchorSelector]);

  return { pointer, scroll, isVisible, lastPointerAt };
}

function createDataPoints(): DataPoint[] {
  return Array.from({ length: pointCount }, (_, index) => {
    const t = index / (pointCount - 1);
    const turn = index * 2.399963229728653;
    const y = 1 - t * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const shell = 1.12 + 0.18 * Math.sin(index * 1.7);
    const start = new Vector3(
      Math.cos(turn) * radius * shell,
      y * 1.18,
      Math.sin(turn) * radius * shell
    );

    const lane = index % 4;
    const originRadius = 3.2 + (index % 9) * 0.11;
    const origin = new Vector3(
      Math.cos(turn * 0.64 + lane * 0.34) * originRadius,
      MathUtils.lerp(-1.74, 1.74, (index % 17) / 16) +
        Math.sin(index * 0.37) * 0.24,
      Math.sin(turn * 0.58 + lane * 0.28) * (2.05 + (index % 5) * 0.16)
    );
    const x = MathUtils.lerp(-2.05, 2.05, t);
    const chartY =
      lane === 0
        ? Math.sin(t * Math.PI * 2.3) * 0.34 + t * 0.92 - 0.48
        : lane === 1
          ? Math.cos(t * Math.PI * 2.8) * 0.28 + 0.28
          : lane === 2
            ? Math.sin(t * Math.PI * 4.1) * 0.18 - 0.36
            : MathUtils.lerp(-0.72, 0.72, (index % 16) / 15);
    const end = new Vector3(
      x,
      chartY,
      (lane - 1.5) * 0.2 + Math.sin(index * 0.43) * 0.12
    );

    const color = new Color(
      lane === 0
        ? "#7dd3fc"
        : lane === 1
          ? "#f2a93b"
          : lane === 2
            ? "#22c55e"
            : "#f97373"
    );

    return {
      origin,
      start,
      end,
      color,
      weight: 0.75 + (index % 7) * 0.065,
    };
  });
}

function DataParticles({
  points,
  controls,
}: {
  points: DataPoint[];
  controls: SceneControls;
}) {
  const meshRef = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    points.forEach((point, index) => {
      tempObject.position.copy(point.origin);
      tempObject.scale.setScalar(0.018 * point.weight);
      tempObject.updateMatrix();
      mesh.setMatrixAt(index, tempObject.matrix);
      mesh.setColorAt(index, point.color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [points]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !controls.isVisible.current) return;

    const elapsed = clock.elapsedTime;
    const progress = easeOutQuint(controls.scroll.current);
    const assembly = easeOutQuint(clamp01(elapsed / 1.75));

    points.forEach((point, index) => {
      const pulse = Math.sin(elapsed * 1.55 + index * 0.31) * 0.012;
      tempVector.lerpVectors(point.origin, point.start, assembly);
      tempVector.lerp(point.end, progress);
      tempVector.x += Math.sin(elapsed * 0.46 + index) * 0.025 * (1 - progress);
      tempVector.z += Math.cos(elapsed * 0.42 + index) * 0.025 * (1 - progress);

      tempObject.position.copy(tempVector);
      tempObject.scale.setScalar(
        (0.018 + assembly * 0.014 + pulse) * point.weight
      );
      tempObject.updateMatrix();
      mesh.setMatrixAt(index, tempObject.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, points.length]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        vertexColors
        emissive="#7dd3fc"
        emissiveIntensity={1.2}
        metalness={0.15}
        roughness={0.32}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function ConnectionNetwork({
  points,
  controls,
}: {
  points: DataPoint[];
  controls: SceneControls;
}) {
  const geometry = useMemo(() => {
    const positions = new Float32Array((pointCount - 4) * 2 * 3);
    const nextGeometry = new BufferGeometry();
    nextGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return nextGeometry;
  }, []);
  const materialRef = useRef<LineBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!controls.isVisible.current) return;

    const assembly = easeOutQuint(clamp01(clock.elapsedTime / 1.75));
    const progress = easeOutQuint(controls.scroll.current);
    const attribute = geometry.getAttribute("position") as Float32BufferAttribute;
    const positions = attribute.array as Float32Array;
    let cursor = 0;

    for (let index = 0; index < pointCount - 4; index += 1) {
      const source = points[index];
      const target = points[index + ((index % 4) + 1)];
      const sourcePosition = tempVector
        .copy(source.origin)
        .lerp(source.start, assembly)
        .lerp(source.end, progress);
      positions[cursor++] = sourcePosition.x;
      positions[cursor++] = sourcePosition.y;
      positions[cursor++] = sourcePosition.z;

      const targetPosition = new Vector3()
        .copy(target.origin)
        .lerp(target.start, assembly)
        .lerp(target.end, progress);
      positions[cursor++] = targetPosition.x;
      positions[cursor++] = targetPosition.y;
      positions[cursor++] = targetPosition.z;
    }

    attribute.needsUpdate = true;
    if (materialRef.current) {
      materialRef.current.opacity =
        MathUtils.lerp(0.26, 0.12, progress) * assembly;
    }
  });

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        color="#7dd3fc"
        transparent
        opacity={0.24}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function ChartCurves({ controls }: { controls: SceneControls }) {
  const geometries = useMemo(
    () =>
      Array.from({ length: 3 }, () => {
        const geometry = new BufferGeometry();
        geometry.setAttribute(
          "position",
          new Float32BufferAttribute(new Float32Array(71 * 2 * 3), 3)
        );
        return geometry;
      }),
    []
  );
  const materialRefs = useRef<Array<LineBasicMaterial | null>>([]);
  const colors = ["#7dd3fc", "#f2a93b", "#22c55e"];

  useFrame(({ clock }) => {
    if (!controls.isVisible.current) return;

    const assembly = easeOutQuint(clamp01(clock.elapsedTime / 1.75));
    const progress = easeOutQuint(controls.scroll.current);
    geometries.forEach((geometry, curveIndex) => {
      const attribute = geometry.getAttribute("position") as Float32BufferAttribute;
      const positions = attribute.array as Float32Array;
      let cursor = 0;

      for (let index = 0; index < 71; index += 1) {
        for (let endpoint = 0; endpoint < 2; endpoint += 1) {
          const t = (index + endpoint) / 71;
          const orbital = new Vector3(
            Math.cos(t * Math.PI * 2 + curveIndex * 1.2) *
              (1.34 + curveIndex * 0.16),
            Math.sin(t * Math.PI * 2 + curveIndex * 0.7) * 0.58,
            Math.sin(t * Math.PI * 2 + curveIndex) * (0.72 + curveIndex * 0.12)
          );
          const chart = new Vector3(
            MathUtils.lerp(-2.18, 2.18, t),
            Math.sin(
              t * Math.PI * (2.2 + curveIndex * 0.7) +
                clock.elapsedTime * 0.18
            ) *
              (0.14 + curveIndex * 0.05) +
              curveIndex * 0.28 -
              0.28,
            -0.22 + curveIndex * 0.2
          );
          orbital.lerp(chart, progress);
          positions[cursor++] = orbital.x;
          positions[cursor++] = orbital.y;
          positions[cursor++] = orbital.z;
        }
      }

      attribute.needsUpdate = true;
      const material = materialRefs.current[curveIndex];
      if (material) {
        material.opacity = MathUtils.lerp(0.3, 0.56, progress) * assembly;
      }
    });
  });

  return (
    <group>
      {geometries.map((geometry, index) => (
        <lineSegments key={colors[index]} geometry={geometry}>
          <lineBasicMaterial
            ref={(material) => {
              materialRefs.current[index] = material;
            }}
            color={colors[index]}
            transparent
            opacity={0.32}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}
    </group>
  );
}

function createOrbitGeometry(radiusX: number, radiusY: number, depth: number) {
  const segments = 96;
  const positions: number[] = [];

  for (let index = 0; index < segments; index += 1) {
    const current = (index / segments) * Math.PI * 2;
    const next = ((index + 1) / segments) * Math.PI * 2;

    positions.push(
      Math.cos(current) * radiusX,
      Math.sin(current) * radiusY,
      Math.sin(current * 1.5) * depth,
      Math.cos(next) * radiusX,
      Math.sin(next) * radiusY,
      Math.sin(next * 1.5) * depth
    );
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  return geometry;
}

function OrbitalDataPaths({ controls }: { controls: SceneControls }) {
  const groupRef = useRef<Group>(null);
  const materialRefs = useRef<Array<LineBasicMaterial | null>>([]);
  const geometries = useMemo(
    () => [
      createOrbitGeometry(1.72, 0.72, 0.34),
      createOrbitGeometry(2.05, 0.9, 0.28),
      createOrbitGeometry(1.36, 0.58, 0.42),
    ],
    []
  );
  const colors = ["#7dd3fc", "#f2a93b", "#22c55e"];

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group || !controls.isVisible.current) return;

    const elapsed = clock.elapsedTime;
    const assembly = easeOutQuint(clamp01(elapsed / 1.75));
    const progress = controls.scroll.current;

    group.rotation.y = elapsed * 0.065 + progress * 0.42;
    group.rotation.x = Math.sin(elapsed * 0.22) * 0.035;
    group.rotation.z = Math.cos(elapsed * 0.18) * 0.025;

    materialRefs.current.forEach((material, index) => {
      if (!material) return;

      material.opacity =
        (0.11 + Math.sin(elapsed * 0.72 + index) * 0.025) *
        assembly *
        (1 - progress * 0.44);
    });
  });

  return (
    <group ref={groupRef}>
      {geometries.map((geometry, index) => (
        <lineSegments
          key={colors[index]}
          geometry={geometry}
          rotation={[
            index === 0 ? 0.28 : -0.2,
            index === 1 ? 0.62 : -0.34,
            index === 2 ? 1.1 : -0.5,
          ]}
        >
          <lineBasicMaterial
            ref={(material) => {
              materialRefs.current[index] = material;
            }}
            color={colors[index]}
            transparent
            opacity={0.1}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}
    </group>
  );
}

function ScannerPulses({ controls }: { controls: SceneControls }) {
  const pulseRefs = useRef<Array<Group | null>>([]);
  const materialRefs = useRef<Array<LineBasicMaterial | null>>([]);
  const geometry = useMemo(() => {
    const positions = new Float32Array([
      -2.15, 0, 0, 2.15, 0, 0, -1.78, 0.06, 0, 1.78, 0.06, 0,
    ]);
    const nextGeometry = new BufferGeometry();
    nextGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return nextGeometry;
  }, []);

  useFrame(({ clock }) => {
    if (!controls.isVisible.current) return;

    const elapsed = clock.elapsedTime;
    const assembly = easeOutQuint(clamp01(elapsed / 1.75));
    const progress = controls.scroll.current;

    pulseRefs.current.forEach((pulse, index) => {
      const material = materialRefs.current[index];
      if (!pulse || !material) return;

      const cycle = (elapsed * 0.18 + index * 0.48) % 1;
      const activePulse =
        cycle < 0.58 ? Math.sin((cycle / 0.58) * Math.PI) : 0;

      pulse.position.y = MathUtils.lerp(-1.22, 1.18, cycle);
      pulse.rotation.z = index === 0 ? -0.08 : 0.07;
      pulse.scale.x = 0.86 + activePulse * 0.1;
      material.opacity = activePulse * 0.26 * assembly * (1 - progress * 0.48);
    });
  });

  return (
    <group>
      {[0, 1].map((index) => (
        <group
          key={index}
          ref={(group) => {
            pulseRefs.current[index] = group;
          }}
        >
          <lineSegments geometry={geometry}>
            <lineBasicMaterial
              ref={(material) => {
                materialRefs.current[index] = material;
              }}
              color={index === 0 ? "#7dd3fc" : "#f2a93b"}
              transparent
              opacity={0}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

function GridPlane({
  position,
  rotation,
  color,
  opacity,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  opacity: number;
}) {
  const geometry = useMemo(() => {
    const lines: number[] = [];
    const size = 4.6;
    const divisions = 10;

    for (let index = 0; index <= divisions; index += 1) {
      const value = -size / 2 + (size / divisions) * index;
      lines.push(-size / 2, value, 0, size / 2, value, 0);
      lines.push(value, -size / 2, 0, value, size / 2, 0);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(lines, 3));
    return geometry;
  }, []);

  return (
    <lineSegments geometry={geometry} position={position} rotation={rotation}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function OrbitingLabels({ controls }: { controls: SceneControls }) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group || !controls.isVisible.current) return;

    const assembly = easeOutQuint(clamp01(clock.elapsedTime / 1.75));
    const progress = controls.scroll.current;
    group.rotation.y = clock.elapsedTime * 0.08 + progress * 0.45;
    group.rotation.x = MathUtils.lerp(0.12, -0.04, progress);
    group.scale.setScalar(MathUtils.lerp(0.92, MathUtils.lerp(1, 0.86, progress), assembly));
  });

  return (
    <group ref={groupRef}>
      {coreLabels.map((item) => (
        <Html
          key={item.label}
          position={[
            Math.cos(item.angle) * 1.95,
            Math.sin(item.angle * 1.37) * 0.66,
            Math.sin(item.angle) * 1.35,
          ]}
          transform
          center
          distanceFactor={7.8}
          zIndexRange={[3, 0]}
        >
          <div className="core-kpi-label" style={{ borderColor: item.color }}>
            <span>{item.label}</span>
            <strong style={{ color: item.color }}>{item.value}</strong>
          </div>
        </Html>
      ))}
    </group>
  );
}

function DataCoreScene({ controls }: { controls: SceneControls }) {
  const points = useMemo(() => createDataPoints(), []);
  const groupRef = useRef<Group>(null);

  useFrame(({ camera, clock }) => {
    const group = groupRef.current;
    if (!group || !controls.isVisible.current) return;

    const elapsed = clock.elapsedTime;
    const progress = controls.scroll.current;
    const idleAmount =
      clamp01((performance.now() - controls.lastPointerAt.current - 1100) / 1200) *
      (1 - progress * 0.68);
    const driftX = Math.sin(elapsed * 0.28) * 0.048 * idleAmount;
    const driftY = Math.cos(elapsed * 0.24) * 0.034 * idleAmount;
    const targetRotationX =
      -controls.pointer.current.y * 0.24 - progress * 0.08 + driftY;
    const targetRotationY =
      controls.pointer.current.x * 0.34 + progress * 0.38 + driftX;
    const targetRotationZ = progress * -0.1;

    group.rotation.x = MathUtils.lerp(group.rotation.x, targetRotationX, 0.055);
    group.rotation.y = MathUtils.lerp(group.rotation.y, targetRotationY, 0.055);
    group.rotation.z = MathUtils.lerp(group.rotation.z, targetRotationZ, 0.055);
    group.position.y = MathUtils.lerp(group.position.y, -progress * 0.28, 0.05);

    camera.position.x = MathUtils.lerp(
      camera.position.x,
      controls.pointer.current.x * 0.08 + driftX * 1.3,
      0.025
    );
    camera.position.y = MathUtils.lerp(
      camera.position.y,
      -controls.pointer.current.y * 0.05 + driftY,
      0.025
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#06070a"]} />
      <ambientLight intensity={0.9} />
      <pointLight position={[2.6, 2.4, 3.6]} intensity={42} color="#7dd3fc" />
      <pointLight position={[-3, -1.6, 2.2]} intensity={18} color="#f2a93b" />

      <group ref={groupRef}>
        <GridPlane
          position={[0, -1.45, -0.1]}
          rotation={[-Math.PI / 2.2, 0, 0]}
          color="#7dd3fc"
          opacity={0.11}
        />
        <GridPlane
          position={[0, 0, -1.58]}
          rotation={[0, 0, 0]}
          color="#f2a93b"
          opacity={0.07}
        />
        <OrbitalDataPaths controls={controls} />
        <ScannerPulses controls={controls} />
        <ConnectionNetwork points={points} controls={controls} />
        <ChartCurves controls={controls} />
        <DataParticles points={points} controls={controls} />
        <OrbitingLabels controls={controls} />
      </group>
    </>
  );
}

export function DataIntelligenceCore({
  anchorSelector,
}: {
  anchorSelector: string;
}) {
  const controls = useSceneControls(anchorSelector);

  return (
    <Canvas
      className="data-core-canvas"
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.55]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <DataCoreScene controls={controls} />
      <Preload all />
    </Canvas>
  );
}
