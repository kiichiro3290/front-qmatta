import { OrbitControls, useAnimations, useFBX } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Ref, Suspense, useEffect } from 'react'
import { Group } from 'three'

const Scene = () => {
  const fbx = useFBX('/StuffedBear_withMotion.fbx')
  const { ref, actions, names } = useAnimations(fbx.animations)

  // 手を振るアクションが 1 に格納されている
  useEffect(() => {
    actions[names[1]]?.reset().fadeIn(0.5).play()

    return () => void actions[names[1]]?.fadeOut(0.5)
  }, [actions, names])

  return (
    <>
      {ref && (
        <group ref={ref as Ref<Group>} dispose={null}>
          <primitive object={fbx} />
        </group>
      )}
    </>
  )
}

export const Qma3D: React.FC = () => {
  // TODO: cameraの位置
  // TODO: shadower
  // TODO: canvasの大きさのレスポンシブ
  return (
    <Canvas camera={{ position: [100, 100, 800], fov: 50 }} shadows>
      <Suspense fallback={null}>
        <ambientLight intensity={2} />
        <directionalLight color='white' position={[0, 0, 5]} />
        <Scene />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}
