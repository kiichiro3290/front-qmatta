import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQmaMessage, getAIQmaMessage, postQmaMessage } from '~/pages/api/bear'
import { getCommunityList, getMessageHistory, logInUser } from '~/pages/api/user'
import { AppDispatch } from '~/store'
import { fetchUserDataState } from '~/store/user/actions'
import { selectIsLoggedIn, selectUserId } from '~/store/user/userSlice'

import { QmaPagePresenter } from './presenter'

export const QmaPage: React.FC = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  // reduxで管理している状態
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const userId = useSelector(selectUserId)

  const [isShowChatBaloon, setIsShowChatBaloon] = useState<boolean>(true)
  // メッセージの送信履歴
  const [messageHistory, setMessageHistory] = useState<string[]>([])
  // 入力したメッセージの受け皿
  const [dialogue, setDialogue] = useState<string>('')
  // メッセージをクマに送信するたびに，配列に追加する
  const [dialogues, setDialogues] = useState<string[]>([])
  // コミュニティ一覧を取得する
  const [communityList, setCommunityList] = useState<string[]>([])

  // エンターキーを押下したか，かな字変換をしたかを制御するための State
  const [composing, setComposition] = useState(false)
  const startComposition = () => setComposition(true)
  const endComposition = () => setComposition(false)
  // クマのセリフの受け皿
  const [qmaMessage, setQmaMessage] = useState<string>('困ったことがあったら教えて')
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
            setQmaMessage('...')
            if (isLoggedIn && userId) {
              try {
                // バックエンドからクマのセリフを取得する
                const data = await postQmaMessage(userId, dialogue)
                // AIによる返答を取得する
                // const data = await getAIQmaMessage(userId, dialogue)
                setQmaMessage(data)
              } catch (e) {
                // エラーが出た時は，適当なメッセージを返す
                const data = await fetchQmaMessage()
                setQmaMessage(data)
              }
            } else {
              // ログインしていない時は，適当なメッセージを返す
              const data = await fetchQmaMessage()
              setQmaMessage(data)
            }
          }
          // 画像を変更
          setIsOpenBearMouth((isOpen) => !isOpen)
        }
        break
    }
  }

  // 文字を入力したとき
  const onChangeDialogue = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsShowChatBaloon(false)
    setDialogue(e.target.value)
  }, [])

  // 認証状態を確認する
  useEffect(() => {
    const f = async () => {
      // localstrage
      const email = localStorage.getItem('email')
      const password = localStorage.getItem('password')
      // メールアドレスとパスワードを認証する
      if (email && password) {
        const result = await logInUser(email, password)
        if (result.result) {
          localStorage.setItem('email', email)
          localStorage.setItem('password', password)
          dispatch(fetchUserDataState(result.user))
          router.push('/')
          return
        }
      }
    }
    f()
  }, [])

  // メッセージの送信履歴を取得する
  useEffect(() => {
    const f = async () => {
      if (userId) {
        const data = await getMessageHistory(userId)
        setMessageHistory(data)
      }
    }
    f()
  }, [isLoggedIn])

  // コミュニティの一覧を取得する
  useEffect(() => {
    const f = async () => {
      if (userId) {
        const data = await getCommunityList(userId)
        setCommunityList(data)
      }
    }
    f()
  }, [isLoggedIn])

  return (
    <QmaPagePresenter
      qmaMessage={qmaMessage}
      isShowChatBaloon={isShowChatBaloon}
      onKeydown={onKeydown}
      startComposition={startComposition}
      endComposition={endComposition}
      onChangeDialogue={onChangeDialogue}
      dialogue={dialogue}
      dialogues={dialogues}
      messageHistory={messageHistory}
      communityList={communityList}
      isOpenBearMouth={isOpenBearMouth}
    />
  )
}
