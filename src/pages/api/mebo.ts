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
    ;(async () => {
      const answer = await getAIQmaMessage(req.body.userId, req.body.message)
      return res.status(200).json({ answer })
    })()
  } else {
    return res.status(200).json({})
  }
}
