import { OrbitControls, useAnimations, useFBX } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Ref, Suspense, useEffect } from 'react'
import { Group } from 'three'

type QmaSceneType = {
  actionType: string
}

const getActionNum = (actionType: string): number => {
  switch (actionType) {
    case '静止':
      return 0
    case '困惑':
      return 1
    case '頷き':
      return 2
    case '挨拶':
      return 3
    case '跳躍':
      return 4
    case '説得':
      return 5
    default:
      return 0
  }
}

const QmaScene: React.FC<QmaSceneType> = ({ actionType }) => {
  const fbx = useFBX('/StuffedBear.fbx')
  const { ref, actions, names } = useAnimations(fbx.animations)

  // 0: 静止: Action
  // 1: 困惑：Ponder
  // 2: 頷き：Nod
  // 3: 挨拶：WaveHands
  // 4: 跳躍：Inspiration
  // 5: 説得：Explanation

  const actionNum = getActionNum(actionType)
  useEffect(() => {
    actions[names[actionNum]]?.reset().fadeIn(1).play()

    return () => void actions[names[actionNum]]?.fadeOut(1)
  }, [actions, names, actionType])

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

export type ActionType = '静止' | '困惑' | '頷き' | '挨拶' | '跳躍' | '説得'

type Qma3DProps = {
  actionType: ActionType
}
export const Qma3D: React.FC<Qma3DProps> = ({ actionType }) => {
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
        <QmaScene actionType={actionType} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}
