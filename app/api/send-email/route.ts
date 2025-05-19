import formidable, { File } from "formidable";
import fs from "fs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to convert NextRequest to Node.js IncomingMessage for formidable
import { IncomingMessage } from "http";

// Helper to convert NextRequest to Node.js IncomingMessage for formidable
async function parseFormData(request: Request): Promise<{
  fields: formidable.Fields;
  files: formidable.Files;
}> {
  const form = formidable({ multiples: false });

  const bodyBuffer = Buffer.from(await request.arrayBuffer());
  const stream = Readable.from(bodyBuffer);

  // Create a mock IncomingMessage
  const mockReq = Object.assign(stream, {
    headers: Object.fromEntries(request.headers),
    method: request.method,
    url: "", // optional but can be set if needed
  }) as IncomingMessage;

  return new Promise((resolve, reject) => {
    form.parse(mockReq, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: Request) {
  try {
    const { fields, files } = await parseFormData(req);

    const attachment = Array.isArray(files.attachment)
      ? files.attachment[0]
      : (files.attachment as File | undefined);

    if (!attachment) {
      return NextResponse.json(
        { error: "No attachment provided" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const filename = attachment.originalFilename || "attachment";
    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: "floriane.jnikebie@gmail.com",
      subject: Array.isArray(fields.title)
        ? fields.title[0]
        : fields.title || "Facture",
      text: Array.isArray(fields.content)
        ? fields.content[0]
        : fields.content || "",
      attachments: [
        {
          filename,
          content: fs.createReadStream(attachment.filepath),
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Sending failed" }, { status: 500 });
  }
}
