"use client";

import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  MathUtils,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { useEffect, useRef } from "react";

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

function createParticleUniforms(
  globalAlpha: number,
  pixelRatio: number
): ParticleUniforms {
  return {
    uTime: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uGlobalAlpha: { value: globalAlpha },
    uParallaxX: { value: 0 },
    uParallaxY: { value: 0 },
    uHoverAmount: { value: 0 },
    uHoverX: { value: 0 },
    uHoverY: { value: 0 },
  };
}

function createParticleMaterial(
  uniforms: ParticleUniforms,
  vertexShader: string
) {
  return new ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: AdditiveBlending,
    fragmentShader: particleFragmentShader,
    toneMapped: false,
    uniforms,
    vertexShader,
  });
}

export function DataIntelligenceCore({
  anchorSelector,
}: {
  anchorSelector: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const hero = document.querySelector<HTMLElement>(anchorSelector);
    if (!mount || !hero) return;

    const deviceMemory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const isLowerPowerDevice =
      navigator.hardwareConcurrency <= 4 || deviceMemory <= 4;
    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      isLowerPowerDevice ? 1 : 1.2
    );
    let renderer: WebGLRenderer;

    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        depth: true,
        powerPreference: "high-performance",
        stencil: false,
      });
    } catch {
      mount.dataset.webglStatus = "unsupported";
      return;
    }

    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "data-core-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.setAttribute("role", "presentation");
    mount.appendChild(renderer.domElement);
    mount.dataset.webglStatus = "ready";
    mount.dataset.animationState = "paused";

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.1, 24);
    camera.position.set(0, 0, 6.8);

    const system = new Group();
    system.position.set(0.04, -0.05, 0);
    system.scale.setScalar(1.28);

    const atmosphericGroup = new Group();
    atmosphericGroup.position.set(0.04, 0.02, -0.34);
    atmosphericGroup.scale.setScalar(1.05);
    const globeGroup = new Group();

    const globeGeometry = createGlobeGeometry();
    const fieldGeometry = createFieldGeometry();
    const signalGeometry = createSignalGeometry();
    const globeUniforms = createParticleUniforms(0.76, pixelRatio);
    const fieldUniforms = createParticleUniforms(0.42, pixelRatio);
    const signalUniforms = createParticleUniforms(0.4, pixelRatio);
    const globeMaterial = createParticleMaterial(
      globeUniforms,
      particleVertexShader
    );
    const fieldMaterial = createParticleMaterial(
      fieldUniforms,
      particleVertexShader
    );
    const signalMaterial = createParticleMaterial(
      signalUniforms,
      signalVertexShader
    );
    const globePoints = new Points(globeGeometry, globeMaterial);
    const fieldPoints = new Points(fieldGeometry, fieldMaterial);
    const signalPoints = new Points(signalGeometry, signalMaterial);
    globePoints.frustumCulled = false;
    fieldPoints.frustumCulled = false;
    signalPoints.frustumCulled = false;
    globeGroup.add(globePoints);
    atmosphericGroup.add(fieldPoints);
    system.add(atmosphericGroup, globeGroup, signalPoints);
    scene.add(system);

    const controls: SceneControls = {
      isVisible: { current: true },
      isInViewport: { current: true },
      pointer: { current: { x: 0, y: 0 } },
      hover: {
        current: { targetAmount: 0, targetX: 0, targetY: 0 },
      },
      drag: {
        current: {
          active: false,
          targetX: 0,
          targetY: 0,
          originX: 0,
          originY: 0,
          startClientX: 0,
          startClientY: 0,
        },
      },
      scroll: { current: 0 },
      hasSettledOffscreen: { current: false },
    };
    const motion = {
      pointerX: 0,
      pointerY: 0,
      hoverAmount: 0,
      hoverX: 0,
      hoverY: 0,
      dragX: 0,
      dragY: 0,
      scroll: 0,
    };
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
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    let animationFrame = 0;
    let elapsedSeconds = 0;
    let lastFrameTime = performance.now();
    let scrollFrame = 0;
    let pointerFrame = 0;
    let layoutFrame = 0;
    let resizeFrame = 0;
    let pageIsActive = !document.hidden;
    let contextIsLost = false;
    let disposed = false;

    const renderScene = (delta: number) => {
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

      const scrollAmount = motion.scroll;
      const targetRotationX =
        Math.cos(elapsedSeconds * 0.07) * 0.018 -
        motion.pointerY * 0.07 +
        motion.dragY;
      const targetRotationY =
        Math.sin(elapsedSeconds * 0.08) * 0.045 +
        motion.pointerX * 0.1 +
        motion.dragX +
        scrollAmount * 0.055;
      const targetRotationZ =
        Math.sin(elapsedSeconds * 0.06) * 0.01 -
        motion.pointerX * 0.018;
      system.rotation.x = MathUtils.lerp(
        system.rotation.x,
        targetRotationX,
        0.08
      );
      system.rotation.y = MathUtils.lerp(
        system.rotation.y,
        targetRotationY,
        0.08
      );
      system.rotation.z = MathUtils.lerp(
        system.rotation.z,
        targetRotationZ,
        0.08
      );
      system.position.x = MathUtils.lerp(
        system.position.x,
        scrollAmount * 0.22 + motion.pointerX * 0.035,
        0.07
      );
      system.position.y = MathUtils.lerp(
        system.position.y,
        -0.05 + Math.sin(elapsedSeconds * 0.11) * 0.024 + scrollAmount * 0.16,
        0.07
      );
      system.scale.setScalar(1.28 * (1 - scrollAmount * 0.075));

      globeGroup.rotation.y += delta * 0.055;
      globeGroup.rotation.x = Math.sin(elapsedSeconds * 0.12) * 0.028;
      globeGroup.rotation.z = Math.cos(elapsedSeconds * 0.1) * 0.018;
      atmosphericGroup.rotation.y -= delta * 0.018;
      atmosphericGroup.rotation.z =
        Math.sin(elapsedSeconds * 0.08) * 0.012;

      globeUniforms.uTime.value = elapsedSeconds;
      globeUniforms.uParallaxX.value = motion.pointerX;
      globeUniforms.uParallaxY.value = -motion.pointerY;
      globeUniforms.uHoverAmount.value = motion.hoverAmount * 0.42;
      globeUniforms.uHoverX.value = motion.hoverX;
      globeUniforms.uHoverY.value = motion.hoverY;
      fieldUniforms.uTime.value = elapsedSeconds;
      fieldUniforms.uParallaxX.value = motion.pointerX * 1.16;
      fieldUniforms.uParallaxY.value = -motion.pointerY * 1.16;
      signalUniforms.uTime.value = elapsedSeconds;
      signalUniforms.uParallaxX.value = motion.pointerX * 0.82;
      signalUniforms.uParallaxY.value = -motion.pointerY * 0.82;
      renderer.render(scene, camera);
    };

    const shouldAnimate = () =>
      !disposed &&
      !contextIsLost &&
      pageIsActive &&
      controls.isVisible.current &&
      controls.isInViewport.current &&
      !controls.hasSettledOffscreen.current;

    const stopAnimation = () => {
      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      mount.dataset.animationState = "paused";
    };

    const animate = (now: number) => {
      animationFrame = 0;
      if (!shouldAnimate()) return;
      const delta = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;
      elapsedSeconds += delta;
      renderScene(delta);
      animationFrame = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrame !== 0 || !shouldAnimate()) return;
      lastFrameTime = performance.now();
      mount.dataset.animationState = "running";
      animationFrame = requestAnimationFrame(animate);
    };

    const reconcileAnimation = () => {
      if (shouldAnimate()) startAnimation();
      else stopAnimation();
    };

    const resizeRenderer = () => {
      resizeFrame = 0;
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (!contextIsLost) renderer.render(scene, camera);
    };

    const scheduleResize = () => {
      if (resizeFrame === 0) {
        resizeFrame = requestAnimationFrame(resizeRenderer);
      }
    };

    const measureLayout = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const heroRect = hero.getBoundingClientRect();
      const coreRect = mount.getBoundingClientRect();
      layout.heroLeft = heroRect.left + scrollX;
      layout.heroTop = heroRect.top + scrollY;
      layout.heroWidth = Math.max(heroRect.width, 1);
      layout.heroHeight = Math.max(heroRect.height, 1);
      layout.scrollDistance = Math.max(layout.heroHeight * 0.58, 1);
      layout.coreLeft = coreRect.left + scrollX;
      layout.coreTop = coreRect.top + scrollY;
      layout.coreWidth = Math.max(coreRect.width, 1);
      layout.coreHeight = Math.max(coreRect.height, 1);
    };

    const scheduleLayoutMeasure = () => {
      cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        layoutFrame = 0;
        measureLayout();
      });
    };

    const updateScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const nextScroll = clamp01(
          (window.scrollY - layout.heroTop) / layout.scrollDistance
        );
        controls.scroll.current = nextScroll;
        controls.hasSettledOffscreen.current = nextScroll > 0.985;
        reconcileAnimation();
      });
    };

    const resetPointer = () => {
      controls.pointer.current.x = 0;
      controls.pointer.current.y = 0;
      controls.hover.current.targetAmount = 0;
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
      if (!finePointerQuery.matches) {
        resetPointer();
        return;
      }
      const heroLeft = layout.heroLeft - window.scrollX;
      const heroTop = layout.heroTop - window.scrollY;
      controls.pointer.current.x = clamp(
        (clientX - heroLeft) / layout.heroWidth - 0.5,
        -0.5,
        0.5
      );
      controls.pointer.current.y = clamp(
        (clientY - heroTop) / layout.heroHeight - 0.5,
        -0.5,
        0.5
      );
      const isHoveringCore = pointerIsInCore(clientX, clientY);
      controls.hover.current.targetAmount = isHoveringCore ? 1 : 0;
      if (isHoveringCore) {
        const coreLeft = layout.coreLeft - window.scrollX;
        const coreTop = layout.coreTop - window.scrollY;
        controls.hover.current.targetX =
          clamp(((clientX - coreLeft) / layout.coreWidth) * 2 - 1, -1, 1) *
          1.15;
        controls.hover.current.targetY =
          clamp(1 - ((clientY - coreTop) / layout.coreHeight) * 2, -1, 1) *
          1.05;
      }
    };

    const flushPointerUpdate = () => {
      pointerFrame = 0;
      if (!pendingPointer.hasUpdate) return;
      pendingPointer.hasUpdate = false;
      updatePointerTargets(pendingPointer.clientX, pendingPointer.clientY);
      if (controls.drag.current.active) {
        const deltaX =
          pendingPointer.clientX - controls.drag.current.startClientX;
        const deltaY =
          pendingPointer.clientY - controls.drag.current.startClientY;
        controls.drag.current.targetX = clamp(
          controls.drag.current.originX + deltaX * 0.0024,
          -0.26,
          0.26
        );
        controls.drag.current.targetY = clamp(
          controls.drag.current.originY + deltaY * 0.0018,
          -0.14,
          0.14
        );
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

    const handlePointerMove = (event: PointerEvent) => {
      if (!controls.isInViewport.current && !controls.drag.current.active) {
        return;
      }
      schedulePointerUpdate(event.clientX, event.clientY);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.button !== 0 ||
        !finePointerQuery.matches ||
        !pointerIsInCore(event.clientX, event.clientY)
      ) {
        return;
      }
      controls.drag.current.active = true;
      controls.drag.current.startClientX = event.clientX;
      controls.drag.current.startClientY = event.clientY;
      controls.drag.current.originX = controls.drag.current.targetX;
      controls.drag.current.originY = controls.drag.current.targetY;
    };

    const handlePointerUp = () => {
      controls.drag.current.active = false;
      controls.drag.current.targetX = 0;
      controls.drag.current.targetY = 0;
    };

    const handlePointerLeave = () => {
      resetPointer();
      handlePointerUp();
    };

    const handleVisibilityChange = () => {
      pageIsActive = !document.hidden;
      reconcileAnimation();
    };
    const handlePageHide = () => {
      pageIsActive = false;
      reconcileAnimation();
    };
    const handlePageShow = () => {
      pageIsActive = !document.hidden;
      reconcileAnimation();
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextIsLost = true;
      mount.dataset.webglStatus = "lost";
      stopAnimation();
    };
    const handleContextRestored = () => {
      contextIsLost = false;
      mount.dataset.webglStatus = "ready";
      resizeRenderer();
      reconcileAnimation();
    };

    const viewportObserver = new IntersectionObserver(([entry]) => {
      controls.isVisible.current = entry.isIntersecting;
      controls.isInViewport.current = entry.isIntersecting;
      reconcileAnimation();
    });
    const resizeObserver = new ResizeObserver(() => {
      scheduleResize();
      scheduleLayoutMeasure();
    });

    renderer.domElement.addEventListener(
      "webglcontextlost",
      handleContextLost
    );
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      handleContextRestored
    );
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    hero.addEventListener("pointerleave", handlePointerLeave);
    viewportObserver.observe(hero);
    resizeObserver.observe(mount);
    measureLayout();
    resizeRenderer();
    updateScroll();
    startAnimation();

    return () => {
      disposed = true;
      stopAnimation();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(layoutFrame);
      cancelAnimationFrame(resizeFrame);
      viewportObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        handleContextRestored
      );
      scene.clear();
      globeGeometry.dispose();
      fieldGeometry.dispose();
      signalGeometry.dispose();
      globeMaterial.dispose();
      fieldMaterial.dispose();
      signalMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [anchorSelector]);

  return (
    <div
      ref={mountRef}
      className="data-core-webgl-root"
      data-webgl-status="pending"
      aria-hidden="true"
      role="presentation"
    >
      <div className="data-core-webgl-fallback" />
    </div>
  );
}
