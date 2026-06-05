import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Evergrow Crop Science Pvt Ltd | Premium Agricultural Fertilizers & Bio-Stimulants",
  description: "Evergrow Crop Science Private Limited (CSPL) manufactures and distributes high-performance agricultural inputs including water-soluble fertilizers, secondary nutrients, liquid fertilizers, and organic bio-stimulants in Rajkot, Gujarat.",
  keywords: "Evergrow, Crop Science, Fertilizers, Organic Farming, Bio-stimulants, Agriculture Gujarat, Water Soluble Fertilizers, Secondary Nutrients, Rajkot Marketing Yard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
