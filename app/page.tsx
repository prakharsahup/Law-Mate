import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Scale, FileText, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="bg-white p-3 rounded-full mb-6 shadow-sm">
            <Scale className="h-12 w-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">Welcome to LawMate</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Your AI-powered legal assistant that helps you understand your case and prepare legal documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-emerald-600" />
                Upload & Analyze
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 min-h-[80px]">
                Upload your case details and evidence. Our AI will analyze everything to understand your situation.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-emerald-600" />
                Get Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 min-h-[80px]">
                Receive a clear summary of your case, key legal points, and strategic questions for your opponent.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-emerald-600" />
                Generate Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 min-h-[80px]">
                Download professionally formatted legal documents to share with your lawyer or use in your case.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Link href="/case/new">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-lg text-lg font-medium"
            >
              Start Your Case
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
