"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Plus, Scale } from "lucide-react"
import Link from "next/link"
import { AiChat } from "@/components/AiChat"

export default function Dashboard() {
  const { user } = useAuth()

  // Mock data for recent cases
  const recentCases = [
    { id: 1, title: "Traffic Accident Claim", date: "April 25, 2025", status: "In Progress" },
    { id: 2, title: "Property Dispute", date: "April 20, 2025", status: "Completed" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/case/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recentCases.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Cases</h2>
          <Link href="/dashboard/cases" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {recentCases.length > 0 ? (
          <div className="space-y-4">
            {recentCases.map((caseItem) => (
              <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-50 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{caseItem.title}</h3>
                      <p className="text-sm text-gray-500">Created on {caseItem.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        caseItem.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {caseItem.status}
                    </span>
                    <Link href={`/dashboard/cases/${caseItem.id}`}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Scale className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="font-medium text-gray-900 mb-1">No cases yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first case</p>
              <Link href="/case/new">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> New Case
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Chat Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">AI Legal Assistant</h2>
        <AiChat />
      </div>
    </div>
  )
}
