"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import IntroductionStep from "@/components/case-steps/introduction-step"
import UploadStep from "@/components/case-steps/upload-step"
import AnalysisStep from "@/components/case-steps/analysis-step"
import SummaryStep from "@/components/case-steps/summary-step"
import DocumentStep from "@/components/case-steps/document-step"
import LegalPointsStep from "@/components/case-steps/legal-points-step"
import QuestionsStep from "@/components/case-steps/questions-step"
import NextStepsStep from "@/components/case-steps/next-steps-step"

export default function NewCase() {
  const [currentStep, setCurrentStep] = useState(0)
  const [caseData, setCaseData] = useState({
    description: "",
    files: [],
    summary: "",
    legalPoints: [],
    questions: [],
    documentUrl: "",
  })

  const steps = [
    { name: "Introduction", component: IntroductionStep },
    { name: "Upload Evidence", component: UploadStep },
    { name: "Analyze Case", component: AnalysisStep },
    { name: "Case Summary", component: SummaryStep },
    { name: "Legal Document", component: DocumentStep },
    { name: "Key Legal Points", component: LegalPointsStep },
    { name: "Questions", component: QuestionsStep },
    { name: "Next Steps", component: NextStepsStep },
  ]

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const updateCaseData = (newData) => {
    setCaseData({ ...caseData, ...newData })
  }

  const progressPercentage = (currentStep / (steps.length - 1)) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].name}
            </span>
            <span className="text-sm font-medium text-emerald-600">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-gray-200" indicatorClassName="bg-emerald-600" />
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <CurrentStepComponent caseData={caseData} updateCaseData={updateCaseData} onNext={handleNext} />
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStep < steps.length - 1 && (
            <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
