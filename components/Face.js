import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, useTime } from "framer-motion";
import { degreesToRadians, mix } from "popmotion";

export default function Face({ container }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
      <ambientLight intensity={1} />
      <spotLight
        intensity={10}
        angle={10}
        penumbra={1}
        position={[0, 0, 2]}
        castShadow
      />
      <ContactShadows
        resolution={512}
        position={[0, -0.8, 0]}
        opacity={1}
        scale={10}
        blur={2}
        far={0.8}
      />
      <Scene containerObj={container} />
    </Canvas>
  );
}

function Scene({ containerObj }) {
  const { scrollYProgress } = useScroll({ target: containerObj });
  const { camera } = useThree();

  // Similar to previous, adjust camera's position based on scroll and time
  const yAngle = useTransform(
    scrollYProgress,
    [0, 0.21, 0.34, 0.46, 0.7, 1],
    [
      degreesToRadians(60),
      degreesToRadians(65),
      degreesToRadians(80),
      degreesToRadians(82),
      degreesToRadians(88),
      degreesToRadians(180 / 2),
    ]
  );
  const xAngle = useTransform(
    scrollYProgress,
    [0, 0.21, 0.6, 0.7, 1],
    [
      degreesToRadians(-30),
      degreesToRadians(0),
      degreesToRadians(0),
      degreesToRadians(30),
      degreesToRadians(30),
    ]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3.5]);

  useFrame(() => {
    // Update camera position
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      xAngle.get()
    );
    camera.lookAt(0, 0, 0);
  });

  return <Model />;
}

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/mia faccia_plug.glb");
  const ref = useRef(null);
  const eye = useRef(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 10;
    eye.current.rotation.set(
      Math.cos(t / 8) / 8,
      Math.sin(t / 6) / 4,
      0.15 + Math.sin(t / 4) / 8
    );
  });
  return (
    <group {...props} dispose={null} ref={ref}>
      <group position={[0, 0.3, 0]} scale={6}>
        <skinnedMesh
          ref={eye}
          name="EyeLeft002"
          geometry={nodes.EyeLeft002.geometry}
          material={materials["Wolf3D_Eye.001"]}
          skeleton={nodes.EyeLeft002.skeleton}
          morphTargetDictionary={nodes.EyeLeft002.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft002.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight002"
          geometry={nodes.EyeRight002.geometry}
          material={materials["Wolf3D_Eye.001"]}
          skeleton={nodes.EyeRight002.skeleton}
          morphTargetDictionary={nodes.EyeRight002.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight002.morphTargetInfluences}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair003.geometry}
          material={materials["Wolf3D_Hair.001"]}
          skeleton={nodes.Wolf3D_Hair003.skeleton}
        />
        <skinnedMesh
          name="Wolf3D_Head002"
          geometry={nodes.Wolf3D_Head002.geometry}
          material={materials["Wolf3D_Skin.001"]}
          skeleton={nodes.Wolf3D_Head002.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head002.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head002.morphTargetInfluences}
        />
        <primitive object={nodes.Neck} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/mia faccia_plug.glb");
