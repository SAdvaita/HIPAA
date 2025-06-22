"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Shield, FileText, Download, Bug } from "lucide-react"
import { ComplianceReport } from "./components/compliance-report"
import { AuditTrail } from "./components/audit-trail"
import { OverviewAnalysis } from "./components/overview-analysis"
import { DebugTool } from "./components/debug-tool"
import { HIPAAStandards } from "./components/hipaa-standards"
import { generateComplianceReportPDF } from "./lib/pdf-generator"

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
  privacyPolicyText: string
  timestamp: string
  summary: {
    totalRequirements: number
    presentRequirements: number
    partialRequirements: number
    missingRequirements: number
    criticalIssues: number
  }
  debugInfo?: {
    contentAnalysis: {
      wordCount: number
      contentLength: number
      sectionsFound: number
      privacyPolicyUrl: string
      title: string
    }
    rulesTesting: {
      keywordMatches: Record<string, string[]>
      missingKeywords: Record<string, string[]>
    }
    processingSteps: {
      step: string
      status: "completed" | "failed" | "skipped"
      duration: number
      details: string
    }[]
  }
}

export default function HIPAAComplianceChecker() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ComplianceResult | null>(null)
  const [error, setError] = useState("")
  const [exportingReport, setExportingReport] = useState(false)
  const [debugMode, setDebugMode] = useState(false)

  const handleCheck = async () => {
    if (!url) return

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/check-compliance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, debug: debugMode }),
      })

      if (!response.ok) {
        throw new Error("Failed to check compliance")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleExportReport = () => {
    if (!result) return

    setExportingReport(true)
    try {
      const pdf = generateComplianceReportPDF(result)
      pdf.save(`hipaa-compliance-report-${result.id}.pdf`)
    } catch (err) {
      console.error("Export failed:", err)
    } finally {
      setExportingReport(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">HIPAA Analyzer</h1>
            <Button
              variant={debugMode ? "default" : "outline"}
              onClick={() => setDebugMode(!debugMode)}
              className="ml-4"
            >
              <Bug className="h-4 w-4 mr-2" />
              Debug Tool
            </Button>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of website privacy policies against HIPAA standards
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-white border-b">
            <CardTitle className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-600" />
              {debugMode ? "HIPAA Analyzer Debug Tool" : "Website Privacy Policy Analysis"}
            </CardTitle>
            <CardDescription>
              {debugMode
                ? "Debug mode enabled - detailed analysis information will be provided"
                : "Enter a website URL to perform comprehensive HIPAA compliance analysis"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 h-12"
              />
              <Button
                onClick={handleCheck}
                disabled={loading || !url}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    {debugMode ? "Debug Analysis" : "Analyze Compliance"}
                  </>
                )}
              </Button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            {/* Main Content Tabs */}
            <Tabs defaultValue={debugMode ? "debug" : "overview"} className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border">
                <TabsList className="grid w-full grid-cols-6 bg-gray-50 rounded-t-lg h-12">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="compliance"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Compliance Analysis
                  </TabsTrigger>
                  <TabsTrigger value="audit" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Audit Trail
                  </TabsTrigger>
                  <TabsTrigger value="standards" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    HIPAA Standards
                  </TabsTrigger>
                  <TabsTrigger value="report" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Full Report
                  </TabsTrigger>
                  {debugMode && (
                    <TabsTrigger value="debug" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Bug className="h-4 w-4 mr-1" />
                      Debug
                    </TabsTrigger>
                  )}
                </TabsList>

                <div className="p-6">
                  <TabsContent value="overview" className="mt-0">
                    <OverviewAnalysis result={result} />
                  </TabsContent>

                  <TabsContent value="compliance" className="mt-0">
                    <ComplianceReport findings={result.findings} />
                  </TabsContent>

                  <TabsContent value="audit" className="mt-0">
                    <AuditTrail reportId={result.id} result={result} />
                  </TabsContent>

                  <TabsContent value="standards" className="mt-0">
                    <HIPAAStandards />
                  </TabsContent>

                  <TabsContent value="report" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Full Compliance Report</h3>
                      <Button
                        onClick={handleExportReport}
                        disabled={exportingReport}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {exportingReport ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Generating PDF...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Export Report PDF
                          </>
                        )}
                      </Button>
                    </div>
                    <ComplianceReport findings={result.findings} />
                  </TabsContent>

                  {debugMode && (
                    <TabsContent value="debug" className="mt-0">
                      <DebugTool result={result} />
                    </TabsContent>
                  )}
                </div>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
