import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Next.js এর ডিফল্ট API রাউটের সাথে কানেক্ট থাকার জন্য বেস ইউআরএল উইন্ডো অরিজিন বা লোকালহোসট দিতে হয়
  baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
});

export const { 
    signIn, 
    signUp, 
    useSession, 
    forgetPassword, 
    resetPassword 
} = authClient;