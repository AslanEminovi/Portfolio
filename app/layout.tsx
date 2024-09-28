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
  title: "SynQuad",
  description: "Comprehensive SEO optimization, cutting-edge website development, targeted advertisements, and digital solutions to help your business thrive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
                  } else if (storedTheme was 'light') {
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
        <meta name="description" content="Comprehensive SEO optimization, cutting-edge website development, targeted advertisements, and digital solutions to help your business thrive." />
        <meta name="keywords" content="SEO optimization, website development, digital marketing, targeted advertisements, business growth, online solutions" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "SynQuad",
          "url": "http://www.synquad.com",
          "logo": "http://www.synquad.com/logo.png",
          "description": "Comprehensive SEO optimization, cutting-edge website development, targeted advertisements, and digital solutions to help your business thrive.",
          "sameAs": [
            "http://www.facebook.com/synquad",
            "http://www.twitter.com/synquad",
            "http://www.linkedin.com/company/synquad"
          ],
          "service": [
            {
              "@type": "Service",
              "name": "SEO Optimization",
              "description": "Improve your website's visibility on search engines with our expert SEO services."
            },
            {
              "@type": "Service",
              "name": "Website Development",
              "description": "Get a cutting-edge website developed to meet your business needs."
            },
            {
              "@type": "Service",
              "name": "Digital Marketing",
              "description": "Targeted advertisements and digital marketing solutions to grow your business."
            }
          ]
        })}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}