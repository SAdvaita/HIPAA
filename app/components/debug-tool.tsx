"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, FileText, Search, Settings } from "lucide-react"

interface ComplianceResult {
  id: string
  url: string
  privacyPolicyText: string
  findings: {
    category: string
    requirement: string
    status: "met" | "partial" | "missing"
    details: string
    recommendations: string[]
    priority: "high" | "medium" | "low"
  }[]
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

interface DebugToolProps {
  result: ComplianceResult
}

export function DebugTool({ result }: DebugToolProps) {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)

  // Mock debug info if not provided
  const debugInfo = result.debugInfo || {
    contentAnalysis: {
      wordCount: result.privacyPolicyText.split(" ").length,
      contentLength: result.privacyPolicyText.length,
      sectionsFound: 5,
      privacyPolicyUrl: `${result.url}/privacy`,
      title: "Privacy Policy",
    },
    rulesTesting: {
      keywordMatches: {
        "data sharing": ["share", "third party", "partners"],
        security: ["encryption", "secure", "protect"],
        breach: ["incident", "notification"],
        access: ["view", "obtain", "request"],
      },
      missingKeywords: {
        "business associate": ["business associate", "baa"],
        retention: ["retention", "delete", "how long"],
      },
    },
    processingSteps: [
      { step: "URL Validation", status: "completed", duration: 45, details: "URL format validated successfully" },
      {
        step: "Privacy Policy Discovery",
        status: "completed",
        duration: 1250,
        details: "Found privacy policy at /privacy",
      },
      {
        step: "Content Extraction",
        status: "completed",
        duration: 890,
        details: "Extracted 2,492 characters of content",
      },
      { step: "Keyword Analysis", status: "completed", duration: 340, details: "Analyzed content for HIPAA keywords" },
      { step: "Rule Evaluation", status: "completed", duration: 180, details: "Evaluated 12 HIPAA requirements" },
      { step: "Report Generation", status: "completed", duration: 95, details: "Generated compliance report" },
    ],
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "skipped":
        return <Clock className="h-4 w-4 text-gray-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStepBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">COMPLETED</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">FAILED</Badge>
      case "skipped":
        return <Badge className="bg-gray-100 text-gray-800">SKIPPED</Badge>
      default:
        return <Badge variant="outline">UNKNOWN</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">HIPAA Analyzer Debug Tool</h2>
          <p className="text-sm text-gray-600 mt-1">
            Detailed analysis and debugging information for compliance checking
          </p>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="steps" className="data-[state=active]:bg-white">
            Debug Steps
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-white">
            Content Analysis
          </TabsTrigger>
          <TabsTrigger value="rules" className="data-[state=active]:bg-white">
            Rule Testing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="steps">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Processing Steps
              </CardTitle>
              <CardDescription>Step-by-step breakdown of the analysis process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {debugInfo.processingSteps.map((step, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStepIcon(step.status)}
                      <div>
                        <div className="font-medium text-gray-900">{step.step}</div>
                        <div className="text-sm text-gray-600">{step.details}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">{step.duration}ms</div>
                      {getStepBadge(step.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{result.url}</div>
                    <div className="text-sm text-gray-600 mt-1">URL</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{debugInfo.contentAnalysis.title}</div>
                    <div className="text-sm text-gray-600 mt-1">Title</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{debugInfo.contentAnalysis.wordCount}</div>
                    <div className="text-sm text-gray-600 mt-1">Word Count</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {debugInfo.contentAnalysis.contentLength.toLocaleString()} chars
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Content Length</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-medium text-gray-900 mb-2">Privacy Policy URL:</div>
                    <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                      {debugInfo.contentAnalysis.privacyPolicyUrl}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-2">Sections Found:</div>
                    <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                      {debugInfo.contentAnalysis.sectionsFound} sections identified
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="font-medium text-gray-900 mb-2">Content Preview:</div>
                  <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                    {result.privacyPolicyText.substring(0, 500)}...
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-medium text-gray-900 mb-2">Sections Identified:</div>
                  <div className="flex flex-wrap gap-2">
                    {["data sharing", "security", "international", "changes", "breach"].map((section) => (
                      <Badge key={section} variant="outline" className="text-xs">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Rule Testing Results
                </CardTitle>
                <CardDescription>Keyword matching and rule evaluation details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-green-700 mb-3">✅ Keywords Found</h4>
                    <div className="space-y-3">
                      {Object.entries(debugInfo.rulesTesting.keywordMatches).map(([category, keywords]) => (
                        <div key={category} className="border border-green-200 rounded-lg p-4 bg-green-50">
                          <div className="font-medium text-green-800 mb-2 capitalize">{category}</div>
                          <div className="flex flex-wrap gap-2">
                            {keywords.map((keyword) => (
                              <Badge key={keyword} className="bg-green-100 text-green-800 text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-red-700 mb-3">❌ Missing Keywords</h4>
                    <div className="space-y-3">
                      {Object.entries(debugInfo.rulesTesting.missingKeywords).map(([category, keywords]) => (
                        <div key={category} className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <div className="font-medium text-red-800 mb-2 capitalize">{category}</div>
                          <div className="flex flex-wrap gap-2">
                            {keywords.map((keyword) => (
                              <Badge key={keyword} className="bg-red-100 text-red-800 text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
