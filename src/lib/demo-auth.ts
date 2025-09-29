// Demo authenticatie voor development
// In productie zou je echte OAuth providers gebruiken

export interface DemoUser {
  id: string
  name: string
  email: string
  image?: string
}

export const demoUsers: DemoUser[] = [
  {
    id: "demo-1",
    name: "Demo Gebruiker",
    email: "demo@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: "demo-2", 
    name: "Test User",
    email: "test@example.com",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
  }
]

export function getDemoUser(): DemoUser {
  return demoUsers[0] // Return eerste demo user
}

export function validateDemoCredentials(email: string, password: string): DemoUser | null {
  // Voor demo doeleinden accepteren we elke email/password combinatie
  if (email && password) {
    return getDemoUser()
  }
  return null
}


