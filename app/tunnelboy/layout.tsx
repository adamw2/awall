import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TunnelBoy — Vault-Grade AWS Tunneling",
  description:
    "AWS VPC tunneling CLI with Pip-Boy theming. Securely connect to RDS, OpenSearch, and EC2 through SSM Session Manager. Install via Homebrew.",
  icons: { icon: "/tunnelboy-favicon.png" },
};

export default function TunnelBoyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#0a0f0a] font-mono text-[#00ff41] antialiased">
      {children}
    </div>
  );
}
