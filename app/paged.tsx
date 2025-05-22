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

    if (formData.userTypes.length === 0) {
      setError('Please select at least one option for how you will use AutoMCP')
      return
    }

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

      <div className="w-full max-w-3xl space-y-12 md:space-y-16 pt-32 md:pt-40 mb-12">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 animate-gradient-x sm:text-5xl md:text-6xl pb-2">
            Your products,  <br/>Now<span className="text-zinc-900 underline"> Agent-native.</span>

</h1>
          </div>
          <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed">
              Deploy secure, remote, and up-to-date MCP servers from existing services in seconds. Agents are your biggest untapped customers, don't get left behind.
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
              <form onSubmit={handleSubmit} className="flex flex-row  border border-zinc-700 shadow-md rounded-xl items-center justify-between">
                <input
                  placeholder="Enter your email"
                  className="px-4 py-5 border-none rounded-xl focus:outline-none focus:ring-0"
                />
                <Button
                  size="lg"
                  className="text-lg px-8 py-8 rounded-lg "
                >
                  Join Waitlist
                </Button>
              </form>
          )}

        </div>
      </div>


    </main>
  )
}
