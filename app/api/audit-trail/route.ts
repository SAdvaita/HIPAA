import { type NextRequest, NextResponse } from "next/server"
import { getAuditTrail } from "../../lib/audit-logger"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reportId = searchParams.get("reportId")

    if (!reportId) {
      return NextResponse.json({ error: "Report ID is required" }, { status: 400 })
    }

    const entries = await getAuditTrail(reportId)

    return NextResponse.json({ entries })
  } catch (error) {
    console.error("Audit trail fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
