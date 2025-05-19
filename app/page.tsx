'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Star } from "lucide-react"
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedState = localStorage.getItem('waitlistSubmitted')
    if (savedState === 'true') {
      setIsSubmitted(true)
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { error } = await supabase
        .from('emails')
        .insert([{ email }])

      if (error) throw error

      setIsSubmitted(true)
      localStorage.setItem('waitlistSubmitted', 'true')
      setEmail('')
    } catch (err) {
      console.error('Error saving email:', err)
      setError('Failed to join waitlist. Please try again.')
      setIsSubmitted(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 bg-gradient-to-b from-background to-background/80 animate-gradient-y">
      <div className="w-full max-w-3xl space-y-12 md:space-y-16 pt-20 md:pt-32 mb-12">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            {/* <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">Coming Soon</span> */}
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 animate-gradient-x sm:text-5xl md:text-6xl pb-2">
            Let your AI use any API
          </h1>
          </div>
          <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed">
            Enter the documentation urls you want to connect your AI Client to, and we'll spin up a container hosting all of the endpoints as MCP tools. Join our waitlist to get early access.
          </p>
        </div>


        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {isSubmitted ? "You're on the waitlist!" : "Join the waitlist"}
              </Label>
              <div className="flex gap-2">
                {isSubmitted ? (
                  <div className="flex-1 flex items-center px-3 rounded-md py-2 border border-zinc-200 border-b-zinc-300/80 border-2">
                    <p className="text-primary font-medium">Thanks for joining! We'll be in touch soon.</p>
                  </div>
                ) : (
                  <>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit">Join</Button>
                  </>
                )}
              </div>
              {error && (
                <p className="text-sm text-destructive mt-1">{error}</p>
              )}
            </div>
          </form>
        </div>


        <div className="space-y-6">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-black/95 p-6 shadow-2xl transition-all duration-300 ">
            <div className="relative">
              <pre className="overflow-x-auto text-left opacity-40">
                <code className="text-sm text-white font-mono">
                  <span className="text-indigo-400 select-none mr-2">$</span>pip install <span className="blur-sm select-none">hello</span>
                  <br />
                  <span className="text-indigo-400 select-none mr-2">$</span><span className="blur-sm select-none">hello</span> run --url https://api.example.com/docs
                </code>
              </pre>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-white bg-black/80 px-4 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="space-y-6 text-center">
          <a
            href="https://github.com/alexhamidi/automcp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-white transition-all duration-300 bg-black rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-lg"
          >
            <Star className="w-5 h-5" />
            View on GitHub
          </a>
        </div> */}
      </div>

      <div className="border rounded-xl border-zinc-400 border-4 relative z-10 flex h-full flex-col items-center  text-center max-w-6xl mx-auto mb-12 shadow-2xl">
        <video
          playsInline
          muted
          autoPlay
          loop
          controls
          className="rounded-lg shadow-lg w-[80vw] h-auto"
          width="1248"
          height="735"
        >
          <source src="/automcp.mp4" type="video/mp4" />
        </video>
      </div>

      <footer className="w-full py-6 border-t border-border/40 sticky bottom-0 bg-background backdrop-blur-sm z-20">
        <div className="container flex items-center justify-center ">
          <p className="text-sm text-muted-foreground">
            Built by the{' '}
            <a
              href="https://ahamidi.me"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors hover:underline"
            >
              creator
            </a>
            {' '}of{' '}
            <a
              href="https://monotool.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors hover:underline"
            >
              Monotool
            </a>
            {' '}for the Y Combinator MCP Hackathon
          </p>
        </div>
      </footer>
    </main>
  )
}
