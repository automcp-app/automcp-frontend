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
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-xl"
            variant="outline"
            onClick={() => {
              window.open('https://github.com/alexhamidi/automcp', '_blank', 'noopener,noreferrer');
            }}
          >
            <Github className="mr-2 h-5 w-5" />
            View Docs
          </Button>
        </div>

        <div className="max-w-3xl w-full mx-auto my-12 p-6 rounded-lg bg-zinc-900 text-white font-mono">
          <div className="text-green-600 font-bold mb-4"># getting started</div>
          <div className="flex flex-col">
            <span className="mb-2">npm install -g @automcp.app/cli</span>
            <span className="mb-2">export OPENAI_API_KEY=your_api_key<span className="text-muted-foreground"> # can use gemini or anthropic</span></span>
            <span>automcp</span>
          </div>
        </div>

        <div className="border rounded-xl   relative z-10 flex h-full flex-col items-center text-center max-w-6xl mx-auto mb-12 shadow-2xl">
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
            <source src={`/automcp.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
  )
}
