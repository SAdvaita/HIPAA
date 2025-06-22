import jsPDF from "jspdf"

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

export function generateAuditTrailPDF(result: ComplianceResult) {
  const doc = new jsPDF()
  let yPosition = 20

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, x, y)
    return y + lines.length * (fontSize * 0.4)
  }

  // Header with blue background
  doc.setFillColor(37, 99, 235) // Blue color
  doc.rect(0, 0, 210, 30, "F")

  // Title
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("HIPAA COMPLIANCE AUDIT TRAIL", 20, 20)

  // Reset text color
  doc.setTextColor(0, 0, 0)
  yPosition = 45

  // Report Information Box
  doc.setFillColor(248, 250, 252) // Light gray background
  doc.rect(15, yPosition - 5, 180, 35, "F")
  doc.setDrawColor(203, 213, 225)
  doc.rect(15, yPosition - 5, 180, 35, "S")

  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Report Information", 20, yPosition + 5)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(`Report ID: ${result.id}`, 20, yPosition + 15)
  doc.text(`Website: ${result.url}`, 20, yPosition + 22)
  doc.text(`Analysis Date: ${new Date(result.timestamp).toLocaleString()}`, 20, yPosition + 29)

  // Status badge
  const statusColor =
    result.status === "compliant" ? [34, 197, 94] : result.status === "needs-attention" ? [245, 158, 11] : [239, 68, 68]
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2])
  doc.roundedRect(140, yPosition + 10, 50, 8, 2, 2, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")
  doc.text(result.status.toUpperCase().replace("-", " "), 142, yPosition + 16)
  doc.setTextColor(0, 0, 0)

  yPosition += 50

  // Summary Statistics
  doc.setFillColor(59, 130, 246) // Blue background
  doc.rect(15, yPosition, 180, 12, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("SUMMARY STATISTICS", 20, yPosition + 8)
  doc.setTextColor(0, 0, 0)
  yPosition += 20

  // Statistics boxes
  const stats = [
    { label: "Total", value: result.summary.totalRequirements, color: [59, 130, 246] },
    { label: "Present", value: result.summary.presentRequirements, color: [34, 197, 94] },
    { label: "Partial", value: result.summary.partialRequirements, color: [245, 158, 11] },
    { label: "Missing", value: result.summary.missingRequirements, color: [239, 68, 68] },
  ]

  stats.forEach((stat, index) => {
    const x = 20 + index * 42
    doc.setFillColor(stat.color[0], stat.color[1], stat.color[2])
    doc.roundedRect(x, yPosition, 35, 25, 3, 3, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(stat.value.toString(), x + 17.5, yPosition + 12, { align: "center" })

    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text(stat.label, x + 17.5, yPosition + 20, { align: "center" })
  })

  yPosition += 40

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

  // Category breakdown
  Object.entries(categorizedFindings).forEach(([category, findings]) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    // Category header
    doc.setFillColor(99, 102, 241) // Indigo background
    doc.rect(15, yPosition, 180, 10, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text(category.toUpperCase(), 20, yPosition + 7)
    doc.setTextColor(0, 0, 0)
    yPosition += 15

    findings.forEach((finding, index) => {
      // Check if we need a new page
      if (yPosition > 260) {
        doc.addPage()
        yPosition = 20
      }

      // Finding box
      doc.setFillColor(249, 250, 251)
      doc.rect(20, yPosition, 170, 25, "F")
      doc.setDrawColor(229, 231, 235)
      doc.rect(20, yPosition, 170, 25, "S")

      // Status indicator
      const statusColor =
        finding.status === "present" ? [34, 197, 94] : finding.status === "partial" ? [245, 158, 11] : [239, 68, 68]
      doc.setFillColor(statusColor[0], statusColor[1], statusColor[2])
      doc.circle(25, yPosition + 5, 2, "F")

      // Requirement name
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text(`${index + 1}. ${finding.requirement}`, 30, yPosition + 7)

      // Status and priority
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8)
      doc.text(`Status: ${finding.status.toUpperCase()}`, 30, yPosition + 14)
      doc.text(`Priority: ${finding.priority.toUpperCase()}`, 100, yPosition + 14)

      // First recommendation if available
      if (finding.recommendations.length > 0) {
        doc.setFontSize(8)
        doc.setTextColor(59, 130, 246)
        const recText = `💡 ${finding.recommendations[0]}`
        const wrappedRec = doc.splitTextToSize(recText, 150)
        doc.text(wrappedRec[0], 30, yPosition + 20)
        doc.setTextColor(0, 0, 0)
      }

      yPosition += 30
    })

    yPosition += 10
  })

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(107, 114, 128)
    doc.text(`Generated by HIPAA Analyzer - Page ${i} of ${pageCount}`, 20, 285)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 140, 285)
  }

  return doc
}

