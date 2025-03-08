//@ts-nocheck
"use client";
import { useAuth } from "./lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login"); // Redirect to login
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>;

  return <>{children}</>;
}
