"use server"

import { getAuthSession } from "@/lib/auth"
import { incrementUserPechadas, updateLeaderboard, updateUserStreak } from "@/lib/db"

export async function incrementPechadas() {
  const session = await getAuthSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  const newCount = await incrementUserPechadas(session.user.id)
  await updateLeaderboard(session.user.id, newCount)

  if (newCount === 300) {
    await updateUserStreak(session.user.id)
  }

  return newCount
}

