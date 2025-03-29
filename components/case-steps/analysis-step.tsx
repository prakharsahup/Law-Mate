"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AnalysisStep({ caseData, updateCaseData, onNext }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Initializing analysis...")
  const [error, setError] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const statuses = [
      "Initializing analysis...",
      "Reading uploaded documents...",
      "Extracting key information...",
      "Identifying case type...",
      "Analyzing legal context...",
      "Preparing case summary...",
      "Generating legal documents...",
      "Finalizing analysis...",
    ]

    let currentStatus = 0

    // Start progress animation
    const progressInterval = setInterval(() => {
      if (progress < 95) {
        setProgress((prev) => {
          const newProgress = Math.min(prev + Math.random() * 15, 95)

          // Update status message at certain progress points
          if (newProgress > currentStatus * (95 / statuses.length) && currentStatus < statuses.length - 1) {
            currentStatus++
            setStatus(statuses[currentStatus])
          }

          return newProgress
        })
      } else {
        clearInterval(progressInterval)
      }
    }, 300)

    // Make the actual API call to analyze the case
    const analyzeCase = async () => {
      try {
        const response = await fetch("/api/analyze-case", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: caseData.description,
            files: caseData.files,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to analyze case")
        }

        // In a real implementation, we would parse the streaming response
        // For simplicity, we'll use mock data here
        const mockAnalysisResults = {
          summary:
            "This case involves a road accident where the opposing driver violated traffic signals, causing damages to your vehicle. Based on the evidence provided, we categorize this as a traffic accident claim with potential for compensation for vehicle damage and medical expenses.",
          legalPoints: [
            "The opposing driver failed to stop at a red light, which is a clear violation of traffic laws.",
            "You have photographic evidence of the damage to your vehicle, which supports your claim.",
            "The police report indicates the other driver was at fault, strengthening your position.",
            "Your medical records document injuries sustained in the accident, which may entitle you to compensation.",
          ],
          questions: [
            "Can you provide any evidence that suggests you had the right of way at the intersection?",
            "Do you have any witnesses who can testify about the traffic light status at the time of the accident?",
            "Have you received any communication from your insurance company regarding this incident?",
            "Can you provide documentation of any previous traffic violations?",
          ],
          documentUrl: "/sample-legal-document.pdf",
        }

        // Update case data with analysis results
        updateCaseData(mockAnalysisResults)
        setProgress(100)

        // Move to next step after a short delay
        setTimeout(() => {
          onNext()
        }, 1000)
      } catch (error) {
        console.error("Error analyzing case:", error)
        setError("Failed to analyze case. Please try again.")
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "There was an error analyzing your case. Please check your AI settings and try again.",
        })
      }
    }

    // Start the analysis after a short delay
    const analysisTimeout = setTimeout(() => {
      analyzeCase()
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(analysisTimeout)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mb-6" />

      <h2 className="text-xl font-semibold mb-4">Analyzing Your Case</h2>

      <p className="text-gray-600 mb-6 max-w-md">
        Our AI is analyzing the details you provided to understand your legal situation.
      </p>

      <div className="w-full max-w-md mb-4 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500">{status}</p>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      <div className="mt-8 text-sm text-gray-500 max-w-md">
        <p>Processing time: Typically 30-60 seconds</p>
        <p className="mt-2">
          Our AI is reading your input and documents, identifying important legal details, and categorizing your case
          type.
        </p>
      </div>
    </div>
  )
}
