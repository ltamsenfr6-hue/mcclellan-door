import { Twilio } from 'twilio'

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

const FROM = process.env.TWILIO_PHONE_NUMBER!

export async function sendSMS(to: string, body: string) {
  return client.messages.create({ from: FROM, to, body })
}
