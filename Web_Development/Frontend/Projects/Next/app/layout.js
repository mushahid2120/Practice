import ThemeProvider from "@/context/ThemeProvider";
import "./globals.css";
import Headers from "@/components/Headers";


export default function RootLayout({ children }) {


  return (
    <html lang="en" >
      <body className="m-8">
        <ThemeProvider>
          <Headers />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
