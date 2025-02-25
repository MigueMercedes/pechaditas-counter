import { kv } from "@vercel/kv"

interface UserInfo {
  id: string
  name: string
  email: string
  image: string
}

export async function getUsersInfo(userIds: string[]): Promise<UserInfo[]> {
  const userInfoPromises = userIds.map(async (userId) => {
    const userInfo = await kv.hgetall<UserInfo>(`user:${userId}`)
    return userInfo || { id: userId, name: "Unknown User", email: "", image: "" }
  })

  return Promise.all(userInfoPromises)
}

export async function updateUserInfo(user: UserInfo): Promise<void> {
  await kv.hset(`user:${user.id}`, user)
}

