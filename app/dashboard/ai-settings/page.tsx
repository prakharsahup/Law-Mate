"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Bot, Key, Save } from "lucide-react"

export default function AISettings() {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [provider, setProvider] = useState("openai")
  const [model, setModel] = useState("gpt-4o")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Simulate saving to backend
    setTimeout(() => {
      // In a real app, you would save this to a secure backend
      localStorage.setItem(
        "lawmate_ai_settings",
        JSON.stringify({
          provider,
          model,
          apiKey: "••••••••" + apiKey.slice(-4), // Only store masked version in local storage
        }),
      )

      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your AI settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure your AI provider settings for case analysis and document generation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-emerald-600" />
            AI Provider Configuration
          </CardTitle>
          <CardDescription>Connect your AI provider to enable case analysis and document generation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="groq">Groq</SelectItem>
                <SelectItem value="mistral">Mistral AI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {provider === "openai" && (
                  <>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                    <SelectItem value="o3-mini">o3-mini</SelectItem>
                  </>
                )}
                {provider === "anthropic" && (
                  <>
                    <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                    <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                    <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                  </>
                )}
                {provider === "groq" && (
                  <>
                    <SelectItem value="llama3-70b-8192">Llama 3 70B</SelectItem>
                    <SelectItem value="mixtral-8x7b-32768">Mixtral 8x7B</SelectItem>
                  </>
                )}
                {provider === "mistral" && (
                  <>
                    <SelectItem value="mistral-large">Mistral Large</SelectItem>
                    <SelectItem value="mistral-medium">Mistral Medium</SelectItem>
                    <SelectItem value="mistral-small">Mistral Small</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Key className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Your API key is stored securely and never shared with third parties.
            </p>
          </div>

          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={!apiKey || isSaving}
          >
            {isSaving ? "Saving..." : "Save Settings"}
            <Save className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Usage</CardTitle>
          <CardDescription>How LawMate uses AI to analyze your cases and generate documents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Case Analysis</h3>
            <p className="text-sm text-gray-600">
              LawMate uses AI to analyze your case details, identify key legal points, and generate a comprehensive
              summary.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Document Generation</h3>
            <p className="text-sm text-gray-600">
              Based on your case details, LawMate generates legal documents tailored to your specific situation.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Strategic Questions</h3>
            <p className="text-sm text-gray-600">
              LawMate generates strategic questions to help you prepare for negotiations or court proceedings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
