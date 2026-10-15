
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "টোকেন ও নতুন পাসওয়ার্ড দিতে হবে।" },
        { status: 400 }
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json(
        { message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।" },
        { status: 400 }
      );
    }

    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "রিসেট টোকেনটি ভুল, মেয়াদোত্তীর্ণ অথবা ইতিমধ্যে ব্যবহার করা হয়েছে।",
      },
      { status: 400 }
    );
  }
}
