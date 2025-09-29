"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button variant="outline" size="sm" disabled>
        Laden...
      </Button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{session.user?.name || session.user?.email}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Uitloggen</span>
        </Button>
      </div>
    )
  }

  return (
    <Button
      size="sm"
      onClick={() => signIn("google")}
      className="flex items-center gap-2"
    >
      <User className="h-4 w-4" />
      Inloggen
    </Button>
  )
}


