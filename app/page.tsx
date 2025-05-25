'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Star } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userTypes: [] as string[],
    additionalDetails: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const userTypes = [
    {
      id: "api_provider",
      label: "API Provider looking to host my APIs as MCP tools"
    },
    {
      id: "llm_developer",
      label: "LLM Developer looking to connect to external APIs"
    }
  ]

  useEffect(() => {
    const savedState = localStorage.getItem('waitlistSubmitted')
    if (savedState === 'true') {
      setIsSubmitted(true)
    }
  }, [])

  const handleUserTypeChange = (checked: boolean, value: string) => {
    setFormData(prev => ({
      ...prev,
      userTypes: checked
        ? [...prev.userTypes, value]
        : prev.userTypes.filter(type => type !== value)
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')


    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      setIsSubmitted(true)
      setIsOpen(false)
      localStorage.setItem('waitlistSubmitted', 'true')
      setFormData({
        name: '',
        email: '',
        userTypes: [],
        additionalDetails: ''
      })
    } catch (err) {
      console.error('Error saving data:', err)
      setError(err instanceof Error ? err.message : 'Failed to join waitlist. Please try again.')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 bg-gradient-to-b from-background to-background/80 animate-gradient-y">
      {/* <div className="fixed top-0 w-full h-[2em] bg-purple-500 text-white text-center flex items-center justify-center"><span className="font-mono text-sm">OUR CLI BETA IS LIVE! SIGN UP FOR THE WAITLIST TO GET EARLY ACCESS</span></div> */}
      <div className="w-full max-w-10xl space-y-12 md:space-y-16 pt-20 md:pt-32 mb-12">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 animate-gradient-x sm:text-5xl md:text-6xl pb-2">
              Make your service agent-ready in seconds
            </h1>
          </div>
          <p className="text-lg text-muted-foreground md:text-xl max-w-8xl mx-auto leading-relaxed">
          Deploy secure, remote, and up-to-date MCP servers from existing services in seconds.<br/> Agents are your biggest untapped customers, don't get left behind.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          {isSubmitted ? (
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-xl border-black bg-white border-2 text-black cursor-not-allowed hover:bg-white"
            >
              You're on the waitlist!
            </Button>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl"
                >
                  Join Waitlist
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col">
                    <Label htmlFor="name">Name</Label>
                    <input
                      className="border border-zinc-300 shadow-sm rounded-sm text-sm px-2 py-1  mt-2 border-b-zinc-400/60 focus:outline-none focus:ring-1 focus:ring-zinc-400 shadow-sm"
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="email">Email</Label>
                    <input
                      className="border border-zinc-300 shadow-sm rounded-sm text-sm px-2 py-1  mt-2 border-b-zinc-400/60 focus:outline-none focus:ring-1 focus:ring-zinc-400 shadow-sm"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  {/* <div className="">
                    <Label>I am an...</Label>
                    <div className="grid gap-4 mt-2">
                      {userTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <Checkbox
                            className="z focus:outline-none focus:ring-1 focus:ring-zinc-400"
                            id={type.id}
                            checked={formData.userTypes.includes(type.id)}
                            onCheckedChange={(checked) =>
                              handleUserTypeChange(checked as boolean, type.id)}
                          />
                          <Label
                            htmlFor={type.id}
                            className="font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  <div className="flex flex-col">
                    <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
                    <textarea
                      className="border border-zinc-300 shadow-sm rounded-sm text-sm px-2 py-1 mt-2 focus:outline-none focus:ring-1 focus:ring-zinc-400 border-b-zinc-400/60 shadow-sm pb-[2em]"
                      id="additionalDetails"
                      placeholder="Tell us more about your use case, company, or requirements"
                      value={formData.additionalDetails}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>

                        setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
          {/* <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-xl"
            variant="outline"
            onClick={() => {
              window.open('https://github.com/alexhamidi/automcp', '_blank', 'noopener,noreferrer');
            }}
          >
            View Docs
          </Button> */}
        </div>
      </div>

      <div className="border rounded-xl border-zinc-400 border-4 relative z-10 flex h-full flex-col items-center text-center max-w-6xl mx-auto mb-12 shadow-2xl">
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

      {/* <footer className="w-full py-6 border-t border-border/40 sticky bottom-0 bg-background backdrop-blur-sm z-20">
        <div className="container flex items-center justify-center">
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
      </footer> */}
    </main>
  )
}
