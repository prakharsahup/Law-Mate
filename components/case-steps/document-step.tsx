"use client"

import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"
import { useState } from "react"

export default function DocumentStep({ caseData, onNext }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleDownload = () => {
    // In a real app, this would download the actual document
    alert("Document download started")
  }

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Legal Document</h2>
        <p className="text-gray-600 mb-4">
          We've generated a draft legal document for you based on your case. You can share this draft with your lawyer
          to start formal proceedings.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <FileText className="h-10 w-10 text-emerald-600" />
        </div>

        <h3 className="text-lg font-medium mb-2">Legal Notice Draft</h3>
        <p className="text-gray-600 mb-6 max-w-md">
          This document is generated in formal legal language, ready for review by your lawyer.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="flex items-center" onClick={togglePreview}>
            <Eye className="mr-2 h-4 w-4" />
            {isPreviewOpen ? "Hide Preview" : "Preview Document"}
          </Button>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Document
          </Button>
        </div>
      </div>

      {isPreviewOpen && (
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-center">LEGAL NOTICE</h2>
            <p className="text-center font-semibold">RE: Traffic Accident Claim</p>

            <p>Date: April 30, 2025</p>

            <p>
              To: [Opposing Party Name]
              <br />
              [Address]
            </p>

            <p>Dear Sir/Madam,</p>

            <p>
              This letter serves as a formal notice regarding the traffic accident that occurred on June 5, 2025, at the
              intersection of [Location], wherein you failed to stop at a red light and collided with my vehicle.
            </p>

            <p>
              Based on the evidence collected, including police reports, photographs, and witness statements, it is
              clear that the accident was caused by your negligence in failing to obey traffic signals. As a result of
              this incident, I have suffered the following damages:
            </p>

            <ol>
              <li>Vehicle damage estimated at $[Amount]</li>
              <li>Medical expenses totaling $[Amount]</li>
              <li>Lost wages due to inability to work during recovery</li>
              <li>Pain and suffering</li>
            </ol>

            <p>
              I hereby demand compensation in the amount of $[Total Amount] to cover all damages incurred as a result of
              this accident.
            </p>

            <p>
              Please respond to this notice within 14 days of receipt. If I do not receive a satisfactory response
              within this timeframe, I will be forced to pursue legal action to recover the damages.
            </p>

            <p>Sincerely,</p>

            <p>
              [Your Name]
              <br />
              [Your Contact Information]
            </p>
          </div>
        </div>
      )}

      <div className="pt-4">
        <Button onClick={onNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
          Continue to Key Legal Points
        </Button>
      </div>
    </div>
  )
}
