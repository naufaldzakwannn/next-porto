import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    console.log(name, email, message);

    const data = await resend.emails.send({
      from: "Portfolio <noreply@resend.dev>",
      to: ["naufaldzakwan189@gmail.com"],
      subject: `Pesan dari ${name}`,
      html: `
        <h3>Pesan baru dari website portfolio</h3>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
