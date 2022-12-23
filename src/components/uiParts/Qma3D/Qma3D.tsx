import { OrbitControls, useAnimations, useFBX } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Ref, Suspense, useEffect } from 'react'
import { Group } from 'three'

const Scene = () => {
  const fbx = useFBX('/StuffedBear.fbx')
  const { ref, actions, names } = useAnimations(fbx.animations)

  // 手を振るアクションが 1 に格納されている
  useEffect(() => {
    actions[names[3]]?.reset().fadeIn(1).play()

    return () => void actions[names[3]]?.fadeOut(1)
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
  // x:0 横向きに回転する, y:0 ？, z: 縦向きに回転する

  // ambientLight 環境光源：3D空間全体を照らす役割，これ単体で使うことは少なく，大抵の場合他の高原と一緒に利用する
  // パラメータ：intensityを高くすると明るくなる
  // directionLight 平行光源
  // パラメータ：position: x横から，y上から，z前から
  // spotLight : スポットライト
  // パラメータ：色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率
  return (
    <Canvas camera={{ position: [0, 200, 900], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={12} />
        <directionalLight color='white' intensity={10} position={[0, 2, 1]} />
        <spotLight color='white' intensity={4} position={[0, 4, -1]} />
        <Scene />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}
