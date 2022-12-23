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

  const onKeydown = async (key: string) => {
    switch (key) {
      case 'Enter':
        if (composing) {
          // かな字変換しただけなのでスルー
          break
        } else {
          // エンターキー押下時の処理
          // 入力が空の時
          if (dialogue == '') {
            // クマが入力を促す
            setQmaMessage('困ったことがあったら教えて')
          }
          // 入力がある時
          else {
            //会話ログを更新
            const currentMessage: Message = {
              text: dialogue,
              // 現在の日時を保存できてる？
              date: new Date(),
            }
            // reduxで管理
            dispatch(messageHistoryState({ message: currentMessage }))

            // メッセージをリセット
            setDialogue('')
            // AI 思考時間
            setQmaMessage('考え中...')
            setActionType('困惑')

            // ログイン時は，ログイン時用のAPIを叩く
            if (isLoggedIn) {
              // モヤモヤバッファに３つ以上溜まっていたら吐き出す
              if (moyaBuf.length >= 3) {
                console.log('3つになった')
                const res = await getQmaReply(moyaBuf.join(' '))
                setMoyaBuf([])
                if (!res.error && res.response) {
                  setQmaMessage(res.response)
                } else {
                  console.log(res.errorMessage)
                }
              } else {
                // バックエンドからクマのセリフを取得する
                const res = await getQmaReplyAndMoya(dialogue)
                console.log('koko', res)
                if (!res.error && res.response) {
                  setQmaMessage(res.response)
                  if (res.negPhrase) {
                    // モヤモヤバッファに追加
                    const current = moyaBuf
                    setMoyaBuf(current.concat(res.negPhrase))
                  }
                } else {
                  console.log(res.errorMessage)
                }
              }
            } else {
              // モヤモヤバッファに３つ以上溜まっていたら吐き出す
              if (moyaBuf.length >= 3) {
                const res = await getQmaReplyNotLogin(moyaBuf.join(' '))
                setMoyaBuf([])
                if (!res.error && res.response) {
                  setQmaMessage(res.response)
                } else {
                  console.log(res.errorMessage)
                }
              } else {
                // ログインしていない時は,NotLoginバージョンを使う
                const res = await getQmaReplyAndMoyaNotLogin(dialogue)
                if (!res.error && res.response && res.negPhrase) {
                  setQmaMessage(res.response)
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
          setActionType('頷き')
        }
        break
    }
  }

  // 文字を入力したとき
  const onChangeDialogue = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // setIsShowChatBaloon(false)
      console.log(moyaBuf.length)
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

  return (
    <QmaPagePresenter
      actionType={actionType}
      chatHistory={chatHistory}
      dialogue={dialogue}
      endComposition={endComposition}
      moyaBuf={moyaBuf}
      qmaMessage={qmaMessage}
      startComposition={startComposition}
      onChangeDialogue={onChangeDialogue}
      onKeydown={onKeydown}
    />
  )
}
