"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function LegalPointsStep({ caseData, onNext }) {
  // In a real app, these would come from the AI analysis
  const legalPoints = caseData.legalPoints || [
    "The opposing driver failed to stop at a red light, which is a clear violation of traffic laws.",
    "You have photographic evidence of the damage to your vehicle, which supports your claim.",
    "The police report indicates the other driver was at fault, strengthening your position.",
    "Your medical records document injuries sustained in the accident, which may entitle you to compensation.",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Key Legal Points</h2>
        <p className="text-gray-600 mb-4">
          Our AI has identified the strongest points in your case to help you understand your position.
        </p>
      </div>

      <div className="space-y-4">
        {legalPoints.map((point, index) => (
          <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-800">{point}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm">
          <strong>Note:</strong> These points are based on the information you provided. A legal professional may
          identify additional strengths or weaknesses in your case.
        </p>
      </div>

      <div className="pt-4">
        <Button onClick={onNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
          Continue to Questions for Opponent
        </Button>
      </div>
    </div>
  )
}
