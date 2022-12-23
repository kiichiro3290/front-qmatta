import { useState } from 'react'

export const useRegisterCommunityModal = () => {
  // モーダル開閉制御
  const [openRegisterCommunityModal, setOpenRegisterCommunityModal] =
    useState<boolean>(false)

  const handleCloseRegisterCommunityModal = () =>
    setOpenRegisterCommunityModal(false)

  // コミュニティ登録時に必要な入力情報
  const [communityId, setCommunityId] = useState<string>('')

  return {
    openRegisterCommunityModal,
    handleCloseRegisterCommunityModal,
    communityId,
    setCommunityId,
    setOpenRegisterCommunityModal,
  }
}
