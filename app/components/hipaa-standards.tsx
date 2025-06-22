import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Users, FileText, AlertTriangle, Eye } from "lucide-react"

const HIPAA_STANDARD_CATEGORIES = [
  {
    category: "Administrative Safeguards",
    subtitle: "§164.308(a)(1)(i) Final Rule",
    description: "Policies and procedures to manage security measures and workforce access",
    icon: <Users className="h-5 w-5" />,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    requirements: [
      "Security Officer designation and responsibilities",
      "Workforce training and access management procedures",
      "Information access management controls",
      "Security awareness and training programs",
      "Security incident procedures and response",
      "Contingency plan for emergency access",
      "Regular security evaluations and assessments",
      "Business associate agreement management",
    ],
  },
  {
    category: "Physical Safeguards",
    subtitle: "§164.310(a)(1) Final Rule",
    description: "Physical controls to protect systems, equipment, and facilities",
    icon: <Lock className="h-5 w-5" />,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    requirements: [
      "Facility access controls and visitor management",
      "Workstation use restrictions and positioning",
      "Device and media controls for PHI storage",
      "Proper disposal and reuse of PHI media",
      "Workstation security and screen locks",
      "Physical access logging and monitoring",
    ],
  },
  {
    category: "Technical Safeguards",
    subtitle: "§164.312(a)(1) Final Rule",
    description: "Technology controls to protect electronic PHI transmission and storage",
    icon: <Shield className="h-5 w-5" />,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    requirements: [
      "Access control with unique user identification",
      "Audit controls and comprehensive logging",
      "Integrity controls for PHI modification",
      "Person or entity authentication systems",
      "Transmission security and encryption",
      "Automatic logoff for inactive sessions",
      "Encryption and decryption capabilities",
    ],
  },
  {
    category: "Individual Rights",
    subtitle: "§164.524, §164.526 Final Rule",
    description: "Rights granted to individuals regarding their protected health information",
    icon: <Eye className="h-5 w-5" />,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    requirements: [
      "Right to access PHI within 30 days",
      "Right to amend inaccurate PHI",
      "Right to accounting of disclosures",
      "Right to request restrictions on use/disclosure",
      "Right to confidential communications",
      "Right to file complaints without retaliation",
      "Right to receive notice of privacy practices",
    ],
  },
  {
    category: "Privacy Practices",
    subtitle: "§164.520(b)(1) Final Rule",
    description: "Notice requirements and consent procedures for PHI handling",
    icon: <FileText className="h-5 w-5" />,
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
    requirements: [
      "Notice of Privacy Practices distribution",
      "Consent and authorization procedures",
      "Minimum necessary standard implementation",
      "Uses and disclosures documentation",
    ],
  },
  {
    category: "Breach Notification",
    subtitle: "§164.400, §164.404 Final Rule",
    description: "Requirements for breach assessment, notification, and reporting",
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
    requirements: [
      "Breach assessment and risk evaluation",
      "Individual notification within 60 days",
      "Media notification for large breaches (500+)",
      "HHS notification within 60 days",
      "Business associate breach notification",
      "Annual summary for smaller breaches",
    ],
  },
]

export function HIPAAStandards() {
  const totalRequirements = HIPAA_STANDARD_CATEGORIES.reduce((sum, category) => sum + category.requirements.length, 0)

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-xl flex items-center gap-3">
            <Shield className="h-6 w-6" />
            HIPAA Compliance Standards (2025)
          </CardTitle>
          <CardDescription className="text-blue-100">
            Complete reference of {totalRequirements} HIPAA requirements used for compliance analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HIPAA_STANDARD_CATEGORIES.map((category, index) => (
              <Card key={index} className={`${category.color} border`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className={category.iconColor}>{category.icon}</div>
                    <div>
                      <div>{category.category}</div>
                      <div className="text-xs font-normal text-gray-600 mt-1">{category.subtitle}</div>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                  <Badge variant="outline" className="w-fit text-xs">
                    {category.requirements.length} requirements
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.requirements.map((requirement, reqIndex) => (
                      <div key={reqIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Analysis Methodology</h4>
            <p className="text-sm text-blue-700">
              Our analysis examines your privacy policy against these {totalRequirements} HIPAA requirements using
              keyword detection, contextual analysis, and compliance pattern matching. Each requirement is evaluated for
              presence, completeness, and adherence to current HIPAA standards as specified in the Final Rule.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
