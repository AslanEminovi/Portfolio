import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Add Poppins font
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "SynQuad - Aslan Eminovi",
  description: "Comprehensive SEO optimization, cutting-edge website development, targeted advertisements, and digital solutions to help your business thrive. Aslan Eminovi, Aslan, Eminovi, AslanEminovi, EMINOVIASLAN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <meta name="description" content="Comprehensive SEO optimization, cutting-edge website development, targeted advertisements, and digital solutions to help your business thrive. Aslan Eminovi, Aslan, Eminovi, AslanEminovi, EMINOVIASLAN" />
        <meta name="keywords" content="Aslan, Aslan Eminovi, aslan eminovi, aslan, eminovi, aslaneminovi, AslanEminovi, EMINOVIASLAN, eminovi aslan" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Person",
          "name": "Aslan Eminovi",
          "url": "http://www.synquad.com",
          "sameAs": [
            "http://www.facebook.com/aslaneminovi",
            "http://www.twitter.com/aslaneminovi",
            "http://www.linkedin.com/in/aslaneminovi"
          ],
          "jobTitle": "SEO Specialist",
          "worksFor": {
            "@type": "Organization",
            "name": "SynQuad"
          }
        })}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
