import { getAIQmaMessage } from '~/api/backend/mebo'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  answer?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const userId = req.query.userId as string
    const dialogue = req.query.dialogue as string

    ;(async () => {
      const answer = await getAIQmaMessage(userId, dialogue)
      return res.status(200).json({ answer })
    })()
  } else {
    return res.status(200).json({})
  }
}
