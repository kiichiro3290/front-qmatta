import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { postQmaMessage } from '~/pages/api/bear'
import { getCommunityList, getMessageHistory } from '~/pages/api/user'

import { QmaPagePresenter } from './presenter'

export type QmaPageProps = {
  // TODO
}

export const QmaPage: React.FC<QmaPageProps> = () => {
  const [isShowChatBaloon, setIsShowChatBaloon] = useState<boolean>(false)
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
  const [qmaMessage, setQmaMessage] = useState<string>('')
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
          const newDialogues = dialogues
          newDialogues.push(dialogue)
          setDialogues(newDialogues)
          setDialogue('')
          // チャットバルーンを表示
          setIsShowChatBaloon(true)
          // 画像を変更
          setIsOpenBearMouth((isOpen) => !isOpen)
          // バックエンドからクマのセリフを取得する
          const userId = '6337d95220ca491584c6aef1'
          const data = await postQmaMessage(userId, dialogue)
          setQmaMessage(data)
        }
        break
    }
  }

  // 文字を入力したとき
  const onChangeDialogue = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (dialogue === '') {
      setIsShowChatBaloon(false)
      setDialogue(e.target.value)
    } else {
      setDialogue(e.target.value)
    }
  }, [])

  // メッセージの送信履歴を取得する
  useEffect(() => {
    const f = async () => {
      const userId = '6337d95220ca491584c6aef1'
      const data = await getMessageHistory(userId)
      setMessageHistory(data)
    }
    f()
  }, [])

  // コミュニティの一覧を取得する
  useEffect(() => {
    const f = async () => {
      const userId = '6337d95220ca491584c6aef1'
      const data = await getCommunityList(userId)
      setCommunityList(data)
    }
    f()
  })

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
