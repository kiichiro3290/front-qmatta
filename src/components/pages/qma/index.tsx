import { QmaPagePresenter } from './presenter'

import {
  postQmaMessage,
  fetchQmaMessage,
  getMessageHistory,
} from '~/api/client/back/bear'
import { AppDispatch } from '~/store'
import { fetchCommunityList, fetchUserDataState } from '~/store/user/actions'
import { selectIsLoggedIn } from '~/store/user/userSlice'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const QmaPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  // reduxで管理している状態
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [isShowChatBaloon, setIsShowChatBaloon] = useState<boolean>(true)
  // メッセージの送信履歴
  const [messageHistory, setMessageHistory] = useState<MessageHistory[]>([])
  // 入力したメッセージの受け皿
  const [dialogue, setDialogue] = useState<string>('')
  // メッセージをクマに送信するたびに，配列に追加する
  const [dialogues, setDialogues] = useState<string[]>([])

  // エンターキーを押下したか，かな字変換をしたかを制御するための State
  const [composing, setComposition] = useState(false)
  const startComposition = () => setComposition(true)
  const endComposition = () => setComposition(false)
  // クマのセリフの受け皿
  const [qmaMessage, setQmaMessage] =
    useState<string>('困ったことがあったら教えて')
  // クマの口が開いているかどうか
  const [isOpenBearMouth, setIsOpenBearMouth] = useState<boolean>(false)

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
            const newDialogues = dialogues
            newDialogues.unshift(dialogue)
            setDialogues(newDialogues)
            // チャットバルーンを表示
            setIsShowChatBaloon(true)
            // メッセージをリセット
            setDialogue('')
            // AI 思考時間
            setQmaMessage('考え中...')
            if (isLoggedIn) {
              try {
                // バックエンドからクマのセリフを取得する
                // isChatGPT: true → AIによる返答を取得する
                const res = await postQmaMessage(dialogue, true)
                setQmaMessage(res)
              } catch (e) {
                console.log(e)
                setQmaMessage('')
                // エラーが出た時は，適当なメッセージを返す
                const res = await postQmaMessage(dialogue, false)
                setQmaMessage(res)
              }
            } else {
              // ログインしていない時は，適当なメッセージを返す
              const res = await fetchQmaMessage(dialogue, false)
              setQmaMessage(res)
            }
          }
          // 画像を変更
          setIsOpenBearMouth((isOpen) => !isOpen)
        }
        break
    }
  }

  // 文字を入力したとき
  const onChangeDialogue = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsShowChatBaloon(false)
      setDialogue(e.target.value)
    },
    []
  )

  // 認証状態を確認する
  useEffect(() => {
    dispatch(fetchUserDataState())
  }, [])

  // メッセージの送信履歴を取得する
  useEffect(() => {
    const f = async () => {
      if (isLoggedIn) {
        const data = await getMessageHistory()
        console.log(data)
        setMessageHistory(data)
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
      dialogue={dialogue}
      dialogues={dialogues}
      endComposition={endComposition}
      isOpenBearMouth={isOpenBearMouth}
      isShowChatBaloon={isShowChatBaloon}
      messageHistory={messageHistory}
      qmaMessage={qmaMessage}
      startComposition={startComposition}
      onChangeDialogue={onChangeDialogue}
      onKeydown={onKeydown}
    />
  )
}
