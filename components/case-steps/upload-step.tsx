"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, FileText } from "lucide-react"

export default function UploadStep({ caseData, updateCaseData, onNext }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    const newFiles = [...caseData.files]
    for (let i = 0; i < files.length; i++) {
      newFiles.push(files[i])
    }
    updateCaseData({ files: newFiles })
  }

  const removeFile = (index) => {
    const newFiles = [...caseData.files]
    newFiles.splice(index, 1)
    updateCaseData({ files: newFiles })
  }

  const handleDescriptionChange = (e) => {
    updateCaseData({ description: e.target.value })
  }

  const handleSubmit = () => {
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload Evidence & Story</h2>
        <p className="text-gray-600 mb-4">
          Please share the details of your case to help our AI understand the situation. You can upload any relevant
          files and describe your situation.
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
        />

        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-sm font-medium">Drag and drop files here, or click to browse</p>
            <p className="text-xs text-gray-500">Supports PDF, JPEG, PNG, and text files</p>
          </div>
        </label>
      </div>

      {caseData.files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Files:</p>
          <div className="space-y-2">
            {caseData.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Describe Your Situation:
        </label>
        <Textarea
          id="description"
          placeholder="Tell us the story in your own words. Include facts, events, dates, and any other details that may help us understand your case."
          rows={6}
          value={caseData.description}
          onChange={handleDescriptionChange}
          className="resize-none"
        />
        <p className="text-xs text-gray-500 italic">
          Example: "I was involved in a car accident on June 5th. The other driver ran a red light and hit my car."
        </p>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={!caseData.description && caseData.files.length === 0}
        >
          Submit Case Information
        </Button>
      </div>
    </div>
  )
}
