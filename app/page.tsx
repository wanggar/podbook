'use client'
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for future functionality
    console.log('Submitted URL:', url);
    setSubmitted(true);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Podcast Transcription and Translation Tool</h1>
      
      <Card className="mb-6">
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
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      {submitted && (
        <Card>
          <CardHeader>
            <CardTitle>Preliminary Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your request has been submitted. Results will be displayed here in the future.</p>
            <p className="mt-2 text-sm text-gray-500">Submitted URL: {url}</p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}