"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { CheckCircle, Edit2 } from "lucide-react"

export default function SummaryStep({ caseData, updateCaseData, onNext }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedSummary, setEditedSummary] = useState(
    caseData.summary ||
      "This case involves a road accident where the opposing driver violated traffic signals, causing damages to your vehicle. Based on the evidence provided, we categorize this as a traffic accident claim with potential for compensation for vehicle damage and medical expenses.",
  )

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    updateCaseData({ summary: editedSummary })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setEditedSummary(e.target.value)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Case Summary</h2>
          <p className="text-gray-600">
            Here's a summary of your case based on the information provided. You can review and make any changes if
            needed.
          </p>
        </div>
        <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {isEditing ? (
          <div className="space-y-4">
            <Textarea value={editedSummary} onChange={handleChange} className="min-h-[150px]" />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <p className="text-gray-800 whitespace-pre-line">{editedSummary}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="absolute top-0 right-0 text-gray-500 hover:text-emerald-600"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button onClick={onNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
          Continue to Legal Document
        </Button>
      </div>
    </div>
  )
}
