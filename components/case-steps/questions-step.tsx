"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle, Copy, Check } from "lucide-react"
import { useState } from "react"

export default function QuestionsStep({ caseData, onNext }) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  // In a real app, these would come from the AI analysis
  const questions = caseData.questions || [
    "Can you provide any evidence that suggests you had the right of way at the intersection?",
    "Do you have any witnesses who can testify about the traffic light status at the time of the accident?",
    "Have you received any communication from your insurance company regarding this incident?",
    "Can you provide documentation of any previous traffic violations?",
  ]

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)

    setTimeout(() => {
      setCopiedIndex(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Questions for Opponent</h2>
        <p className="text-gray-600 mb-4">
          To help you prepare for your case or negotiations, we've generated questions that you can ask the opposing
          party.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 group"
          >
            <div className="flex items-start pr-8">
              <HelpCircle className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-800">{question}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(question, index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedIndex === index ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <strong>Tip:</strong> These questions can be used during negotiations, depositions, or in court. Consult with
          your lawyer about the best way to use them in your specific case.
        </p>
      </div>

      <div className="pt-4">
        <Button onClick={onNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
          Continue to Next Steps
        </Button>
      </div>
    </div>
  )
}
