import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata = {
  title: "Clevora Agro | Premium Agricultural Fertilizers & Bio-Stimulants",
  description: "Clevora Agro is a leading manufacturer of high-performance agricultural inputs. We supply premium water-soluble fertilizers, liquid fertilizers, secondary nutrients, and organic bio-stimulants across India to maximize crop yield.",
  keywords: "Clevora Agro, Best Fertilizer Manufacturer in Gujarat, Water Soluble Fertilizers India, Organic Bio-stimulants, Liquid Fertilizers for Crops, Secondary Nutrients for Plants, Agriculture Crop Nutrition, Sustainable Farming Solutions, Vadodara Fertilizer Supplier, High Yield Fertilizers, Micronutrients for Agriculture",
  authors: [{ name: 'Clevora Agro' }],
  creator: 'Clevora Agro',
  publisher: 'Clevora Agro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Clevora Agro | Premium Agricultural Fertilizers',
    description: 'High-performance agricultural inputs including water-soluble fertilizers and organic bio-stimulants in Vadodara, Gujarat.',
    url: 'https://clevoraagro.com',
    siteName: 'Clevora Agro',
    images: [
      {
        url: '/logo.png', // Ideally should be a 1200x630 og-image.png
        width: 800,
        height: 600,
        alt: 'Clevora Agro Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clevora Agro | Premium Agricultural Fertilizers',
    description: 'High-performance agricultural inputs including water-soluble fertilizers and organic bio-stimulants.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className={inter.className}>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px', position: 'relative', zIndex: 10 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