export function generateComplianceReportPDF(result: ComplianceResult) {
  const doc = new jsPDF()
  let yPosition = 20

  // Helper function for wrapped text
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, x, y)
    return y + lines.length * (fontSize * 0.4)
  }

  // Header with gradient-like effect
  doc.setFillColor(79, 70, 229) // Indigo
  doc.rect(0, 0, 210, 35, "F")
  doc.setFillColor(99, 102, 241) // Lighter indigo
  doc.rect(0, 25, 210, 10, "F")

  // Title
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.text("HIPAA COMPLIANCE REPORT", 20, 22)

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text("Comprehensive Analysis & Recommendations", 20, 30)

  doc.setTextColor(0, 0, 0)
  yPosition = 50

  // Executive Summary Box
  doc.setFillColor(239, 246, 255) // Light blue background
  doc.rect(15, yPosition, 180, 50, "F")
  doc.setDrawColor(59, 130, 246)
  doc.setLineWidth(0.5)
  doc.rect(15, yPosition, 180, 50, "S")

  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(30, 64, 175)
  doc.text("EXECUTIVE SUMMARY", 20, yPosition + 10)

  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(`Website: ${result.url}`, 20, yPosition + 20)
  doc.text(`Analysis Date: ${new Date(result.timestamp).toLocaleString()}`, 20, yPosition + 27)
  doc.text(`Report ID: ${result.id}`, 20, yPosition + 34)

  // Overall status with colored background
  const statusColor =
    result.status === "compliant" ? [34, 197, 94] : result.status === "needs-attention" ? [245, 158, 11] : [239, 68, 68]
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2])
  doc.roundedRect(140, yPosition + 15, 50, 12, 3, 3, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("OVERALL STATUS", 142, yPosition + 20)
  doc.text(result.status.toUpperCase().replace("-", " "), 142, yPosition + 25)
  doc.setTextColor(0, 0, 0)

  yPosition += 65

  // Compliance Metrics Dashboard
  doc.setFillColor(34, 197, 94) // Green
  doc.rect(15, yPosition, 180, 12, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("COMPLIANCE METRICS DASHBOARD", 20, yPosition + 8)
  doc.setTextColor(0, 0, 0)
  yPosition += 20

  // Metrics with visual bars
  const metrics = [
    {
      label: "Total Requirements",
      value: result.summary.totalRequirements,
      max: result.summary.totalRequirements,
      color: [59, 130, 246],
    },
    {
      label: "Present",
      value: result.summary.presentRequirements,
      max: result.summary.totalRequirements,
      color: [34, 197, 94],
    },
    {
      label: "Partial",
      value: result.summary.partialRequirements,
      max: result.summary.totalRequirements,
      color: [245, 158, 11],
    },
    {
      label: "Missing",
      value: result.summary.missingRequirements,
      max: result.summary.totalRequirements,
      color: [239, 68, 68],
    },
  ]

  metrics.forEach((metric, index) => {
    const y = yPosition + index * 15

    // Label
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(metric.label, 20, y + 5)

    // Value
    doc.setFont("helvetica", "bold")
    doc.text(metric.value.toString(), 70, y + 5)

    // Progress bar background
    doc.setFillColor(229, 231, 235)
    doc.rect(80, y, 100, 8, "F")

    // Progress bar fill
    const fillWidth = (metric.value / metric.max) * 100
    doc.setFillColor(metric.color[0], metric.color[1], metric.color[2])
    doc.rect(80, y, fillWidth, 8, "F")

    // Percentage
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    const percentage = Math.round((metric.value / metric.max) * 100)
    doc.text(`${percentage}%`, 185, y + 5)
  })

  yPosition += 80

  // Recommendations Section
  const allRecommendations = result.findings
    .filter((f) => f.recommendations.length > 0)
    .flatMap((f) =>
      f.recommendations.map((rec) => ({
        category: f.category,
        requirement: f.requirement,
        recommendation: rec,
        priority: f.priority,
      })),
    )

  if (allRecommendations.length > 0) {
    // Check if we need a new page
    if (yPosition > 200) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFillColor(168, 85, 247) // Purple
    doc.rect(15, yPosition, 180, 12, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("PRIORITIZED RECOMMENDATIONS", 20, yPosition + 8)
    doc.setTextColor(0, 0, 0)
    yPosition += 20

    // Group recommendations by priority
    const criticalRecs = allRecommendations.filter((r) => r.priority === "critical").slice(0, 10)
    const importantRecs = allRecommendations.filter((r) => r.priority === "important").slice(0, 8)

    // Critical recommendations
    if (criticalRecs.length > 0) {
      doc.setFillColor(254, 242, 242) // Light red background
      doc.rect(15, yPosition, 180, 8, "F")
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(185, 28, 28)
      doc.text("🔴 CRITICAL PRIORITY", 20, yPosition + 6)
      doc.setTextColor(0, 0, 0)
      yPosition += 15

      criticalRecs.forEach((rec, index) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }

        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text(`${index + 1}.`, 20, yPosition)

        doc.setFont("helvetica", "normal")
        const text = `${rec.requirement}: ${rec.recommendation}`
        const wrappedText = doc.splitTextToSize(text, 165)
        doc.text(wrappedText, 25, yPosition)

        yPosition += wrappedText.length * 4 + 3
      })

      yPosition += 10
    }

    // Important recommendations
    if (importantRecs.length > 0) {
      if (yPosition > 200) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFillColor(255, 251, 235) // Light yellow background
      doc.rect(15, yPosition, 180, 8, "F")
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(217, 119, 6)
      doc.text("🟡 IMPORTANT PRIORITY", 20, yPosition + 6)
      doc.setTextColor(0, 0, 0)
      yPosition += 15

      importantRecs.forEach((rec, index) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }

        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text(`${index + 1}.`, 20, yPosition)

        doc.setFont("helvetica", "normal")
        const text = `${rec.requirement}: ${rec.recommendation}`
        const wrappedText = doc.splitTextToSize(text, 165)
        doc.text(wrappedText, 25, yPosition)

        yPosition += wrappedText.length * 4 + 3
      })
    }
  }

  // Add new page for disclaimer
  doc.addPage()
  yPosition = 20

  // Disclaimer section
  doc.setFillColor(249, 250, 251) // Light gray
  doc.rect(15, yPosition, 180, 60, "F")
  doc.setDrawColor(209, 213, 219)
  doc.rect(15, yPosition, 180, 60, "S")

  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(75, 85, 99)
  doc.text("IMPORTANT DISCLAIMER", 20, yPosition + 10)

  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(55, 65, 81)
  const disclaimerText = `This report is generated by automated analysis and should be reviewed by qualified HIPAA compliance professionals. The analysis is based on keyword detection and pattern matching of publicly available privacy policy content. Organizations should conduct comprehensive compliance assessments with legal and compliance experts before making final compliance determinations.`

  const wrappedDisclaimer = doc.splitTextToSize(disclaimerText, 170)
  doc.text(wrappedDisclaimer, 20, yPosition + 20)

  // Footer with branding
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)

    // Footer line
    doc.setDrawColor(229, 231, 235)
    doc.line(15, 280, 195, 280)

    doc.setFontSize(8)
    doc.setTextColor(107, 114, 128)
    doc.text(`Generated by HIPAA Analyzer`, 20, 285)
    doc.text(`${new Date().toLocaleString()}`, 20, 290)
    doc.text(`Page ${i} of ${pageCount}`, 170, 285)
    doc.text(`Report ID: ${result.id}`, 170, 290)
  }

  return doc
}
