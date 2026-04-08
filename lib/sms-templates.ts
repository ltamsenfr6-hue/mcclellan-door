export interface LeadDetails {
  customerName: string
  callbackPhone: string
  serviceAddress: string
  doorIssue: string
  carStuck: boolean
  callerPhone?: string
}

export function ownerLeadMessage(lead: LeadDetails): string {
  const urgent = lead.carStuck

  const lines = [
    urgent ? '🚨 URGENT LEAD — McClellan Overhead Door' : '📞 NEW LEAD — McClellan Overhead Door',
    '',
    `Name: ${lead.customerName}`,
    `Phone: ${lead.callbackPhone || lead.callerPhone || 'Not provided'}`,
    `Address: ${lead.serviceAddress || 'Not provided'}`,
    `Issue: ${lead.doorIssue || 'Not provided'}`,
    `Car stuck: ${lead.carStuck ? 'YES ⚠️' : 'No'}`,
  ]

  if (urgent) {
    lines.push('')
    lines.push('Call them back ASAP — car is stuck in the garage.')
  }

  return lines.join('\n')
}
