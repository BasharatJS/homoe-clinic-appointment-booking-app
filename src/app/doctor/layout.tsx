import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Dashboard - Family Homeo Clinic",
  description: "Secure doctor portal for managing appointments and patient care at Family Homeo Clinic.",
};

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}