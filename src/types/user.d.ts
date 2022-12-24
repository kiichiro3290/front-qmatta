type UserRole = {
  permission: number
  rolename: string
}

type UserStatus = 'スッキリ' | '沼った'

type UserData = {
  bearIcon: string
  bearTone: string
  communityId: string[]
  createdAt: Date
  deletedAt: Date
  emailAddress: string
  icom: string
  like: string[]
  password: string
  profile: string
  question: string[]
  role: UserRole
  status: UserStatus
  updatedAt: string
  userName: string
  _id: string
}

type Chat = {
  text: string
  response: string
  date: Date
}

type ChatHistory = Chat[]

type Message = {
  text: string
  date: string
}

type MessageHistory = Message[]

type UserInfo = {
  userName: string
  status: string
  icon: string
}

type UserList = UserInfo[]
