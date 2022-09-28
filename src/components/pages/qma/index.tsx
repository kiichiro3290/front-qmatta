import { ChangeEvent, useCallback, useState } from 'react'
import { postQmaMessage } from '~/pages/api/fetch'

import { QmaPagePresenter } from './presenter'

export type QmaPageProps = {
  // TODO
}

export const QmaPage: React.FC<QmaPageProps> = () => {
  const [isShowChatBaloon, setIsShowChatBaloon] = useState<boolean>(false)
  // 入力したメッセージの受け皿
  const [dialogue, setDialogue] = useState<string>('')
  // メッセージをクマに送信するたびに，配列に追加する
  const [dialogues, setDialogues] = useState<string[]>([])
  // エンターキーを押下したか，かな字変換をしたかを制御するための State
  const [composing, setComposition] = useState(false)
  const startComposition = () => setComposition(true)
  const endComposition = () => setComposition(false)
  // クマのセリフの受け皿
  const [qmaMessage, setQmaMessage] = useState<string>('')

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
          // バックエンドからクマのセリフを取得する
          const data = await postQmaMessage('6332924a0c15d205ec196f66', dialogue)
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
    />
  )
}