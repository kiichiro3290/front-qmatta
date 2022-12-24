import { QmaPagePresenter } from './presenter'

import {
  getChatHistory,
  getQmaReply,
  getQmaReplyAndMoya,
  getQmaReplyAndMoyaNotLogin,
  getQmaReplyNotLogin,
} from '~/api/client/back/bear'
import { ActionType } from '~/components/uiParts/Qma3D/Qma3D'
import { AppDispatch } from '~/store'
import { messageHistoryState } from '~/store/bear/bearSlice'
import { fetchCommunityList } from '~/store/user/actions'
import { selectIsLoggedIn } from '~/store/user/userSlice'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const QmaPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  // reduxで管理している状態
  const isLoggedIn = useSelector(selectIsLoggedIn)

  // メッセージの送信履歴
  const [chatHistory, setChatHistory] = useState<ChatHistory>([])

  // 入力したメッセージの受け皿
  const [dialogue, setDialogue] = useState<string>('')

  // エンターキーを押下したか，かな字変換をしたかを制御するための State
  const [composing, setComposition] = useState(false)
  const startComposition = () => setComposition(true)
  const endComposition = () => setComposition(false)

  const [actionType, setActionType] = useState<ActionType>('挨拶')

  // クマのセリフの受け皿
  const [qmaMessage, setQmaMessage] =
    useState<string>('困ったことがあったら教えて')

  // モヤモヤバッファ
  const [moyaBuf, setMoyaBuf] = useState<string[]>([])
  const [moyaScore, setMoyaScore] = useState<number>(0)
  type MoyaLevelType = {
    level: number
    isToVentMoya: boolean
  }
  const [moyaLevel, setMoyaLevel] = useState<MoyaLevelType>({
    level: 0,
    isToVentMoya: false,
  })

  // モヤスコアが閾値を超えたことを検知する
  const detectMoyaScoreOverThreshold = (
    prevMoyaScore: number,
    currentMoyaScore: number,
    prevMoyaLevel: MoyaLevelType
  ) => {
    // 現在のスコアと新しく取得したメッセージのスコアを元に新しいモヤスコアを算出する
    const newMoyaScore = prevMoyaScore + currentMoyaScore

    // moyaScoreを更新する
    setMoyaScore(newMoyaScore)

    // モヤレベルを調べる
    /**
     * モヤレベル
     * 1: 0 ~ -100
     * 2: -100 ~ -200
     * 3: -200 ~ -300
     * 4: -300 ~
     */
    if (0 <= newMoyaScore) {
      // モヤレベル0の時
      setActionType('跳躍')
      setMoyaLevel({ level: 1, isToVentMoya: false })

      return
    }
    if (-100 <= newMoyaScore && newMoyaScore < 0) {
      // モヤレベル１の時
      setActionType('頷き')
      setMoyaLevel({ level: 1, isToVentMoya: false })

      return
    }

    if (-200 <= newMoyaScore && newMoyaScore < -100) {
      // モヤレベル２の時
      setActionType('説得')

      // モヤレベルが前回から上がったか
      if (2 > prevMoyaLevel.level) {
        setMoyaLevel({ level: 2, isToVentMoya: true })
      } else {
        // 前回と同じ，もしくはモヤレベルが下がった
        setMoyaLevel({ level: 2, isToVentMoya: false })
      }
      return
    }

    if (-300 <= newMoyaScore && newMoyaScore < -200) {
      // モヤレベル３の時
      setActionType('困惑')

      // モヤレベルが前回から上がったか
      if (3 > prevMoyaLevel.level) {
        setMoyaLevel({ level: 3, isToVentMoya: true })
      } else {
        // 前回と同じ，もしくはモヤレベルが下がった
        setMoyaLevel({ level: 3, isToVentMoya: false })
      }
      return
    }

    if (newMoyaScore < -300) {
      // モヤレベル4の時
      setActionType('困惑')

      // モヤレベルが前回から上がったか
      if (4 > prevMoyaLevel.level) {
        setMoyaLevel({ level: 3, isToVentMoya: true })
      } else {
        // 前回と同じ，もしくはモヤレベルが下がった
        setMoyaLevel({ level: 3, isToVentMoya: false })
      }
      return
    }
  }

  const onKeydown = async (key: string) => {
    switch (key) {
      case 'Enter':
        if (composing) {
          break
        } else {
          // エンターキー押下時の処理
          // 入力が空の時
          if (dialogue == '') {
            // クマが入力を促す
            setQmaMessage('困ったことがあったら教えて')
            break
          }
          // 入力がある時
          else {
            //会話ログを更新
            const currentMessage: Message = {
              text: dialogue,
              // 現在の日時を保存できてる？
              date: new Date().toString(),
            }
            // reduxで管理
            dispatch(messageHistoryState({ message: currentMessage }))

            // メッセージをリセット
            setDialogue('')
            // AI 思考時間
            setQmaMessage('考え中...')

            // ログイン時は，ログイン時用のAPIを叩く
            if (isLoggedIn) {
              // バックエンドからクマのセリフを取得する
              const res = await getQmaReplyAndMoya(dialogue)

              if (!res.error && res.response) {
                setQmaMessage(res.response)

                if (res.negPhrase) {
                  // モヤモヤバッファに追加
                  const current = moyaBuf
                  setMoyaBuf(current.concat(res.negPhrase))
                }

                // モヤスコアが閾値を超えたかどうかを確認
                const score = res.score
                if (score) {
                  detectMoyaScoreOverThreshold(moyaScore, score, moyaLevel)
                }
              } else {
                console.log(res.errorMessage)
              }
            } else {
              // ログインしていない時は,NotLoginバージョンを使う
              const res = await getQmaReplyAndMoyaNotLogin(dialogue)
              if (!res.error && res.response && res.negPhrase) {
                setQmaMessage(res.response)

                // モヤスコアが閾値を超えたかどうかを確認
                const score = res.score
                if (score) {
                  detectMoyaScoreOverThreshold(moyaScore, score, moyaLevel)
                }

                if (res.negPhrase) {
                  // モヤモヤバッファに追加
                  const current = moyaBuf
                  setMoyaBuf(current.concat(res.negPhrase))
                }
              } else {
                console.log(res.errorMessage)
              }
            }
          }
        }
        break
    }
  }

  // 文字を入力したとき
  const onChangeDialogue = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDialogue(e.target.value)
    },
    []
  )

  // メッセージの送信履歴を取得する
  useEffect(() => {
    const f = async () => {
      if (isLoggedIn) {
        const res = await getChatHistory()
        if (!res.error && res.histories) {
          setChatHistory(res.histories)
        } else {
          console.log(res.errorMessage)
        }
      }
    }
    f()
  }, [isLoggedIn])

  // コミュニティの一覧を取得する
  useEffect(() => {
    const f = async () => {
      if (isLoggedIn) {
        dispatch(fetchCommunityList())
      }
    }
    f()
  }, [isLoggedIn])

  // モヤモヤを吐き出す
  useEffect(() => {
    const f = async () => {
      if (isLoggedIn) {
        setQmaMessage('考え中...')
        const res = await getQmaReply(moyaBuf.join(' '), moyaScore)
        setMoyaBuf([])
        if (!res.error && res.response) {
          setQmaMessage(res.response)
        } else {
          console.log(res.errorMessage)
        }
      } else {
        setQmaMessage('考え中...')
        const res = await getQmaReplyNotLogin(moyaBuf.join(' '), moyaScore)
        setMoyaBuf([])
        if (!res.error && res.response) {
          setQmaMessage(res.response)
        } else {
          console.log(res.errorMessage)
        }
      }
    }

    // モヤモヤが閾値を超えた時だけ吐き出す
    if (moyaLevel.isToVentMoya) f()
  }, [moyaLevel])

  return (
    <QmaPagePresenter
      actionType={actionType}
      chatHistory={chatHistory}
      dialogue={dialogue}
      endComposition={endComposition}
      moyaScore={moyaScore}
      qmaMessage={qmaMessage}
      startComposition={startComposition}
      onChangeDialogue={onChangeDialogue}
      onKeydown={onKeydown}
    />
  )
}
