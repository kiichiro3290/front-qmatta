// スタンプを送信する: PATCH

import axios from "axios"

// (stampId) => {}
export const sendStampStatus = async (stampId: string) => {
        const result = await axios.patch(`${url}/bear/${userId}`, data)
        return result.data.response
      }
}
