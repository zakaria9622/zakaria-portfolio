"use client";

import { Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  MathUtils,
  ShaderMaterial,
} from "three";
import { useEffect, useMemo, useRef } from "react";

type SceneVisibility = {
  isVisible: { current: boolean };
  isInViewport: { current: boolean };
};

type SceneControls = SceneVisibility & {
  pointer: { current: { x: number; y: number } };
  hover: {
    current: {
      targetAmount: number;
      targetX: number;
      targetY: number;
    };
  };
  drag: {
    current: {
      active: boolean;
      targetX: number;
      targetY: number;
      originX: number;
      originY: number;
      startClientX: number;
      startClientY: number;
    };
  };
  scroll: { current: number };
  hasSettledOffscreen: { current: boolean };
};

type RenderMotion = {
  current: {
    pointerX: number;
    pointerY: number;
    hoverAmount: number;
    hoverX: number;
    hoverY: number;
    dragX: number;
    dragY: number;
    scroll: number;
  };
};

type ParticleUniforms = {
  uTime: { value: number };
  uPixelRatio: { value: number };
  uGlobalAlpha: { value: number };
  uParallaxX: { value: number };
  uParallaxY: { value: number };
  uHoverAmount: { value: number };
  uHoverX: { value: number };
  uHoverY: { value: number };
};

const globeParticleCount = 4200;
const fieldParticleCount = 240;
const signalParticleCount = 280;
const goldenAngle = Math.PI * (3 - Math.sqrt(5));

