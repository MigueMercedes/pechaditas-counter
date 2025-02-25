import { kv } from "@vercel/kv"

interface Achievement {
  id: string
  name: string
  description: string
  condition: (stats: UserStats) => boolean
}

interface UserStats {
  totalPechadas: number
  longestStreak: number
  currentStreak: number
}

const achievements: Achievement[] = [
  {
    id: "first_pechada",
    name: "First Push-Up",
    description: "Completed your first push-up",
    condition: (stats) => stats.totalPechadas >= 1,
  },
  {
    id: "century_club",
    name: "Century Club",
    description: "Completed 100 push-ups in total",
    condition: (stats) => stats.totalPechadas >= 100,
  },
  {
    id: "streak_master",
    name: "Streak Master",
    description: "Maintained a 7-day streak",
    condition: (stats) => stats.longestStreak >= 7,
  },
]

export async function getUserAchievements(userId: string): Promise<string[]> {
  return kv.smembers(`user:${userId}:achievements`)
}

export async function updateAchievements(userId: string, stats: UserStats): Promise<string[]> {
  const currentAchievements = await getUserAchievements(userId)
  const newAchievements = achievements
    .filter((achievement) => !currentAchievements.includes(achievement.id) && achievement.condition(stats))
    .map((achievement) => achievement.id)

  if (newAchievements.length > 0) {
    await kv.sadd(`user:${userId}:achievements`, ...newAchievements)
  }

  return newAchievements
}

export async function getAchievementDetails(achievementIds: string[]): Promise<Achievement[]> {
  return achievements.filter((achievement) => achievementIds.includes(achievement.id))
}

