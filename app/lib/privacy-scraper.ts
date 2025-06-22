import * as cheerio from "cheerio"

export async function scrapePrivacyPolicy(url: string): Promise<string | null> {
  try {
    // First, try to fetch the main page to look for privacy policy links
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HIPAA-Compliance-Checker/1.0)",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Common privacy policy link patterns
    const privacyLinkSelectors = [
      'a[href*="privacy"]',
      'a[href*="Privacy"]',
      'a[href*="PRIVACY"]',
      'a:contains("Privacy Policy")',
      'a:contains("Privacy")',
      'a:contains("privacy policy")',
      'a:contains("privacy")',
    ]

    let privacyUrl = null

    // Try to find privacy policy link
    for (const selector of privacyLinkSelectors) {
      const link = $(selector).first()
      if (link.length > 0) {
        const href = link.attr("href")
        if (href) {
          privacyUrl = new URL(href, url).toString()
          break
        }
      }
    }

    // If no privacy link found, check if current page is privacy policy
    if (!privacyUrl) {
      const pageTitle = $("title").text().toLowerCase()
      const pageContent = $("body").text().toLowerCase()

      if (
        pageTitle.includes("privacy") ||
        pageContent.includes("privacy policy") ||
        pageContent.includes("personal information") ||
        pageContent.includes("data collection")
      ) {
        privacyUrl = url
      }
    }

    if (!privacyUrl) {
      // Try common privacy policy URLs
      const commonPaths = ["/privacy", "/privacy-policy", "/privacy.html", "/legal/privacy", "/terms/privacy"]

      for (const path of commonPaths) {
        try {
          const testUrl = new URL(path, url).toString()
          const testResponse = await fetch(testUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; HIPAA-Compliance-Checker/1.0)",
            },
          })

          if (testResponse.ok) {
            privacyUrl = testUrl
            break
          }
        } catch {
          continue
        }
      }
    }

    if (!privacyUrl) {
      return null
    }

    // Fetch the privacy policy page
    const privacyResponse = await fetch(privacyUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HIPAA-Compliance-Checker/1.0)",
      },
    })

    if (!privacyResponse.ok) {
      return null
    }

    const privacyHtml = await privacyResponse.text()
    const privacy$ = cheerio.load(privacyHtml)

    // Remove script and style elements
    privacy$("script, style, nav, header, footer").remove()

    // Extract text content
    const privacyText = privacy$("body").text().replace(/\s+/g, " ").trim()

    return privacyText.length > 100 ? privacyText : null
  } catch (error) {
    console.error("Error scraping privacy policy:", error)
    return null
  }
}
