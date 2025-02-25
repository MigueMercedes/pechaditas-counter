import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PechadasCounter } from "@/components/pechadas-counter"

export default async function PechadasCounterPage() {
  const session = await getAuthSession()

  if (!session) {
    redirect("/api/auth/signin")
  }

  return <PechadasCounter userId={session.user.id} />
}

