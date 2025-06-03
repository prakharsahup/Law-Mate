"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Define the User type
type User = {
  id: string
  name: string
  email: string
} | null

// Define the AuthContext type
type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create the AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if the user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("lawmate_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Protect routes
  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password"]
      const isPublicRoute = publicRoutes.includes(pathname)

      if (!user && !isPublicRoute && pathname !== "/") {
        router.push("/auth/login")
      }

      if (user && isPublicRoute) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("lawmate_users") || "[]");
      const foundUser = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      // Set current user
      localStorage.setItem("lawmate_user", JSON.stringify(foundUser));
      setUser(foundUser);

      toast({
        title: "Login successful",
        description: "Welcome back to LawMate!",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        password,
      };

      // Save user to "database"
      const users = JSON.parse(localStorage.getItem("lawmate_users") || "[]");
      users.push(newUser);
      localStorage.setItem("lawmate_users", JSON.stringify(users));

      // Set logged-in user
      localStorage.setItem("lawmate_user", JSON.stringify(newUser));
      setUser(newUser);

      toast({
        title: "Account created",
        description: "Welcome to LawMate!",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Could not create your account",
      });
    } finally {
      setIsLoading(false);
    }
  };


  // Logout function
  const logout = () => {
    localStorage.removeItem("lawmate_user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Create a hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
