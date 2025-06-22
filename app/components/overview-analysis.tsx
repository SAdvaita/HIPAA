import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

interface ComplianceResult {
  id: string
  url: string
  status: "compliant" | "needs-attention" | "non-compliant"
  findings: {
    category: string
    requirement: string
    description: string
    status: "present" | "partial" | "missing"
    details: string
    recommendations: string[]
    priority: "critical" | "important" | "recommended"
    complianceNote: string
  }[]
  summary: {
    totalRequirements: number
    presentRequirements: number
    partialRequirements: number
    missingRequirements: number
    criticalIssues: number
  }
}

interface OverviewAnalysisProps {
  result: ComplianceResult
}

export function OverviewAnalysis({ result }: OverviewAnalysisProps) {
  const categoryStats = result.findings.reduce(
    (acc, finding) => {
      if (!acc[finding.category]) {
        acc[finding.category] = { total: 0 }
      }
      acc[finding.category].total++
      return acc
    },
    {} as Record<string, { total: number }>,
  )

  return (
    <div className="space-y-6">
      {/* Category Breakdown */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600" />
            Compliance Categories
          </CardTitle>
          <CardDescription>HIPAA requirement categories analyzed in your privacy policy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div key={category} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-slate-800">{category}</h4>
                  <Badge variant="outline" className="text-xs">
                    {stats.total} requirements
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