const silver = [0.9, 0.94, 1] as const;
const cyan = [0.49, 0.83, 0.99] as const;
const amber = [0.95, 0.66, 0.23] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value: number) {
  return clamp(value, 0, 1);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function seeded(index: number, salt = 1) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function createParticleGeometry(count: number) {
  const geometry = new BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const seeds = new Float32Array(count);
  const layers = new Float32Array(count);

  return { geometry, positions, colors, sizes, alphas, seeds, layers };
}

function writeColor(
  colors: Float32Array,
  index: number,
  color: readonly [number, number, number],
  lift = 0
) {
  const cursor = index * 3;
  colors[cursor] = Math.min(1, color[0] + lift);
  colors[cursor + 1] = Math.min(1, color[1] + lift);
  colors[cursor + 2] = Math.min(1, color[2] + lift);
}

function finalizeParticleGeometry(
  geometry: BufferGeometry,
  positions: Float32Array,
  colors: Float32Array,
  sizes: Float32Array,
  alphas: Float32Array,
  seeds: Float32Array,
  layers: Float32Array
) {
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aColor", new Float32BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
  geometry.setAttribute("aAlpha", new Float32BufferAttribute(alphas, 1));
  geometry.setAttribute("aSeed", new Float32BufferAttribute(seeds, 1));
  geometry.setAttribute("aLayer", new Float32BufferAttribute(layers, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

function createGlobeGeometry() {
  const surfaceCount = Math.floor(globeParticleCount * 0.72);
  const interiorCount = Math.floor(globeParticleCount * 0.18);
  const {
    geometry,
    positions,
    colors,
    sizes,
    alphas,
    seeds,
    layers,
  } = createParticleGeometry(globeParticleCount);

  for (let index = 0; index < globeParticleCount; index += 1) {
    const cursor = index * 3;
    const seedA = seeded(index, 1);
    const seedB = seeded(index, 2);
    const seedC = seeded(index, 3);
    const shellIndex = Math.min(index, surfaceCount - 1);
    const t = (shellIndex + 0.5) / surfaceCount;
    const y = 1 - t * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = shellIndex * goldenAngle + seedA * 0.034;
    const wobble =
      1 + Math.sin(theta * 2.1 + y * 3.4) * 0.055 + (seedB - 0.5) * 0.085;
    let pointRadius = 1.34 * wobble;
    let x = Math.cos(theta) * radius;
    let z = Math.sin(theta) * radius;
    let nextY = y;
    let layer = 0.18;

    if (index >= surfaceCount && index < surfaceCount + interiorCount) {
      const interiorIndex = index - surfaceCount;
      const interiorT = (interiorIndex + 0.5) / interiorCount;
      const interiorY = 1 - interiorT * 2;
      const interiorRadius = Math.sqrt(Math.max(0, 1 - interiorY * interiorY));
      const interiorTheta = interiorIndex * goldenAngle + seedC * 0.4;
      pointRadius = 1.23 * Math.cbrt(0.12 + seedA * 0.82);
      x = Math.cos(interiorTheta) * interiorRadius;
      z = Math.sin(interiorTheta) * interiorRadius;
      nextY = interiorY;
      layer = 0.54;
    } else if (index >= surfaceCount + interiorCount) {
      const haloIndex = index - surfaceCount - interiorCount;
      const haloCount = globeParticleCount - surfaceCount - interiorCount;
      const haloT = (haloIndex + 0.5) / haloCount;
      const haloY = 1 - haloT * 2;
      const haloRadius = Math.sqrt(Math.max(0, 1 - haloY * haloY));
      const haloTheta = haloIndex * goldenAngle + seedB * 0.62;
      pointRadius = 1.58 + seedA * 0.32;
      x = Math.cos(haloTheta) * haloRadius;
      z = Math.sin(haloTheta) * haloRadius;
      nextY = haloY;
      layer = 0.92;
    }

    positions[cursor] = x * pointRadius * (1.02 + seedB * 0.06);
    positions[cursor + 1] = nextY * pointRadius * (0.96 + seedC * 0.05);
    positions[cursor + 2] = z * pointRadius * (0.9 + seedA * 0.18);
    sizes[index] =
      MathUtils.lerp(0.62, 1.64, seedB) *
      (layer > 0.8 ? 0.8 : layer > 0.45 ? 1.08 : 1);
    alphas[index] =
      layer > 0.8
        ? MathUtils.lerp(0.1, 0.24, seedC)
        : layer > 0.45
          ? MathUtils.lerp(0.22, 0.48, seedC)
          : MathUtils.lerp(0.28, 0.62, seedC);
    seeds[index] = seedA * 9.7 + seedB * 3.2;
    layers[index] = layer;

    const accent = seeded(index, 7);
    if (accent > 0.965) {
      writeColor(colors, index, amber, 0.02);
    } else if (accent > 0.9) {
      writeColor(colors, index, cyan, 0.01);
    } else {
      writeColor(colors, index, silver, seedC * 0.04);
    }
  }

  return finalizeParticleGeometry(
    geometry,
    positions,
    colors,
    sizes,
    alphas,
    seeds,
    layers
  );
}

function createFieldGeometry() {
  const {
    geometry,
    positions,
    colors,
    sizes,
    alphas,
    seeds,
    layers,
  } = createParticleGeometry(fieldParticleCount);

  for (let index = 0; index < fieldParticleCount; index += 1) {
    const cursor = index * 3;
    const seedA = seeded(index, 11);
    const seedB = seeded(index, 12);
    const seedC = seeded(index, 13);
    positions[cursor] = MathUtils.lerp(-2.5, 3.15, seedA);
    positions[cursor + 1] = MathUtils.lerp(-2.05, 2.05, seedB);
    positions[cursor + 2] = MathUtils.lerp(-2.1, 1.8, seedC);
    sizes[index] = MathUtils.lerp(0.38, 1.08, seeded(index, 14));
    alphas[index] = MathUtils.lerp(0.05, 0.16, seeded(index, 15));
    seeds[index] = seedA * 8.1 + seedC * 2.4;
    layers[index] = 1;
    writeColor(colors, index, seeded(index, 16) > 0.86 ? cyan : silver);
  }

  return finalizeParticleGeometry(
    geometry,
    positions,
    colors,
    sizes,
    alphas,
    seeds,
    layers
  );
}

function createSignalGeometry() {
  const {
    geometry,
    positions,
    colors,
    sizes,
    alphas,
    seeds,
    layers,
  } = createParticleGeometry(signalParticleCount);

  for (let index = 0; index < signalParticleCount; index += 1) {
    const cursor = index * 3;
    const lane = index % 5;
    const phase = seeded(index, 22);
    positions[cursor] = 0;
    positions[cursor + 1] = 0;
    positions[cursor + 2] = 0;
    sizes[index] = MathUtils.lerp(0.68, 1.42, seeded(index, 23));
    alphas[index] = lane === 4 ? 0.1 : MathUtils.lerp(0.12, 0.28, seeded(index, 24));
    seeds[index] = phase;
    layers[index] = lane;
    writeColor(colors, index, lane === 1 || lane === 4 ? amber : cyan);
  }

  return finalizeParticleGeometry(
    geometry,
    positions,
    colors,
    sizes,
    alphas,
    seeds,
    layers
  );
}

const particleVertexShader = `
uniform float uTime;
uniform float uPixelRatio;
uniform float uGlobalAlpha;
uniform float uParallaxX;
uniform float uParallaxY;
uniform float uHoverAmount;
uniform float uHoverX;
uniform float uHoverY;
attribute vec3 aColor;
attribute float aSize;
attribute float aAlpha;
attribute float aSeed;
attribute float aLayer;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 radial = normalize(position + vec3(0.0001));
  float halo = smoothstep(0.7, 1.0, aLayer);
  float interior = 1.0 - smoothstep(0.32, 0.62, aLayer);
  float drift = sin(uTime * 0.22 + aSeed * 6.283 + position.y * 1.8) * 0.018;
  drift += cos(uTime * 0.16 + aSeed * 4.0 + position.z * 1.2) * 0.011;
  vec3 p = position + radial * drift * (0.45 + halo * 1.8);
  float front = smoothstep(-1.55, 1.65, p.z);
  float depthParallax = mix(0.01, 0.055, front) + halo * 0.018;
  p.x += uParallaxX * depthParallax;
  p.y += uParallaxY * depthParallax;

  if (uHoverAmount > 0.001) {
    vec2 hoverTarget = vec2(uHoverX, uHoverY);
    vec2 hoverDelta = hoverTarget - p.xy;
    float hoverDistance = dot(hoverDelta, hoverDelta);
    float attraction = smoothstep(1.15, 0.0, hoverDistance) * uHoverAmount * (1.0 - halo * 0.35);
    p.xy += hoverDelta * attraction * 0.032;
    p.z += attraction * 0.045;
  }

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  float depth = max(1.0, -mvPosition.z);
  vColor = aColor;
  vAlpha = aAlpha * uGlobalAlpha * mix(0.5, 1.08, front) * (0.78 + interior * 0.2);
  gl_PointSize = min(aSize * uPixelRatio * (38.0 / depth) * mix(0.86, 1.24, front), 7.0 * uPixelRatio);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const signalVertexShader = `
uniform float uTime;
uniform float uPixelRatio;
uniform float uGlobalAlpha;
uniform float uParallaxX;
uniform float uParallaxY;
attribute vec3 aColor;
attribute float aSize;
attribute float aAlpha;
attribute float aSeed;
attribute float aLayer;
varying vec3 vColor;
varying float vAlpha;

vec3 cubicBezier(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
  float omt = 1.0 - t;
  return omt * omt * omt * a + 3.0 * omt * omt * t * b + 3.0 * omt * t * t * c + t * t * t * d;
}

void main() {
  float lane = floor(aLayer + 0.5);
  float speed = 0.018 + lane * 0.0025;
  float t = fract(aSeed - uTime * speed);
  vec3 p0;
  vec3 p1;
  vec3 p2;
  vec3 p3;

  if (lane < 0.5) {
    p0 = vec3(3.0, 0.78, -0.95);
    p1 = vec3(2.42, 0.58, -0.72);
    p2 = vec3(1.72, 0.28, -0.36);
    p3 = vec3(0.88, 0.08, -0.08);
  } else if (lane < 1.5) {
    p0 = vec3(3.08, -0.82, 0.82);
    p1 = vec3(2.34, -0.58, 0.54);
    p2 = vec3(1.62, -0.32, 0.18);
    p3 = vec3(0.62, -0.12, 0.04);
  } else if (lane < 2.5) {
    p0 = vec3(2.86, 0.2, 1.22);
    p1 = vec3(2.22, 0.32, 0.82);
    p2 = vec3(1.5, 0.42, 0.42);
    p3 = vec3(0.46, 0.24, 0.02);
  } else if (lane < 3.5) {
    p0 = vec3(2.92, -0.06, -1.22);
    p1 = vec3(2.3, -0.12, -0.86);
    p2 = vec3(1.62, -0.06, -0.42);
    p3 = vec3(0.34, 0.04, -0.02);
  } else {
    p0 = vec3(2.7, 1.22, 0.22);
    p1 = vec3(2.02, 0.92, 0.18);
    p2 = vec3(1.34, 0.54, 0.08);
    p3 = vec3(0.18, 0.2, 0.0);
  }

  vec3 p = cubicBezier(p0, p1, p2, p3, t);
  p.y += sin(t * 6.283 + aSeed * 12.0) * 0.026;
  p.z += cos(t * 6.283 + aSeed * 9.0) * 0.032;
  float signalFront = smoothstep(-1.2, 1.2, p.z);
  p.x += uParallaxX * mix(0.01, 0.04, signalFront);
  p.y += uParallaxY * mix(0.006, 0.026, signalFront);

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  float depth = max(1.0, -mvPosition.z);
  float fade = smoothstep(0.0, 0.18, t) * (1.0 - smoothstep(0.82, 1.0, t));
  vColor = aColor;
  vAlpha = aAlpha * uGlobalAlpha * fade;
  gl_PointSize = min(aSize * uPixelRatio * (44.0 / depth), 5.8 * uPixelRatio);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const particleFragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 centered = gl_PointCoord - vec2(0.5);
  float radius = length(centered);
  float glow = smoothstep(0.5, 0.08, radius);
  float core = smoothstep(0.22, 0.0, radius);
  float alpha = (glow * 0.58 + core * 0.48) * vAlpha;
  if (alpha < 0.015) discard;
  gl_FragColor = vec4(vColor, alpha);
}
`;

function useSceneControls(anchorSelector: string): SceneControls {
  const isVisible = useRef(true);
  const isInViewport = useRef(true);
  const pointer = useRef({ x: 0, y: 0 });
  const hover = useRef({
    targetAmount: 0,
    targetX: 0,
    targetY: 0,
  });
  const drag = useRef({
    active: false,
    targetX: 0,
    targetY: 0,
    originX: 0,
    originY: 0,
    startClientX: 0,
    startClientY: 0,
  });
  const scroll = useRef(0);
  const hasSettledOffscreen = useRef(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(anchorSelector);
    if (!hero) return;

    const core = hero.querySelector<HTMLElement>(".data-core-frame");
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const layout = {
      heroLeft: 0,
      heroTop: 0,
      heroWidth: 1,
      heroHeight: 1,
      coreLeft: 0,
      coreTop: 0,
      coreWidth: 1,
      coreHeight: 1,
      scrollDistance: 1,
    };
    const pendingPointer = { clientX: 0, clientY: 0, hasUpdate: false };
    let scrollFrame = 0;
    let pointerFrame = 0;
    let layoutFrame = 0;

    const measureLayout = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const nextHeroRect = hero.getBoundingClientRect();
      layout.heroLeft = nextHeroRect.left + scrollX;
      layout.heroTop = nextHeroRect.top + scrollY;
      layout.heroWidth = Math.max(nextHeroRect.width, 1);
      layout.heroHeight = Math.max(nextHeroRect.height, 1);
      layout.scrollDistance = Math.max(layout.heroHeight * 0.58, 1);

      const nextCoreRect = core?.getBoundingClientRect();
      if (nextCoreRect) {
        layout.coreLeft = nextCoreRect.left + scrollX;
        layout.coreTop = nextCoreRect.top + scrollY;
        layout.coreWidth = Math.max(nextCoreRect.width, 1);
        layout.coreHeight = Math.max(nextCoreRect.height, 1);
      }
    };

    const scheduleLayoutMeasure = () => {
      cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        measureLayout();
      });
    };

    const updateScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const nextScroll = clamp01(
          (window.scrollY - layout.heroTop) / layout.scrollDistance
        );
        scroll.current = nextScroll;
        hasSettledOffscreen.current = nextScroll > 0.985;
      });
    };

    const resetPointer = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      hover.current.targetAmount = 0;
    };

    const pointerIsInCore = (clientX: number, clientY: number) => {
      const coreLeft = layout.coreLeft - window.scrollX;
      const coreTop = layout.coreTop - window.scrollY;
      return (
        clientX >= coreLeft &&
        clientX <= coreLeft + layout.coreWidth &&
        clientY >= coreTop &&
        clientY <= coreTop + layout.coreHeight
      );
    };

    const updatePointerTargets = (clientX: number, clientY: number) => {
      if (!isFinePointer.matches) {
        resetPointer();
        return;
      }

      const heroLeft = layout.heroLeft - window.scrollX;
      const heroTop = layout.heroTop - window.scrollY;
      pointer.current.x = clamp(
        (clientX - heroLeft) / layout.heroWidth - 0.5,
        -0.5,
        0.5
      );
      pointer.current.y = clamp(
        (clientY - heroTop) / layout.heroHeight - 0.5,
        -0.5,
        0.5
      );

      const isHoveringCore = pointerIsInCore(clientX, clientY);
      hover.current.targetAmount = isHoveringCore ? 1 : 0;
      if (isHoveringCore) {
        const coreLeft = layout.coreLeft - window.scrollX;
        const coreTop = layout.coreTop - window.scrollY;
        hover.current.targetX =
          clamp((clientX - coreLeft) / layout.coreWidth * 2 - 1, -1, 1) *
          1.15;
        hover.current.targetY =
          clamp(1 - (clientY - coreTop) / layout.coreHeight * 2, -1, 1) *
          1.05;
      }
    };

    const flushPointerUpdate = () => {
      pointerFrame = 0;
      if (!pendingPointer.hasUpdate) return;

      pendingPointer.hasUpdate = false;
      const { clientX, clientY } = pendingPointer;
      updatePointerTargets(clientX, clientY);

      if (drag.current.active) {
        const deltaX = clientX - drag.current.startClientX;
        const deltaY = clientY - drag.current.startClientY;
        drag.current.targetX = clamp(drag.current.originX + deltaX * 0.0024, -0.26, 0.26);
        drag.current.targetY = clamp(drag.current.originY + deltaY * 0.0018, -0.14, 0.14);
      }
    };

    const schedulePointerUpdate = (clientX: number, clientY: number) => {
      pendingPointer.clientX = clientX;
      pendingPointer.clientY = clientY;
      pendingPointer.hasUpdate = true;

      if (pointerFrame === 0) {
        pointerFrame = requestAnimationFrame(flushPointerUpdate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { rootMargin: "180px" }
    );
    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport.current = entry.isIntersecting;
      },
      { rootMargin: "0px" }
    );

    const handlePointerMove = (event: PointerEvent) => {
      if (!isVisible.current && !drag.current.active) return;
      schedulePointerUpdate(event.clientX, event.clientY);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.button !== 0 ||
        !isFinePointer.matches ||
        !pointerIsInCore(event.clientX, event.clientY)
      ) {
        return;
      }

      drag.current.active = true;
      drag.current.startClientX = event.clientX;
      drag.current.startClientY = event.clientY;
      drag.current.originX = drag.current.targetX;
      drag.current.originY = drag.current.targetY;
    };

    const handlePointerUp = () => {
      drag.current.active = false;
      drag.current.targetX = 0;
      drag.current.targetY = 0;
    };

    const handlePointerLeave = () => {
      resetPointer();
      drag.current.active = false;
    };

    measureLayout();
    updateScroll();
    observer.observe(hero);
    viewportObserver.observe(hero);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    hero.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", scheduleLayoutMeasure);
    window.addEventListener("resize", updateScroll);

    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(layoutFrame);
      observer.disconnect();
      viewportObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", scheduleLayoutMeasure);
      window.removeEventListener("resize", updateScroll);
    };
  }, [anchorSelector]);

  return {
    isVisible,
    isInViewport,
    pointer,
    hover,
    drag,
    scroll,
    hasSettledOffscreen,
  };
}

function useParticleUniforms(globalAlpha: number): ParticleUniforms {
  return useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: {
        value:
          typeof window === "undefined"
            ? 1
            : Math.min(window.devicePixelRatio || 1, 1.2),
      },
      uGlobalAlpha: { value: globalAlpha },
      uParallaxX: { value: 0 },
      uParallaxY: { value: 0 },
      uHoverAmount: { value: 0 },
      uHoverX: { value: 0 },
      uHoverY: { value: 0 },
    }),
    [globalAlpha]
  );
}

function GlobeParticles({
  controls,
  motion,
}: {
  controls: SceneControls;
  motion: RenderMotion;
}) {
  const geometry = useMemo(() => createGlobeGeometry(), []);
  const materialRef = useRef<ShaderMaterial>(null);
  const groupRef = useRef<Group>(null);
  const uniforms = useParticleUniforms(0.76);

  useFrame(({ clock }, delta) => {
    if (!controls.isVisible.current || controls.hasSettledOffscreen.current) {
      return;
    }

    const elapsed = clock.elapsedTime;

    const group = groupRef.current;
    if (!group) return;

    group.rotation.y += delta * 0.055;
    group.rotation.x = Math.sin(elapsed * 0.12) * 0.028;
    group.rotation.z = Math.cos(elapsed * 0.1) * 0.018;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uParallaxX.value = motion.current.pointerX;
      materialRef.current.uniforms.uParallaxY.value = -motion.current.pointerY;
      materialRef.current.uniforms.uHoverAmount.value =
        motion.current.hoverAmount * 0.42;
      materialRef.current.uniforms.uHoverX.value = motion.current.hoverX;
      materialRef.current.uniforms.uHoverY.value = motion.current.hoverY;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthTest
          depthWrite={false}
          blending={AdditiveBlending}
          fragmentShader={particleFragmentShader}
          toneMapped={false}
          uniforms={uniforms}
          vertexShader={particleVertexShader}
        />
      </points>
    </group>
  );
}

function AtmosphericField({
  controls,
  motion,
}: {
  controls: SceneControls;
  motion: RenderMotion;
}) {
  const geometry = useMemo(() => createFieldGeometry(), []);
  const materialRef = useRef<ShaderMaterial>(null);
  const groupRef = useRef<Group>(null);
  const uniforms = useParticleUniforms(0.42);

  useFrame(({ clock }, delta) => {
    if (!controls.isVisible.current || controls.hasSettledOffscreen.current) {
      return;
    }

    const elapsed = clock.elapsedTime;

    const group = groupRef.current;
    if (!group) return;

    group.rotation.y -= delta * 0.018;
    group.rotation.z = Math.sin(elapsed * 0.08) * 0.012;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uParallaxX.value =
        motion.current.pointerX * 1.16;
      materialRef.current.uniforms.uParallaxY.value =
        -motion.current.pointerY * 1.16;
    }
  });

  return (
    <group ref={groupRef} position={[0.04, 0.02, -0.34]} scale={1.05}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthTest
          depthWrite={false}
          blending={AdditiveBlending}
          fragmentShader={particleFragmentShader}
          toneMapped={false}
          uniforms={uniforms}
          vertexShader={particleVertexShader}
        />
      </points>
    </group>
  );
}

function SignalStreams({
  controls,
  motion,
}: {
  controls: SceneControls;
  motion: RenderMotion;
}) {
  const geometry = useMemo(() => createSignalGeometry(), []);
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useParticleUniforms(0.4);

  useFrame(({ clock }) => {
    if (!controls.isVisible.current || controls.hasSettledOffscreen.current) {
      return;
    }

    const elapsed = clock.elapsedTime;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uParallaxX.value =
        motion.current.pointerX * 0.82;
      materialRef.current.uniforms.uParallaxY.value =
        -motion.current.pointerY * 0.82;
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthTest
        depthWrite={false}
        blending={AdditiveBlending}
        fragmentShader={particleFragmentShader}
        toneMapped={false}
        uniforms={uniforms}
        vertexShader={signalVertexShader}
      />
    </points>
  );
}

function DataCoreScene({ controls }: { controls: SceneControls }) {
  const systemRef = useRef<Group>(null);
  const motionRef = useRef({
    pointerX: 0,
    pointerY: 0,
    hoverAmount: 0,
    hoverX: 0,
    hoverY: 0,
    dragX: 0,
    dragY: 0,
    scroll: 0,
  });

  useFrame(({ clock }, delta) => {
    if (!controls.isVisible.current || !controls.isInViewport.current) return;
    const motion = motionRef.current;

    const pointerEase = 1 - Math.pow(0.001, Math.min(delta * 3.2, 1));
    const hoverEase = 1 - Math.pow(0.001, Math.min(delta * 4.1, 1));
    const dragEase = 1 - Math.pow(0.001, Math.min(delta * 2.8, 1));
    const scrollEase = 1 - Math.pow(0.001, Math.min(delta * 2.2, 1));

    motion.pointerX = MathUtils.lerp(
      motion.pointerX,
      controls.pointer.current.x,
      pointerEase
    );
    motion.pointerY = MathUtils.lerp(
      motion.pointerY,
      controls.pointer.current.y,
      pointerEase
    );
    motion.hoverAmount = MathUtils.lerp(
      motion.hoverAmount,
      controls.hover.current.targetAmount,
      hoverEase
    );
    motion.hoverX = MathUtils.lerp(
      motion.hoverX,
      controls.hover.current.targetX,
      hoverEase
    );
    motion.hoverY = MathUtils.lerp(
      motion.hoverY,
      controls.hover.current.targetY,
      hoverEase
    );
    motion.dragX = MathUtils.lerp(
      motion.dragX,
      controls.drag.current.active ? controls.drag.current.targetX : 0,
      dragEase
    );
    motion.dragY = MathUtils.lerp(
      motion.dragY,
      controls.drag.current.active ? controls.drag.current.targetY : 0,
      dragEase
    );
    motion.scroll = MathUtils.lerp(
      motion.scroll,
      easeOutCubic(controls.scroll.current),
      scrollEase
    );

    const system = systemRef.current;
    if (!system) return;

    const elapsed = clock.elapsedTime;
    const scrollAmount = motion.scroll;
    const targetRotationX =
      Math.cos(elapsed * 0.07) * 0.018 -
      motion.pointerY * 0.07 +
      motion.dragY;
    const targetRotationY =
      Math.sin(elapsed * 0.08) * 0.045 +
      motion.pointerX * 0.1 +
      motion.dragX +
      scrollAmount * 0.055;
    const targetRotationZ =
      Math.sin(elapsed * 0.06) * 0.01 -
      motion.pointerX * 0.018;

    system.rotation.x = MathUtils.lerp(system.rotation.x, targetRotationX, 0.08);
    system.rotation.y = MathUtils.lerp(system.rotation.y, targetRotationY, 0.08);
    system.rotation.z = MathUtils.lerp(system.rotation.z, targetRotationZ, 0.08);
    system.position.x = MathUtils.lerp(
      system.position.x,
      scrollAmount * 0.22 + motion.pointerX * 0.035,
      0.07
    );
    system.position.y = MathUtils.lerp(
      system.position.y,
      -0.05 + Math.sin(elapsed * 0.11) * 0.024 + scrollAmount * 0.16,
      0.07
    );
    system.scale.setScalar(1.28 * (1 - scrollAmount * 0.075));
  }, -1);

  return (
    <group ref={systemRef} position={[0.04, -0.05, 0]} scale={1.28}>
      <AtmosphericField controls={controls} motion={motionRef} />
      <GlobeParticles controls={controls} motion={motionRef} />
      <SignalStreams controls={controls} motion={motionRef} />
    </group>
  );
}

function WebglFallback() {
  return <div className="data-core-webgl-fallback" aria-hidden="true" />;
}

export function DataIntelligenceCore({
  anchorSelector,
}: {
  anchorSelector: string;
}) {
  const controls = useSceneControls(anchorSelector);

  return (
    <Canvas
      aria-hidden="true"
      className="data-core-canvas"
      camera={{ position: [0, 0, 6.8], fov: 42, near: 0.1, far: 24 }}
      dpr={[1, 1.2]}
      fallback={<WebglFallback />}
      frameloop="always"
      gl={{
        alpha: true,
        antialias: true,
        depth: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      role="presentation"
    >
      <DataCoreScene controls={controls} />
      <Preload all />
    </Canvas>
  );
}
