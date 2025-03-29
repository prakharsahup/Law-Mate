"use client"

import { Button } from "@/components/ui/button"
import { Scale } from "lucide-react"

export default function IntroductionStep({ onNext }) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="bg-emerald-50 p-4 rounded-full mb-6">
        <Scale className="h-12 w-12 text-emerald-600" />
      </div>

      <h1 className="text-2xl font-bold mb-4">Welcome to LawMate</h1>

      <p className="text-gray-600 mb-6 max-w-xl">
        Your AI-powered legal assistant. In just a few simple steps, you can upload your case details, and our AI will
        analyze your situation to provide:
      </p>

      <ul className="text-left space-y-3 mb-8 max-w-md">
        <li className="flex items-start">
          <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
            1
          </span>
          <span>A summary of your case</span>
        </li>
        <li className="flex items-start">
          <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
            2
          </span>
          <span>A draft legal document for you to share with your lawyer</span>
        </li>
        <li className="flex items-start">
          <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
            3
          </span>
          <span>Key legal points and questions for your opponent</span>
        </li>
      </ul>

      <Button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
        Get Started
      </Button>
    </div>
  )
}
