import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getLeaderboard } from "@/lib/db"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUsersInfo } from "@/lib/users"

export default async function Leaderboard() {
  const leaderboardData = await getLeaderboard()
  const usersInfo = await getUsersInfo(leaderboardData.map((user) => user.userId))

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {leaderboardData.map((user, index) => {
              const userInfo = usersInfo.find((u) => u.id === user.userId)
              return (
                <li key={index} className="flex items-center space-x-4">
                  <span className="font-semibold w-6">{index + 1}.</span>
                  <Avatar>
                    <AvatarImage src={userInfo?.image} />
                    <AvatarFallback>{userInfo?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold flex-grow">{userInfo?.name || "Unknown User"}</span>
                  <span className="text-muted-foreground">{user.count} pechadas</span>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

