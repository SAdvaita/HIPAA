"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Clock, Download } from "lucide-react"
import { generateAuditTrailPDF } from "../lib/pdf-generator"

interface ComplianceResult {
  id: string
  url: string
  status: "compliant" | "needs-attention" | "non-compliant"
  findings: {
    category: string
    requirement: string
    status: "present" | "partial" | "missing"
    details: string
    recommendations: string[]
    priority: "critical" | "important" | "recommended"
  }[]
  summary: {
    totalRequirements: number
    presentRequirements: number
    partialRequirements: number
    missingRequirements: number
    criticalIssues: number
  }
  timestamp: string
}

interface AuditTrailProps {
  reportId: string
  result: ComplianceResult
}

export function AuditTrail({ reportId, result }: AuditTrailProps) {
  const [exporting, setExporting] = useState(false)

  // Group findings by category
  const categorizedFindings = result.findings.reduce(
    (acc, finding) => {
      if (!acc[finding.category]) {
        acc[finding.category] = []
      }
      acc[finding.category].push(finding)
      return acc
    },
    {} as Record<string, typeof result.findings>,
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "missing":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800 border-green-200">FOUND</Badge>
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">PARTIAL</Badge>
      case "missing":
        return <Badge className="bg-red-100 text-red-800 border-red-200">MISSING</Badge>
      default:
        return <Badge variant="outline">UNKNOWN</Badge>
    }
  }

  const handleExportAudit = () => {
    setExporting(true)
    try {
      const pdf = generateAuditTrailPDF(result)
      pdf.save(`hipaa-audit-trail-${result.id}.pdf`)
    } catch (err) {
      console.error("Export failed:", err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Compliance Audit Trail</h2>
          <p className="text-sm text-gray-600 mt-1">Comprehensive audit trail and detailed compliance checking</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-600">Analysis Date</div>
            <div className="font-medium">{new Date(result.timestamp).toLocaleDateString()}</div>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportAudit} disabled={exporting}>
            <Download className="h-4 w-4 mr-2" />
            {exporting ? "Generating PDF..." : "Export Audit PDF"}
          </Button>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-6">
        <div className="text-sm text-gray-600 mb-4">Category Breakdown</div>

        {Object.entries(categorizedFindings).map(([category, findings]) => (
          <Card key={category} className="border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">{category}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {findings.length} requirements
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700 mb-3">Individual Rule Results</div>

                {findings.map((finding, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(finding.status)}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mb-1">{finding.requirement}</div>
                          <div className="text-sm text-gray-600 mb-2">{finding.details}</div>
                          {finding.recommendations.length > 0 && (
                            <div className="text-xs text-blue-600">💡 {finding.recommendations[0]}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(finding.status)}
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            finding.priority === "critical"
                              ? "border-red-200 text-red-700"
                              : finding.priority === "important"
                                ? "border-yellow-200 text-yellow-700"
                                : "border-green-200 text-green-700"
                          }`}
                        >
                          {finding.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
