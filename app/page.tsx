import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getAuthSession } from "@/lib/auth"
import { AuthButton } from "@/components/auth-button"

export default async function Home() {
  const session = await getAuthSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to GymPro</h1>
      <Card className="w-full max-w-md mb-4">
        <CardHeader>
          <CardTitle>Start Your Pechadas Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Track your daily push-ups and reach your goals!</p>
          {session ? (
            <Button asChild className="w-full">
              <Link href="/pechadas-counter">Go to Pechadas Counter</Link>
            </Button>
          ) : (
            <p className="text-center text-muted-foreground">Sign in to start tracking your pechadas</p>
          )}
        </CardContent>
      </Card>
      <AuthButton />
    </div>
  )
}

