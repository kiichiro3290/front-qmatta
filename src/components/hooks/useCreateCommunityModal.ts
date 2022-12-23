import { useState } from 'react'

export const useCreateCommunityModal = () => {
  // モーダル開閉制御
  const [openCreateCommunityModal, setOpenCreateCommunityModal] =
    useState<boolean>(false)

  const handleCloseCreateCommunityModal = () =>
    setOpenCreateCommunityModal(false)

  // コミュニティ作成時に必要な入力情報
  const [communityName, setCommunityName] = useState<string>('')
  const [iconImg, setIconImg] = useState<string>('')
  const [preview, setPreview] = useState<string | ArrayBuffer>('')

  // 画像のアップロード
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (result) {
          setPreview(result)
          const data = result.toString().split(',')[1]
          setIconImg(data)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setIconImg('')
    }
  }

  return {
    openCreateCommunityModal,
    setOpenCreateCommunityModal,
    handleCloseCreateCommunityModal,
    communityName,
    setCommunityName,
    iconImg,
    preview,
    uploadImg,
  }
}
