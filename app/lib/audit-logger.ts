interface AuditEntry {
  reportId: string
  action: string
  url: string
  status: string
  userAgent: string
  ipAddress: string
  duration: number
  error?: string
}

// In-memory storage for demo purposes
// In production, this would be stored in a database
const auditLog: (AuditEntry & { id: string; timestamp: string })[] = []

export async function createAuditEntry(entry: AuditEntry) {
  const auditEntry = {
    ...entry,
    id: generateAuditId(),
    timestamp: new Date().toISOString(),
  }

  auditLog.push(auditEntry)
  console.log("Audit Entry Created:", auditEntry)

  return auditEntry
}

export async function getAuditTrail(reportId: string) {
  return auditLog.filter((entry) => entry.reportId === reportId)
}

function generateAuditId(): string {
  return `AUD-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase()
}
