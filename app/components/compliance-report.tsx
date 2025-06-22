"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, Target } from "lucide-react"
import { useState } from "react"

interface Finding {
  category: string
  requirement: string
  description: string
  status: "present" | "partial" | "missing"
  details: string
  recommendations: string[]
  priority: "critical" | "important" | "recommended"
  complianceNote: string
}

interface ComplianceReportProps {
  findings: Finding[]
}

export function ComplianceReport({ findings }: ComplianceReportProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "missing":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">✅ PRESENT</Badge>
      case "partial":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">⚠️ PARTIAL</Badge>
      case "missing":
        return <Badge className="bg-red-100 text-red-800 border-red-200">❌ MISSING</Badge>
      default:
        return <Badge variant="outline">UNKNOWN</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "important":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "recommended":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-slate-100 text-slate-800 border-slate-300"
    }
  }

  const categories = [...new Set(findings.map((f) => f.category))]

  // Get all recommendations as bullet points
  const allRecommendations = findings
    .filter((f) => f.recommendations.length > 0)
    .flatMap((f) =>
      f.recommendations.map((rec) => ({
        category: f.category,
        requirement: f.requirement,
        recommendation: rec,
        priority: f.priority,
        status: f.status,
      })),
    )

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-xl">HIPAA Compliance Checklist Report</CardTitle>
        <CardDescription className="text-indigo-100">
          Comprehensive checklist based on 2025 HIPAA requirements with specific findings and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryFindings = findings.filter((f) => f.category === category)
            const isOpen = openCategories.includes(category)

            return (
              <Collapsible key={category} open={isOpen} onOpenChange={() => toggleCategory(category)}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-800">{category}</h3>
                      <Badge variant="outline" className="text-xs">
                        {categoryFindings.length} requirements
                      </Badge>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-4 space-y-4 pl-4">
                    {categoryFindings.map((finding, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="p-4 bg-white">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 pr-4">
                              <h4 className="font-semibold text-slate-900 mb-1">{finding.requirement}</h4>
                              <p className="text-sm text-slate-600 mb-2">{finding.description}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge className={`${getPriorityColor(finding.priority)} border text-xs`}>
                                {finding.priority.toUpperCase()}
                              </Badge>
                              {getStatusBadge(finding.status)}
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-start gap-2">
                              {getStatusIcon(finding.status)}
                              <p className="text-slate-700 text-sm leading-relaxed">{finding.details}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>

        {/* Recommendations Section - Simple Bullet Points */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Recommendations</h3>
          </div>

          {allRecommendations.length > 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="space-y-3">
                {allRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-sm text-blue-900 font-medium">{rec.requirement}:</span>
                      <span className="text-sm text-blue-800 ml-1">{rec.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-green-800 mb-2">Excellent Compliance!</h4>
              <p className="text-green-700">All HIPAA requirements are properly addressed in your privacy policy.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
