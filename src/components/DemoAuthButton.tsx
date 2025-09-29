"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, LogOut, Mail, Lock } from "lucide-react"
import { getDemoUser } from "@/lib/demo-auth"

interface DemoAuthButtonProps {
  user: any
  onLogin: (user: any) => void
  onLogout: () => void
}

export function DemoAuthButton({ user, onLogin, onLogout }: DemoAuthButtonProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simuleer login delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const demoUser = getDemoUser()
    onLogin(demoUser)
    setShowLogin(false)
    setIsLoading(false)
  }

  const handleLogout = () => {
    onLogout()
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{user.name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Uitloggen</span>
        </Button>
      </div>
    )
  }

  if (showLogin) {
    return (
      <div className="relative">
        <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border p-4 z-50">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="demo@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wachtwoord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="willekeurig wachtwoord"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Bezig..." : "Inloggen"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowLogin(false)}
              >
                Annuleren
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Demo modus: gebruik elke email/wachtwoord combinatie
            </p>
          </form>
        </div>
        
        <Button
          size="sm"
          onClick={() => setShowLogin(false)}
          className="flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          Sluiten
        </Button>
      </div>
    )
  }

  return (
    <Button
      size="sm"
      onClick={() => setShowLogin(true)}
      className="flex items-center gap-2"
    >
      <User className="h-4 w-4" />
      Inloggen
    </Button>
  )
}


