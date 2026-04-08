import { NextRequest, NextResponse } from 'next/server'
import { sendSMS } from '@/lib/twilio'
import { ownerLeadMessage, LeadDetails } from '@/lib/sms-templates'

// VAPI posts to this endpoint at the end of every call
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { message } = body

  // Only process end-of-call reports
  if (message?.type !== 'end-of-call-report') {
    return NextResponse.json({ received: true })
  }

  const analysis = message?.analysis?.structuredData ?? {}
  const customer = message?.customer ?? {}

  const lead: LeadDetails = {
    customerName: analysis.customerName ?? 'Unknown',
    callbackPhone: analysis.callbackPhone ?? customer.number ?? '',
    serviceAddress: analysis.serviceAddress ?? '',
    doorIssue: analysis.doorIssue ?? '',
    carStuck: analysis.carStuck === true,
    callerPhone: customer.number ?? '',
  }

  const ownerPhone = process.env.OWNER_PHONE_NUMBER!

  await sendSMS(ownerPhone, ownerLeadMessage(lead))

  return NextResponse.json({ ok: true })
}
