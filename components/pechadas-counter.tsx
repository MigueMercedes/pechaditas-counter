"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { getUserPechadas, getUserStreak } from "@/lib/db"
import { incrementPechadas } from "@/app/actions"

export function PechadasCounter({ userId }: { userId: string }) {
  const [count, setCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const { toast } = useToast()
  const goal = 300

  useEffect(() => {
    getUserPechadas(userId).then(setCount)
    getUserStreak(userId).then(setStreak)
  }, [userId])

  const handleIncrement = async () => {
    try {
      const newCount = await incrementPechadas()
      setCount(newCount)
      if (newCount === goal) {
        const newStreak = await getUserStreak(userId)
        setStreak(newStreak)
        toast({
          title: "Congratulations!",
          description: `You've reached your daily goal of 300 pechadas! Your streak is now ${newStreak} days!`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to increment pechadas. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pechadas Counter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <span className="text-6xl font-bold">{count}</span>
            <span className="text-2xl text-muted-foreground">/{goal}</span>
          </div>
          <Progress value={(count / goal) * 100} className="mb-4" />
          <Button onClick={handleIncrement} size="lg" className="w-full mb-4">
            Add Pechada
          </Button>
          <div className="text-center">
            <span className="text-lg font-semibold">Streak: {streak} days</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

