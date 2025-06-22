interface HIPAARequirement {
  category: string
  requirement: string
  description: string
  keywords: string[]
  requiredKeywords: string[]
  priority: "critical" | "important" | "recommended"
  recommendations: string[]
  complianceNote: string
}

const HIPAA_2025_REQUIREMENTS: HIPAARequirement[] = [
  // Administrative Safeguards
  {
    category: "Administrative Safeguards",
    requirement: "Security Officer designation and responsibilities",
    description:
      "Assign a security officer responsible for developing and implementing security policies and procedures",
    keywords: [
      "security officer",
      "privacy officer",
      "security administrator",
      "hipaa officer",
      "compliance officer",
      "designated security",
    ],
    requiredKeywords: ["security", "officer"],
    priority: "critical",
    recommendations: [
      "Designate privacy officer and complaint procedures",
      "Clearly identify privacy officer contact information and establish formal complaint procedures",
      "Document the Security Officer's role and responsibilities in your privacy policy",
    ],
    complianceNote: "Security Officer designation is not clearly specified in the privacy policy",
  },
  {
    category: "Administrative Safeguards",
    requirement: "Workforce training and access management procedures",
    description: "Implement procedures for authorizing access to PHI and training workforce members",
    keywords: [
      "workforce training",
      "employee training",
      "access authorization",
      "staff training",
      "hipaa training",
      "privacy training",
      "access management",
    ],
    requiredKeywords: ["training", "workforce"],
    priority: "critical",
    recommendations: [
      "Enhance security framework documentation",
      "Add comprehensive details about technical, physical, and administrative safeguards used to protect PHI",
      "Implement comprehensive HIPAA training programs for all workforce members",
    ],
    complianceNote: "Workforce training and access management procedures are not documented",
  },
  {
    category: "Administrative Safeguards",
    requirement: "Information access management controls",
    description: "Implement procedures to authorize access to PHI based on job responsibilities",
    keywords: [
      "access management",
      "information access",
      "job responsibilities",
      "access controls",
      "authorization procedures",
    ],
    requiredKeywords: ["access", "management"],
    priority: "important",
    recommendations: [
      "Establish procedures for authorizing PHI access based on job responsibilities",
      "Document access control policies and procedures",
      "Implement role-based access controls",
    ],
    complianceNote: "Information access management controls are not specified",
  },
  {
    category: "Administrative Safeguards",
    requirement: "Security awareness and training programs",
    description: "Implement security awareness and training programs for workforce members",
    keywords: ["security awareness", "training programs", "security training", "awareness programs", "hipaa education"],
    requiredKeywords: ["security", "training"],
    priority: "important",
    recommendations: [
      "Implement regular security awareness training programs",
      "Document training completion and maintain training records",
      "Establish ongoing security education initiatives",
    ],
    complianceNote: "Security awareness and training programs are not documented",
  },
  {
    category: "Administrative Safeguards",
    requirement: "Security incident procedures and response",
    description: "Establish procedures for responding to security incidents and breaches",
    keywords: ["security incident", "incident response", "breach response", "incident procedures", "security breach"],
    requiredKeywords: ["incident", "security"],
    priority: "critical",
    recommendations: [
      "Establish breach notification procedures",
      "Document clear procedures for breach assessment, notification timelines, and reporting requirements",
      "Implement incident response procedures for unauthorized access",
    ],
    complianceNote: "Security incident procedures and response are not addressed",
  },
  {
    category: "Administrative Safeguards",
    requirement: "Contingency plan for emergency access",
    description: "Establish procedures for emergency access to PHI during system failures",
    keywords: [
      "contingency plan",
      "emergency access",
      "disaster recovery",
      "emergency procedures",
      "business continuity",
    ],
    requiredKeywords: ["contingency", "emergency"],
    priority: "critical",
    recommendations: [
      "Develop comprehensive contingency plans for system failures and emergencies",
      "Implement regular data backup procedures with secure storage",
      "Test contingency plans regularly and document test results",
    ],
    complianceNote: "Contingency planning and emergency procedures are not addressed",
  },
  {
    category: "Administrative Safeguards",
    requirement: "Regular security evaluations and assessments",
    description: "Conduct regular security evaluations and risk assessments",
    keywords: [
      "security evaluations",
      "risk assessments",
      "security assessments",
      "regular evaluations",
      "security reviews",
    ],
    requiredKeywords: ["security", "evaluations"],
    priority: "important",
    recommendations: [
      "Implement regular security evaluations and risk assessments",
      "Document security assessment procedures and findings",
      "Establish periodic review of security measures",
    ],
    complianceNote: "Regular security evaluations and assessments are not specified",
  },
  {
    category: "Administrative Safeguards",
    requirement: "Business associate agreement management",
    description: "Manage business associate agreements and relationships",
    keywords: [
      "business associate",
      "baa",
      "vendor agreements",
      "third party agreements",
      "business associate agreement",
    ],
    requiredKeywords: ["business", "associate"],
    priority: "critical",
    recommendations: [
      "Document business associate relationships",
      "Clearly describe how business associates are managed and their obligations regarding PHI protection",
      "Execute compliant Business Associate Agreements with all business associates",
    ],
    complianceNote: "Business associate agreement management is not addressed",
  },

  // Physical Safeguards
  {
    category: "Physical Safeguards",
    requirement: "Facility access controls and visitor management",
    description: "Implement physical access controls to facilities containing PHI",
    keywords: ["facility access", "physical security", "visitor management", "building security", "access controls"],
    requiredKeywords: ["facility", "access"],
    priority: "critical",
    recommendations: [
      "Implement physical access controls to facilities containing PHI",
      "Use key cards, biometric systems, or other secure access methods",
      "Maintain visitor logs and escort procedures for non-employees",
    ],
    complianceNote: "Facility access controls and visitor management are not described",
  },
  {
    category: "Physical Safeguards",
    requirement: "Workstation use restrictions and positioning",
    description: "Implement physical safeguards for workstations that access PHI",
    keywords: [
      "workstation restrictions",
      "workstation positioning",
      "computer security",
      "workstation use",
      "physical workstation",
    ],
    requiredKeywords: ["workstation", "restrictions"],
    priority: "important",
    recommendations: [
      "Position workstations to minimize unauthorized viewing of PHI",
      "Implement workstation use restrictions and positioning guidelines",
      "Establish clear desk policies for areas where PHI is accessed",
    ],
    complianceNote: "Workstation use restrictions and positioning are not specified",
  },
  {
    category: "Physical Safeguards",
    requirement: "Device and media controls for PHI storage",
    description: "Implement controls for devices and media containing PHI",
    keywords: ["device controls", "media controls", "phi storage", "device management", "media management"],
    requiredKeywords: ["device", "media"],
    priority: "important",
    recommendations: [
      "Implement secure procedures for disposing of devices and media containing PHI",
      "Use certified data destruction methods for all storage devices",
      "Maintain inventory of all devices that access or store PHI",
    ],
    complianceNote: "Device and media controls for PHI storage are not documented",
  },
  {
    category: "Physical Safeguards",
    requirement: "Proper disposal and reuse of PHI media",
    description: "Ensure proper disposal and reuse procedures for PHI-containing media",
    keywords: ["proper disposal", "media reuse", "phi disposal", "secure disposal", "media destruction"],
    requiredKeywords: ["disposal", "media"],
    priority: "important",
    recommendations: [
      "Implement proper disposal and reuse procedures for PHI media",
      "Use certified data destruction methods",
      "Document disposal procedures and maintain disposal records",
    ],
    complianceNote: "Proper disposal and reuse of PHI media procedures are not specified",
  },
  {
    category: "Physical Safeguards",
    requirement: "Workstation security and screen locks",
    description: "Implement security measures for workstations accessing PHI",
    keywords: ["workstation security", "screen locks", "automatic locks", "session timeouts", "workstation protection"],
    requiredKeywords: ["workstation", "security"],
    priority: "important",
    recommendations: [
      "Implement automatic screen locks and session timeouts",
      "Secure workstations with locks or other physical security measures",
      "Establish workstation security policies and procedures",
    ],
    complianceNote: "Workstation security and screen locks are not addressed",
  },
  {
    category: "Physical Safeguards",
    requirement: "Physical access logging and monitoring",
    description: "Implement logging and monitoring of physical access to PHI areas",
    keywords: [
      "access logging",
      "physical monitoring",
      "access logs",
      "monitoring systems",
      "physical access tracking",
    ],
    requiredKeywords: ["access", "logging"],
    priority: "important",
    recommendations: [
      "Implement physical access logging and monitoring systems",
      "Maintain logs of physical access to areas containing PHI",
      "Regularly review physical access logs for unauthorized access",
    ],
    complianceNote: "Physical access logging and monitoring are not specified",
  },

  // Technical Safeguards
  {
    category: "Technical Safeguards",
    requirement: "Access control with unique user identification",
    description: "Implement technical access controls with unique user identification",
    keywords: ["access control", "unique identification", "user identification", "login security", "authentication"],
    requiredKeywords: ["access", "identification"],
    priority: "critical",
    recommendations: [
      "Implement multi-factor authentication for all PHI access",
      "Use role-based access controls to limit PHI access to minimum necessary",
      "Assign unique user identification for each person accessing PHI",
    ],
    complianceNote: "Access control with unique user identification is not detailed",
  },
  {
    category: "Technical Safeguards",
    requirement: "Audit controls and comprehensive logging",
    description: "Implement comprehensive audit controls and logging mechanisms",
    keywords: ["audit controls", "comprehensive logging", "access logs", "audit trails", "system logs"],
    requiredKeywords: ["audit", "logging"],
    priority: "critical",
    recommendations: [
      "Implement comprehensive audit logging for all PHI access and modifications",
      "Regularly review audit logs for unauthorized access attempts",
      "Maintain audit logs for the required retention period",
    ],
    complianceNote: "Audit controls and comprehensive logging are not specified",
  },
  {
    category: "Technical Safeguards",
    requirement: "Integrity controls for PHI modification",
    description: "Implement controls to ensure PHI integrity and prevent unauthorized modification",
    keywords: ["integrity controls", "phi modification", "data integrity", "data validation", "integrity protection"],
    requiredKeywords: ["integrity", "controls"],
    priority: "important",
    recommendations: [
      "Implement data integrity controls to prevent unauthorized alteration of PHI",
      "Use checksums, digital signatures, or other validation methods",
      "Establish procedures for detecting and responding to data integrity issues",
    ],
    complianceNote: "Integrity controls for PHI modification are not addressed",
  },
  {
    category: "Technical Safeguards",
    requirement: "Person or entity authentication systems",
    description: "Implement authentication systems to verify user identity",
    keywords: [
      "entity authentication",
      "authentication systems",
      "identity verification",
      "user authentication",
      "authentication controls",
    ],
    requiredKeywords: ["authentication", "systems"],
    priority: "critical",
    recommendations: [
      "Implement strong authentication systems to verify user identity",
      "Use multi-factor authentication for enhanced security",
      "Establish authentication policies and procedures",
    ],
    complianceNote: "Person or entity authentication systems are not documented",
  },
  {
    category: "Technical Safeguards",
    requirement: "Transmission security and encryption",
    description: "Implement security measures for PHI transmission over networks",
    keywords: ["transmission security", "encryption", "secure transmission", "tls", "ssl", "encrypted communication"],
    requiredKeywords: ["transmission", "security"],
    priority: "critical",
    recommendations: [
      "Encrypt all PHI transmitted over public networks using strong encryption",
      "Use secure protocols (TLS 1.3 or higher) for all PHI transmissions",
      "Implement end-to-end encryption for sensitive communications",
    ],
    complianceNote: "Transmission security and encryption measures are not documented",
  },
  {
    category: "Technical Safeguards",
    requirement: "Automatic logoff for inactive sessions",
    description: "Implement automatic logoff for inactive sessions accessing PHI",
    keywords: ["automatic logoff", "inactive sessions", "session timeout", "automatic logout", "session management"],
    requiredKeywords: ["automatic", "logoff"],
    priority: "important",
    recommendations: [
      "Implement automatic logoff for inactive sessions",
      "Configure appropriate session timeout periods",
      "Establish session management policies and procedures",
    ],
    complianceNote: "Automatic logoff for inactive sessions is not specified",
  },
  {
    category: "Technical Safeguards",
    requirement: "Encryption and decryption capabilities",
    description: "Implement encryption and decryption capabilities for PHI protection",
    keywords: ["encryption capabilities", "decryption", "data encryption", "phi encryption", "cryptographic controls"],
    requiredKeywords: ["encryption", "decryption"],
    priority: "critical",
    recommendations: [
      "Implement strong encryption and decryption capabilities",
      "Use industry-standard encryption algorithms (AES-256 or equivalent)",
      "Establish encryption key management procedures",
    ],
    complianceNote: "Encryption and decryption capabilities are not addressed",
  },

  // Individual Rights
  {
    category: "Individual Rights",
    requirement: "Right to access PHI within 30 days",
    description: "Provide individuals with timely access to their PHI",
    keywords: ["right to access", "phi access", "30 days", "individual access", "patient access"],
    requiredKeywords: ["access", "phi"],
    priority: "critical",
    recommendations: [
      "Clarify individual rights and access procedures",
      "Provide clear information about patient rights to access, amend, and restrict use of their PHI",
      "Establish procedures for individuals to access their PHI within 30 days",
    ],
    complianceNote: "Right to access PHI within 30 days is not clearly defined",
  },
  {
    category: "Individual Rights",
    requirement: "Right to amend inaccurate PHI",
    description: "Provide individuals with the right to request amendments to their PHI",
    keywords: ["right to amend", "inaccurate phi", "amendment procedures", "phi correction", "data correction"],
    requiredKeywords: ["amend", "phi"],
    priority: "critical",
    recommendations: [
      "Implement procedures for individuals to request amendments to their PHI",
      "Establish timelines and procedures for processing amendment requests",
      "Document amendment procedures in your privacy policy",
    ],
    complianceNote: "Right to amend inaccurate PHI is not documented",
  },
  {
    category: "Individual Rights",
    requirement: "Right to accounting of disclosures",
    description: "Provide individuals with an accounting of PHI disclosures",
    keywords: ["accounting of disclosures", "disclosure accounting", "phi disclosures", "disclosure tracking"],
    requiredKeywords: ["accounting", "disclosures"],
    priority: "important",
    recommendations: [
      "Implement procedures for providing accounting of PHI disclosures",
      "Maintain records of all PHI disclosures for accounting purposes",
      "Establish procedures for responding to accounting requests",
    ],
    complianceNote: "Right to accounting of disclosures is not specified",
  },
  {
    category: "Individual Rights",
    requirement: "Right to request restrictions on use/disclosure",
    description: "Allow individuals to request restrictions on PHI use and disclosure",
    keywords: ["request restrictions", "use restrictions", "disclosure restrictions", "phi restrictions"],
    requiredKeywords: ["restrictions", "use"],
    priority: "important",
    recommendations: [
      "Implement procedures for individuals to request restrictions on PHI use and disclosure",
      "Establish policies for evaluating and responding to restriction requests",
      "Document restriction procedures in your privacy policy",
    ],
    complianceNote: "Right to request restrictions on use/disclosure is not addressed",
  },
  {
    category: "Individual Rights",
    requirement: "Right to confidential communications",
    description: "Provide individuals with the right to request confidential communications",
    keywords: [
      "confidential communications",
      "alternative communications",
      "communication preferences",
      "private communications",
    ],
    requiredKeywords: ["confidential", "communications"],
    priority: "important",
    recommendations: [
      "Implement procedures for confidential communications requests",
      "Provide alternative communication methods when requested",
      "Establish policies for handling confidential communication preferences",
    ],
    complianceNote: "Right to confidential communications is not documented",
  },
  {
    category: "Individual Rights",
    requirement: "Right to file complaints without retaliation",
    description: "Allow individuals to file complaints about privacy practices without retaliation",
    keywords: ["file complaints", "complaint procedures", "no retaliation", "privacy complaints", "complaint process"],
    requiredKeywords: ["complaints", "retaliation"],
    priority: "important",
    recommendations: [
      "Establish clear complaint procedures without retaliation",
      "Provide multiple channels for filing privacy complaints",
      "Document complaint handling procedures and non-retaliation policies",
    ],
    complianceNote: "Right to file complaints without retaliation is not specified",
  },
  {
    category: "Individual Rights",
    requirement: "Right to receive notice of privacy practices",
    description: "Provide individuals with notice of privacy practices",
    keywords: ["notice of privacy practices", "privacy notice", "npp", "privacy practices notice"],
    requiredKeywords: ["notice", "privacy"],
    priority: "critical",
    recommendations: [
      "Improve explicit mention of protected health information (PHI)",
      "Clearly define and explicitly mention PHI collection, use, and disclosure practices in your privacy policy",
      "Provide comprehensive Notice of Privacy Practices to all patients",
    ],
    complianceNote: "Right to receive notice of privacy practices is not provided or incomplete",
  },

  // Privacy Practices
  {
    category: "Privacy Practices",
    requirement: "Notice of Privacy Practices distribution",
    description: "Distribute Notice of Privacy Practices to all patients",
    keywords: ["npp distribution", "privacy practices distribution", "notice distribution", "patient notice"],
    requiredKeywords: ["notice", "distribution"],
    priority: "critical",
    recommendations: [
      "Establish procedures for distributing Notice of Privacy Practices",
      "Ensure all patients receive the notice at first service delivery",
      "Make the notice easily accessible on your website and in physical locations",
    ],
    complianceNote: "Notice of Privacy Practices distribution procedures are not documented",
  },
  {
    category: "Privacy Practices",
    requirement: "Consent and authorization procedures",
    description: "Implement consent and authorization procedures for PHI use and disclosure",
    keywords: [
      "consent procedures",
      "authorization procedures",
      "phi consent",
      "patient consent",
      "authorization forms",
    ],
    requiredKeywords: ["consent", "authorization"],
    priority: "critical",
    recommendations: [
      "Implement comprehensive consent and authorization procedures",
      "Develop appropriate authorization forms for PHI disclosures",
      "Establish procedures for obtaining and documenting patient consent",
    ],
    complianceNote: "Consent and authorization procedures are not specified",
  },
  {
    category: "Privacy Practices",
    requirement: "Minimum necessary standard implementation",
    description: "Implement minimum necessary standard for PHI use and disclosure",
    keywords: ["minimum necessary", "limited access", "need to know", "minimum required", "necessary standard"],
    requiredKeywords: ["minimum", "necessary"],
    priority: "important",
    recommendations: [
      "Implement policies to limit PHI access to the minimum necessary for job functions",
      "Regularly review and update access permissions based on job responsibilities",
      "Train workforce members on minimum necessary requirements",
    ],
    complianceNote: "Minimum necessary standard implementation is not described",
  },
  {
    category: "Privacy Practices",
    requirement: "Uses and disclosures documentation",
    description: "Document all uses and disclosures of PHI",
    keywords: ["uses documentation", "disclosures documentation", "phi uses", "phi disclosures", "disclosure tracking"],
    requiredKeywords: ["uses", "disclosures"],
    priority: "important",
    recommendations: [
      "Document all permitted uses and disclosures of PHI",
      "Maintain comprehensive records of PHI uses and disclosures",
      "Establish procedures for tracking and documenting PHI disclosures",
    ],
    complianceNote: "Uses and disclosures documentation is not addressed",
  },

  // Breach Notification
  {
    category: "Breach Notification",
    requirement: "Breach assessment and risk evaluation",
    description: "Implement procedures for breach assessment and risk evaluation",
    keywords: ["breach assessment", "risk evaluation", "breach analysis", "security incident assessment"],
    requiredKeywords: ["breach", "assessment"],
    priority: "critical",
    recommendations: [
      "Develop comprehensive breach assessment and risk evaluation procedures",
      "Train workforce members to identify and report potential security incidents",
      "Establish procedures for investigating and documenting security incidents",
    ],
    complianceNote: "Breach assessment and risk evaluation procedures are not specified",
  },
  {
    category: "Breach Notification",
    requirement: "Individual notification within 60 days",
    description: "Notify affected individuals of breaches within 60 days",
    keywords: ["individual notification", "60 days", "patient notification", "breach notice", "notification timeline"],
    requiredKeywords: ["notification", "60"],
    priority: "critical",
    recommendations: [
      "Establish procedures for notifying individuals of breaches within 60 days",
      "Include all required elements in breach notification letters",
      "Provide substitute notice methods when individual contact information is insufficient",
    ],
    complianceNote: "Individual notification within 60 days procedures are not documented",
  },
  {
    category: "Breach Notification",
    requirement: "Media notification for large breaches (500+)",
    description: "Notify media for breaches affecting 500 or more individuals",
    keywords: ["media notification", "large breaches", "500 individuals", "media notice", "public notification"],
    requiredKeywords: ["media", "notification"],
    priority: "critical",
    recommendations: [
      "Establish procedures for media notification of large breaches (500+ individuals)",
      "Develop media notification templates and procedures",
      "Coordinate media notifications with other breach notification requirements",
    ],
    complianceNote: "Media notification for large breaches procedures are not specified",
  },
  {
    category: "Breach Notification",
    requirement: "HHS notification within 60 days",
    description: "Notify HHS of breaches within 60 days",
    keywords: ["hhs notification", "department notification", "government notification", "regulatory notification"],
    requiredKeywords: ["hhs", "notification"],
    priority: "critical",
    recommendations: [
      "Establish procedures for notifying HHS of breaches within 60 days",
      "Use appropriate HHS notification forms and procedures",
      "Maintain records of all HHS breach notifications",
    ],
    complianceNote: "HHS notification within 60 days procedures are not documented",
  },
  {
    category: "Breach Notification",
    requirement: "Business associate breach notification",
    description: "Implement procedures for business associate breach notification",
    keywords: ["business associate breach", "ba notification", "vendor breach", "third party breach"],
    requiredKeywords: ["business", "breach"],
    priority: "important",
    recommendations: [
      "Establish procedures for business associate breach notification",
      "Include breach notification requirements in Business Associate Agreements",
      "Implement procedures for responding to business associate breach notifications",
    ],
    complianceNote: "Business associate breach notification procedures are not addressed",
  },
  {
    category: "Breach Notification",
    requirement: "Annual summary for smaller breaches",
    description: "Provide annual summary of smaller breaches to HHS",
    keywords: ["annual summary", "smaller breaches", "yearly report", "breach summary"],
    requiredKeywords: ["annual", "summary"],
    priority: "important",
    recommendations: [
      "Implement procedures for annual summary reporting of smaller breaches",
      "Maintain records of all breaches for annual summary reporting",
      "Establish procedures for submitting annual breach summaries to HHS",
    ],
    complianceNote: "Annual summary for smaller breaches procedures are not specified",
  },
]

