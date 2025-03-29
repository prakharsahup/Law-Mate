import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText, MessageSquare, UserCheck } from "lucide-react"
import Link from "next/link"

export default function NextStepsStep() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
        <p className="text-gray-600">
          Now that you have your case summary, legal draft, and important points, it's time to consult with a lawyer to
          take further action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-emerald-50 p-3 rounded-full mb-4">
              <FileText className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-medium mb-2">Review Documents</h3>
            <p className="text-sm text-gray-600 mb-4">
              Review all generated documents and make any necessary edits before sharing with your lawyer.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-emerald-50 p-3 rounded-full mb-4">
              <UserCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-medium mb-2">Find a Lawyer</h3>
            <p className="text-sm text-gray-600 mb-4">
              Connect with a qualified lawyer who specializes in your type of case.
            </p>
            <Button variant="outline" size="sm" className="mt-auto">
              Find Lawyers
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-emerald-50 p-3 rounded-full mb-4">
              <MessageSquare className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-medium mb-2">Prepare for Consultation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use the key points and questions to prepare for your initial consultation with your lawyer.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
        <h3 className="font-medium mb-3">What to expect next:</h3>
        <ol className="space-y-2 text-gray-700 ml-5 list-decimal">
          <li>Share your case summary and legal draft with your lawyer.</li>
          <li>Your lawyer will review the documents and may request additional information.</li>
          <li>
            Based on your lawyer's advice, you may proceed with filing a formal complaint or sending a demand letter.
          </li>
          <li>Be prepared for negotiations or court proceedings, depending on how the opposing party responds.</li>
        </ol>
      </div>

      <div className="flex justify-center pt-6">
        <Link href="/">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
            Return to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
