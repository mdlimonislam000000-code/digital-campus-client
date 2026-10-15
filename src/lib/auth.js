
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const mongoUri = process.env.MONGODB_URI;
const authSecret = process.env.BETTER_AUTH_SECRET;
const authUrl =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is missing from .env.local");
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("EMAIL_USER or EMAIL_PASS is missing from .env.local");
}

const client = new MongoClient(mongoUri);
const db = client.db("digital-campus");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const auth = betterAuth({
  appName: "Digital Campus",

  database: mongodbAdapter(db),

  baseURL: authUrl,
  secret: authSecret,

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      await transporter.sendMail({
        from: {
          name: "Digital Campus",
          address: process.env.EMAIL_USER,
        },

        to: user.email,

        subject: "Digital Campus - Password Reset",

        html: `
          <div style="font-family:Arial,sans-serif;padding:24px;background:#f4f6f8;border-radius:10px;max-width:500px;margin:auto">
            <h2 style="color:#4f46e5">Password Recovery</h2>

            <p>Hello ${escapeHtml(user.name || "User")},</p>

            <p>
              You requested to reset your Digital Campus password.
              Click the button below to continue.
            </p>

            <a
              href="${escapeHtml(url)}"
              style="background:#4f46e5;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;display:inline-block"
            >
              Reset Password
            </a>

            <p style="margin-top:24px;font-size:12px;color:#666">
              If you did not request this, please ignore this email.
            </p>
          </div>
        `,
      });
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: true,
      },
    },
  },
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}
