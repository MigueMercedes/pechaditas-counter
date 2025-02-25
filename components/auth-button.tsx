"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <Button variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
    )
  }
  return (
    <Button variant="outline" onClick={() => signIn()}>
      Sign in
    </Button>
  )
}

