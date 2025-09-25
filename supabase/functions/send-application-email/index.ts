// Supabase Edge Function: send-application-email
// Uses Resend API to send an email notification to HR when a job application is submitted.
// Store your API key and default HR email in Supabase secrets:
// supabase secrets set RESEND_API_KEY=your_resend_api_key HR_EMAIL=hr@example.com

import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

interface ApplicantInfo {
  name: string;
  email: string;
  phone?: string;
  experience?: string;
  coverLetter?: string;
  resumeUrl?: string | null;
}

interface PositionInfo {
  id: number | string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  console.log("RESEND_API_KEY length:", RESEND_API_KEY ? RESEND_API_KEY.length : "null");
  const DEFAULT_HR_EMAIL = Deno.env.get("HR_EMAIL");
  console.log("DEFAULT_HR_EMAIL:", DEFAULT_HR_EMAIL);

  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing RESEND_API_KEY secret" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const body = await req.json();
    const {
      recipient, // optional override for testing
      applicant,
      position,
    }: { recipient?: string; applicant: ApplicantInfo; position: PositionInfo } = body;

    const to = recipient || DEFAULT_HR_EMAIL;
    if (!to) {
      return new Response(
        JSON.stringify({ error: "Recipient email not provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const subject = `New Job Application: ${position.title} – ${applicant.name}`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin-bottom: 8px;">New Job Application Received</h2>
        <p style="margin: 0 0 16px 0;">A new application has been submitted via the careers page.</p>
        <h3 style="margin: 12px 0 6px 0;">Position</h3>
        <ul style="margin: 0 0 12px 18px;">
          <li><strong>Title:</strong> ${escapeHtml(position.title)}</li>
          ${position.department ? `<li><strong>Department:</strong> ${escapeHtml(position.department)}</li>` : ""}
          ${position.location ? `<li><strong>Location:</strong> ${escapeHtml(position.location)}</li>` : ""}
          ${position.type ? `<li><strong>Type:</strong> ${escapeHtml(position.type)}</li>` : ""}
        </ul>
        <h3 style="margin: 12px 0 6px 0;">Applicant Details</h3>
        <ul style="margin: 0 0 12px 18px;">
          <li><strong>Name:</strong> ${escapeHtml(applicant.name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(applicant.email)}</li>
          ${applicant.phone ? `<li><strong>Phone:</strong> ${escapeHtml(applicant.phone)}</li>` : ""}
          ${applicant.experience ? `<li><strong>Experience:</strong> ${escapeHtml(applicant.experience)}</li>` : ""}
        </ul>
        ${applicant.coverLetter ? `
          <h3 style="margin: 12px 0 6px 0;">Cover Letter</h3>
          <div style="white-space: pre-wrap; background:#f1f5f9; padding:12px; border-radius:8px;">${escapeHtml(applicant.coverLetter)}</div>
        ` : ""}
        ${applicant.resumeUrl ? `
          <p style="margin-top: 16px;"><a href="${applicant.resumeUrl}" target="_blank" rel="noopener noreferrer">View Resume</a></p>
        ` : ""}
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 12px; color: #475569;">This email was sent automatically by the ATICOM Careers portal.</p>
      </div>
    `;

    const text = `New Job Application\n\n` +
      `Position: ${position.title}\n` +
      (position.department ? `Department: ${position.department}\n` : "") +
      (position.location ? `Location: ${position.location}\n` : "") +
      (position.type ? `Type: ${position.type}\n` : "") +
      `\nApplicant\n` +
      `Name: ${applicant.name}\n` +
      `Email: ${applicant.email}\n` +
      (applicant.phone ? `Phone: ${applicant.phone}\n` : "") +
      (applicant.experience ? `Experience: ${applicant.experience}\n` : "") +
      (applicant.coverLetter ? `\nCover Letter:\n${applicant.coverLetter}\n` : "") +
      (applicant.resumeUrl ? `\nResume: ${applicant.resumeUrl}\n` : "");

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Use Resend's test sender to avoid domain verification during testing
        from: "ATICOM Careers <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
        text,
      }),
    });

    const result = await resendResp.json();

    if (!resendResp.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: result }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});

function escapeHtml(str?: string) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
