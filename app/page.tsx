'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to validate YouTube URL
  const isValidYouTubeUrl = (url: string) => {
    // Implement URL validation logic here
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return youtubeRegex.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTranscription('');
    setTranslation('');

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, targetLanguage: 'en' }), // Assuming English as target language
      });

      if (!response.ok) {
        throw new Error('Failed to process the URL');
      }

      const data = await response.json();
      setTranscription(data.transcription);
      setTranslation(data.translation);
    } catch (error) {
      setError('An error occurred while processing the URL');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Podcast Transcription and Translation Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="w-full"
        />
        <Button type="submit">Process</Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isLoading && <p className="mt-4">Processing...</p>}
      {transcription && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
      {translation && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Translation:</h2>
          <p>{translation}</p>
        </div>
      )}
      {/* TODO: Add output component here */}
    </main>
  )
}