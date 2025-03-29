import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { description, files } = await req.json()

    // Prepare the prompt with case details
    const prompt = `
      I need you to analyze a legal case with the following details:
      
      Case Description:
      ${description}
      
      ${files && files.length > 0 ? `The user has uploaded ${files.length} files as evidence.` : "No files were uploaded."}
      
      Based on this information, please provide:
      1. A comprehensive case summary
      2. Key legal points that strengthen the case
      3. Strategic questions to ask the opposing party
      4. A draft legal document appropriate for this case
    `

    // Stream the AI response
    const result = streamText({
      model: openai("gpt-4o"),
      messages: [
        { role: "system", content: "You are a legal assistant that helps analyze cases and generate legal documents." },
        { role: "user", content: prompt },
      ],
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error analyzing case:", error)
    return new Response(JSON.stringify({ error: "Failed to analyze case" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
