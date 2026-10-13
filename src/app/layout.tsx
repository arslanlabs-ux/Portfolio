import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { site } from "@/data/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description:
    "PCB design and embedded systems engineering. Schematic capture, multi-layer PCB layout, DRC and manufacturing outputs in Altium Designer and KiCad, with ESP32 and STM32 embedded integration.",
  keywords: [
    "PCB design",
    "PCB layout",
    "Altium Designer",
    "KiCad",
    "embedded systems",
    "ESP32",
    "STM32",
    "electronics engineering",
    "schematic capture",
    "Gerber files",
    "freelance PCB designer",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.role}`,
    description:
      "Manufacturing-ready PCB design and embedded hardware engineering: schematic capture, multi-layer layout, DRC and production outputs.",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description:
      "Manufacturing-ready PCB design and embedded hardware engineering: schematic capture, multi-layer layout, DRC and production outputs.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0c" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The inline script below stamps `data-theme` on this element before
      // React hydrates it, so the attribute will not match the server output.
      suppressHydrationWarning
      className={`${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body
        // Browser extensions (ColorZilla's `cz-shortcut-listen`, Grammarly,
        // password managers) stamp attributes onto <body> before React
        // hydrates. Nothing here is dynamic, so the only mismatches this can
        // hide are ones an extension caused.
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-ink"
      >
        {/*
          Applies a stored theme choice before the first paint. Without it a
          visitor who picked light would see a dark flash on every navigation.
          With no stored choice this does nothing and the CSS `color-scheme`
          follows the operating system.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
