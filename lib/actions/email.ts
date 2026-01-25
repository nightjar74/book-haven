export const runtime = "nodejs";

import { sendEmail } from "../workflow";

export async function handleReplyEmail(formData: {
  email: string;
  subject: string;
  message: string;
}) {
  try {
    //console.log("email sent");
    throw new Error("Intentionally failed to send email");
    await sendEmail({
      email: formData.email,
      subject: formData.subject,
      message: `<div style="font-family: sans-serif;">${formData.message}</div>`,
    });
    return { success: true };
  } catch (error) {
    console.error("QStash Error:", error);
    return { success: false, error: "Failed to queue email" };
  }
}