export async function checkHIPAACompliance(privacyPolicyText: string) {
  // Normalize text for consistent analysis
  const text = privacyPolicyText.toLowerCase().trim()
  const findings = []

  for (const requirement of HIPAA_2025_REQUIREMENTS) {
    // Deterministic keyword matching
    const hasRequiredKeywords = requirement.requiredKeywords.every((keyword) => text.includes(keyword.toLowerCase()))

    // Count matching keywords (deterministic)
    const matchingKeywords = requirement.keywords.filter((keyword) => text.includes(keyword.toLowerCase()))
    const matchCount = matchingKeywords.length

    let status: "present" | "partial" | "missing"
    let details = ""
    let recommendations: string[] = []

    // Deterministic status assignment
    if (hasRequiredKeywords && matchCount >= 3) {
      status = "present"
      details = `✅ Requirement addressed: Found comprehensive coverage with ${matchCount} relevant indicators.`
      recommendations = []
    } else if (hasRequiredKeywords && matchCount >= 2) {
      status = "partial"
      details = `⚠️ Requirement partially addressed: Found ${matchCount} relevant indicators, but coverage could be more comprehensive.`
      recommendations = requirement.recommendations.slice(0, 2)
    } else if (matchCount >= 1) {
      status = "partial"
      details = `⚠️ Requirement minimally addressed: Found ${matchCount} relevant indicator(s), but significant improvements needed.`
      recommendations = requirement.recommendations.slice(0, 3)
    } else {
      status = "missing"
      details = `❌ Requirement not addressed: ${requirement.complianceNote}.`
      recommendations = requirement.recommendations
    }

    findings.push({
      category: requirement.category,
      requirement: requirement.requirement,
      description: requirement.description,
      status,
      details,
      recommendations,
      priority: requirement.priority,
      complianceNote: requirement.complianceNote,
    })
  }

  // Deterministic overall status calculation
  const criticalMissing = findings.filter((f) => f.priority === "critical" && f.status === "missing").length
  const criticalPartial = findings.filter((f) => f.priority === "critical" && f.status === "partial").length

  let overallStatus: "compliant" | "needs-attention" | "non-compliant"

  if (criticalMissing === 0 && criticalPartial <= 1) {
    overallStatus = "compliant"
  } else if (criticalMissing <= 2) {
    overallStatus = "needs-attention"
  } else {
    overallStatus = "non-compliant"
  }

  return {
    status: overallStatus,
    findings,
  }
}
