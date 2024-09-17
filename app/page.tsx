'use client'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

// Component for the main page
export default function Home() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement API call to backend for processing
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    setResult('这里是翻译后的文本。这只是一个示例。')
    setIsLoading(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Podcast Transcription and Translation Tool</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Enter YouTube URL</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Transcribe & Translate'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="mt-4">
          <CardContent className="text-center py-4">
            <p>Processing your request. This may take a few minutes...</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigator.clipboard.writeText(result)} variant="outline">
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  )
}
