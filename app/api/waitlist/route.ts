import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Validate environment variables
if (!process.env.SUPABASE_URL) {
  throw new Error('Missing environment variable: SUPABASE_URL')
}
if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing environment variable: SUPABASE_SERVICE_KEY')
}

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request) {
  try {
    // Validate request content type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !Array.isArray(body.userTypes)) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or userTypes' },
        { status: 400 }
      )
    }

    const { name, email, userTypes } = body

    // Determine user_type based on selected options
    let user_type: 'company' | 'user' | 'both' = 'user'
    if (userTypes.includes('api_provider') && userTypes.includes('llm_developer')) {
      user_type = 'both'
    } else if (userTypes.includes('api_provider')) {
      user_type = 'company'
    }

    const { error: supabaseError } = await supabase
      .from('emails')
      .insert([{
        name,
        email,
        user_type,
        info: body.additionalDetails || null
      }])

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      return NextResponse.json(
        { error: supabaseError.message || 'Failed to submit to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
