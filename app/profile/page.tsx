import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserPechadas, getUserStreak } from "@/lib/db";
import { getUserAchievements, getAchievementDetails } from "@/lib/achievements";
import { Badge } from "@/components/ui/badge";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const [pechadas, streak, achievementIds] = await Promise.all([
    getUserPechadas(session.user.id),
    getUserStreak(session.user.id),
    getUserAchievements(session.user.id),
  ]);

  const achievements = await getAchievementDetails(achievementIds);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={session.user.image || undefined} />
              <AvatarFallback>
                {session.user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{session.user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Today's Pechadas</h3>
              <p className="text-2xl">{pechadas}</p>
            </div>
            <div>
              <h3 className="font-semibold">Current Streak</h3>
              <p className="text-2xl">{streak} days</p>
            </div>
            <div>
              <h3 className="font-semibold">Achievements</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {achievements.map((achievement) => (
                  <Badge key={achievement.id} variant="secondary">
                    {achievement.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
