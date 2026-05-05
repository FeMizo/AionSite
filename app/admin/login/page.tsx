import type { Metadata } from "next";
import { LoginForm } from "@/src/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Acceso Admin | AionSite",
  description: "Inicio de sesión para el panel de administración de AionSite.",
};

export default function AdminLoginPage() {
  return <LoginForm />;
}
