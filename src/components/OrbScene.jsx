import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Sculpture() {
  const group = useRef();
  const core = useRef();
  useFrame((state, delta) => {
    if (!group.current || !core.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * -0.18, 0.025);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.26 + state.clock.elapsedTime * 0.13, 0.02);
    core.current.rotation.z += delta * 0.16;
  });
  return (
    <group ref={group} rotation={[0.25, -0.25, 0.12]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh ref={core} scale={1.32}>
          <icosahedronGeometry args={[1.22, 6]} />
          <meshPhysicalMaterial color="#776bff" metalness={0.55} roughness={0.16} transmission={0.23} thickness={1.4} clearcoat={1} clearcoatRoughness={0.13} flatShading={false} />
        </mesh>
        <mesh scale={1.32}>
          <icosahedronGeometry args={[1.235, 2]} />
          <meshBasicMaterial color="#c5adff" wireframe transparent opacity={0.23} />
        </mesh>
        <mesh rotation={[1.2, 0.4, 0.4]}>
          <torusGeometry args={[2.03, 0.018, 12, 180]} />
          <meshBasicMaterial color="#65dfd9" transparent opacity={0.83} />
        </mesh>
        <mesh rotation={[0.25, 1.1, -0.5]}>
          <torusGeometry args={[1.82, 0.014, 12, 180]} />
          <meshBasicMaterial color="#a99cff" transparent opacity={0.58} />
        </mesh>
      </Float>
    </group>
  );
}

function SmallScreensFallback() {
  return <div className="orb-fallback" aria-hidden="true"><span /></div>;
}

export default function OrbScene() {
  const canUseWebGL = (() => {
    try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
    catch { return false; }
  })();
  if (!canUseWebGL) return <SmallScreensFallback />;
  return (
    <Canvas className="orb-canvas" dpr={[1, 1.7]} camera={{ position: [0, 0, 7.6], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} fallback={<SmallScreensFallback />}>
      <ambientLight intensity={0.95} />
      <directionalLight color="#bdb1ff" position={[3, 3, 5]} intensity={2.8} />
      <pointLight color="#60e6d8" position={[-3, -1, 3]} intensity={48} distance={11} />
      <pointLight color="#b07cff" position={[3, -3, 0]} intensity={40} distance={10} />
      <Suspense fallback={null}>
        <Sculpture />
        <Sparkles count={65} scale={[7, 6, 3]} size={1.4} speed={0.25} color="#b8a7ff" />
      </Suspense>
    </Canvas>
  );
}
