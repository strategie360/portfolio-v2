"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { Finish, Shade, Size } from "./content";

type LampProps = { finish: Finish; shade: Shade; size: Size; lit: boolean };

/**
 * Lampe modélisée à partir de primitives Three.js (aucun fichier .glb).
 * Pour un vrai produit, on remplacerait ce composant par un modèle
 * exporté de Blender et chargé avec useGLTF.
 */
function Lamp({ finish, shade, size, lit }: LampProps) {
  const group = useRef<THREE.Group>(null);
  const glass = useRef<THREE.MeshPhysicalMaterial>(null);
  const bulb = useRef<THREE.PointLight>(null);
  const target = useRef(new THREE.Color());

  // Matériaux métal du socle, de la tige et de la bague (animés ensemble).
  const baseMetal = useRef<THREE.MeshStandardMaterial>(null);
  const stemMetal = useRef<THREE.MeshStandardMaterial>(null);
  const ringMetal = useRef<THREE.MeshStandardMaterial>(null);

  // Transitions douces : intensité de la lumière, couleur du métal, échelle.
  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 6);
    if (glass.current) {
      glass.current.emissiveIntensity = THREE.MathUtils.lerp(glass.current.emissiveIntensity, lit ? 0.75 : 0, k);
      glass.current.color.lerp(target.current.set(shade.color), k);
      glass.current.emissive.lerp(target.current.set(shade.glow), k);
    }
    if (bulb.current) bulb.current.intensity = THREE.MathUtils.lerp(bulb.current.intensity, lit ? 6 : 0, k);
    target.current.set(finish.color);
    for (const ref of [baseMetal, stemMetal, ringMetal]) {
      const m = ref.current;
      if (!m) continue;
      m.color.lerp(target.current, k);
      m.roughness = THREE.MathUtils.lerp(m.roughness, finish.roughness, k);
      m.metalness = THREE.MathUtils.lerp(m.metalness, finish.metalness, k);
    }
    if (group.current) {
      const s = THREE.MathUtils.lerp(group.current.scale.x, size.scale, k);
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group} position={[0, -1.45, 0]}>
      {/* Socle */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.68, 0.12, 96]} />
        <meshStandardMaterial ref={baseMetal} color="#C9A15B" metalness={1} roughness={0.3} />
      </mesh>
      {/* Tige */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.3, 32]} />
        <meshStandardMaterial ref={stemMetal} color="#C9A15B" metalness={1} roughness={0.3} />
      </mesh>
      {/* Bague sous le globe */}
      <mesh position={[0, 1.38, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.16, 0.12, 64]} />
        <meshStandardMaterial ref={ringMetal} color="#C9A15B" metalness={1} roughness={0.3} />
      </mesh>
      {/* Globe */}
      <mesh position={[0, 2.15, 0]} castShadow>
        <sphereGeometry args={[0.82, 96, 96]} />
        <meshPhysicalMaterial
          ref={glass}
          color={shade.color}
          emissive={shade.glow}
          emissiveIntensity={lit ? 0.75 : 0}
          roughness={0.45}
          transmission={0}
          clearcoat={1}
          clearcoatRoughness={0.15}
          sheen={0.4}
        />
      </mesh>
      <pointLight ref={bulb} position={[0, 2.15, 0]} color={shade.glow} intensity={lit ? 6 : 0} distance={8} decay={1.6} />
    </group>
  );
}

/**
 * Quand le titre est en surimpression (≥ 1280 px), on décale la *projection*
 * de la caméra plutôt que la lampe : elle reste au centre de l'orbite, donc
 * elle tourne sur elle-même sans jamais passer derrière le titre.
 */
function ViewOffset({ offset }: { offset: boolean }) {
  const get = useThree((state) => state.get);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);

  useEffect(() => {
    const camera = get().camera as THREE.PerspectiveCamera;
    if (offset) camera.setViewOffset(width, height, -width * 0.3, 0, width, height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }, [get, offset, width, height]);

  return null;
}

export default function OrbeScene(props: LampProps & { autoRotate: boolean; offset: boolean }) {
  const { autoRotate, offset, ...lamp } = props;
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 8.2], fov: 35 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ touchAction: "pan-y" }}
      resize={{ debounce: 0 }}
      aria-label="Lampe Orbe en 3D — faites-la pivoter à la souris"
    >
      <ambientLight intensity={0.15} />
      <spotLight position={[4, 6, 4]} angle={0.4} penumbra={1} intensity={30} castShadow />

      <ViewOffset offset={offset} />
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25} floatingRange={[-0.03, 0.03]}>
        <Lamp {...lamp} />
      </Float>
      <ContactShadows position={[0, -1.45, 0]} opacity={0.55} scale={8} blur={2.6} far={3} />

      {/* Environnement d'éclairage local (pas de HDR téléchargé) */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2} position={[0, 4, -4]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[4, 6, 1]} />
        <Lightformer form="ring" color="#ffd9a0" intensity={1.5} position={[0, 2, 5]} scale={2} />
      </Environment>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}
