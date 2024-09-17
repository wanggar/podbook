'use client'
import axios from 'axios';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const response = await axios.post('/api/transcribe-translate', { url });
      const filename = response.data.audioUrl.split('/').pop();
      setAudioUrl(`/api/audio/${filename}`);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">YouTube Audio Extractor</h1>
      
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
              {isLoading ? 'Processing...' : 'Extract Audio'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="mt-4">
          <CardContent className="text-center py-4">
            <p>Extracting audio. This may take a few minutes...</p>
          </CardContent>
        </Card>
      )}

      {audioUrl && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Audio Player</CardTitle>
          </CardHeader>
          <CardContent>
            <audio 
              controls 
              className="w-full"
              onError={(e) => {
                console.error('Audio playback error:', e);
                setError('Failed to play audio. Please try again.');
              }}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mt-4">
          <CardContent className="text-center py-4 text-red-500">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}