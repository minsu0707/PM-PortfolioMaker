import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, name, formData } = await request.json()

    // Email content
    const emailContent = `
      <h1>Hello ${name},</h1>
      <p>Your portfolio has been successfully created!</p>
      
      <h2>Your Information:</h2>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Major:</strong> ${formData.major}</p>
      <p><strong>Bio:</strong> ${formData.bio}</p>
      
      <h2>Projects:</h2>
      ${formData.projects.map((p: any) => `<p><strong>${p.title}</strong> - ${p.period}</p>`).join("")}
      
      <p>You can view and download your portfolio anytime by visiting our platform.</p>
    `

    // For now, return success
    // In production, integrate with SendGrid, Resend, or similar service
    console.log("Email would be sent to:", to)
    console.log("Content:", emailContent)

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
