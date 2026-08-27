import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { atmosphereFragment, planetFragment, planetVertex } from './shaders';

const LIGHT_DIR = new THREE.Vector3(0.75, 0.5, 0.42).normalize();

interface PlanetProps {
  still: boolean;
}

function Planet({ still }: PlanetProps) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const satellite = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const bodyUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLightDir: { value: LIGHT_DIR },
      uBase: { value: new THREE.Color('#080a18') },
      uLit: { value: new THREE.Color('#2a2352') },
      uRim: { value: new THREE.Color('#7b6bf0') },
    }),
    [],
  );

  const atmoUniforms = useMemo(
    () => ({
      uLightDir: { value: LIGHT_DIR },
      uColor: { value: new THREE.Color('#8f7bff') },
      uStrength: { value: 0.85 },
    }),
    [],
  );

  // Scale the whole composition with the viewport so the planet keeps the
  // same visual weight from a phone to an ultrawide.
  const scale = Math.min(Math.max(viewport.width / 9, 0.62), 1.25);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    bodyUniforms.uTime.value += d;

    if (!still) {
      if (body.current) body.current.rotation.y += d * 0.028;
      if (satellite.current) satellite.current.rotation.z += d * 0.12;
    }

    // Pointer parallax, heavily damped. Reads as the camera breathing, not
    // as an element chasing the cursor.
    if (group.current) {
      const targetX = still ? 0 : state.pointer.y * 0.06;
      const targetY = still ? 0 : state.pointer.x * 0.1;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.028;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.028;
    }
  });

  return (
    <group ref={group} position={[1.15, -1.35, 0]} scale={scale}>
      {/* Body */}
      <mesh ref={body} rotation={[0.22, 0, 0.12]}>
        <sphereGeometry args={[2.1, 72, 48]} />
        <shaderMaterial
          vertexShader={planetVertex}
          fragmentShader={planetFragment}
          uniforms={bodyUniforms}
        />
      </mesh>

      {/* Atmosphere shell */}
      <mesh scale={1.055}>
        <sphereGeometry args={[2.1, 48, 32]} />
        <shaderMaterial
          vertexShader={planetVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmoUniforms}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital paths + satellite */}
      <group ref={satellite} rotation={[1.32, 0.16, 0]}>
        <mesh>
          <torusGeometry args={[3.05, 0.0055, 3, 160]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.32} depthWrite={false} />
        </mesh>
        <mesh position={[3.05, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 12]} />
          <meshBasicMaterial color="#cbbcff" />
        </mesh>
      </group>

      <mesh rotation={[1.18, -0.3, 0.4]}>
        <torusGeometry args={[3.85, 0.004, 3, 160]} />
        <meshBasicMaterial color="#5b7cf0" transparent opacity={0.14} depthWrite={false} />
      </mesh>
    </group>
  );
}

interface PlanetSceneProps {
  /** When true the scene renders one static frame and then idles. */
  still?: boolean;
}

/**
 * The one place WebGL earns its cost. A soft day/night terminator with a
 * crescent atmosphere is not something CSS gradients fake convincingly, and
 * it is the single strongest image on the landing screen.
 *
 * Budget: two spheres and two rings, no lights, no post-processing, no
 * shadow maps — roughly 8k triangles with three draw calls of real work.
 */
export default function PlanetScene({ still = false }: PlanetSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={still ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 8], fov: 42 }}
      style={{ pointerEvents: 'none' }}
    >
      <Planet still={still} />
    </Canvas>
  );
}
