
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "সঠিক ইমেইল ঠিকানা দিন।" },
        { status: 400 }
      );
    }

    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/reset-password",
      },
    });

    return NextResponse.json({
      success: true,
      message: "অ্যাকাউন্ট থাকলে রিসেট ইমেইল পাঠানো হয়েছে।",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { message: "ইমেইল পাঠানো যায়নি। সেটিংস পরীক্ষা করুন।" },
      { status: 500 }
    );
  }
}
