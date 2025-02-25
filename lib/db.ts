import { kv } from "@vercel/kv"

const DAY_IN_SECONDS = 86400

export async function getUserPechadas(userId: string): Promise<number> {
  const key = `user:${userId}:pechadas:${getCurrentDate()}`
  const count = await kv.get<number>(key)
  return count || 0
}

export async function incrementUserPechadas(userId: string): Promise<number> {
  const key = `user:${userId}:pechadas:${getCurrentDate()}`
  const newCount = await kv.incr(key)
  await kv.expire(key, DAY_IN_SECONDS)
  return newCount
}

export async function getLeaderboard(): Promise<{ userId: string; count: number }[]> {
  const date = getCurrentDate()
  const leaderboard = await kv.zrange(`leaderboard:${date}`, 0, 9, { rev: true, withScores: true })
  return leaderboard.map(([userId, count]) => ({ userId: userId as string, count: count as number }))
}

export async function updateLeaderboard(userId: string, count: number): Promise<void> {
  const date = getCurrentDate()
  await kv.zadd(`leaderboard:${date}`, { score: count, member: userId })
  await kv.expire(`leaderboard:${date}`, DAY_IN_SECONDS)
}

function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0]
}

export async function getUserStreak(userId: string): Promise<number> {
  const key = `user:${userId}:streak`
  const streak = await kv.get<number>(key)
  return streak || 0
}

export async function updateUserStreak(userId: string): Promise<number> {
  const key = `user:${userId}:streak`
  const lastActiveKey = `user:${userId}:lastActive`

  const today = getCurrentDate()
  const lastActive = await kv.get<string>(lastActiveKey)

  if (lastActive === today) {
    return getUserStreak(userId)
  }

  const yesterday = new Date(Date.now() - DAY_IN_SECONDS * 1000).toISOString().split("T")[0]

  if (lastActive === yesterday) {
    const newStreak = await kv.incr(key)
    await kv.set(lastActiveKey, today)
    return newStreak
  }

  await kv.set(key, 1)
  await kv.set(lastActiveKey, today)
  return 1
}

