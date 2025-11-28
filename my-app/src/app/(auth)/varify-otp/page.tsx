"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import VerifyOtp from "@/components/auth/VerifyOtp";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading OTP...</div>}>
      <VerifyOtp />
    </Suspense>
  );
}
