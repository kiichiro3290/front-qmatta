import { getAIQmaMessage } from '~/api/backend/mebo'

import type { NextApiRequest, NextApiResponse } from 'next'

type Error = {
  errorCode: number
  errorMessage: string
}

type ResponseData = {
  answer?: string
  error?: Error
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case 'GET': {
      // string[]の時がある?
      const userId = req.query.userId as string
      const dialogue = req.query.dialogue as string

      // このエラー処理する必要がある？
      const answer = await getAIQmaMessage(userId, dialogue)
      return res.status(200).json({ answer })
    }
    default: {
      return res.status(405).json({
        error: {
          errorCode: 405,
          errorMessage: '405 Method Not Allowed',
        },
      })
    }
  }
}
