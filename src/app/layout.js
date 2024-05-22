"use client";

import { Inter } from "next/font/google";
import ToastWrapper from "@/components/ToastContainer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { CollapseDrawerProvider } from "@/contexts/CollapseDrawerContext";
import { SettingsProvider } from "@/contexts/SettingContext";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Vision Surgery",
//   description: "Vision Surgery App",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light-theme">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="assets/images/mark/cootle.svg"
          type="image/svg"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
        />
        <script src="assets/js/pace.min.js" async></script>
        <script src="assets/js/bootstrap.bundle.min.js" async></script>
        <script src="assets/js/jquery.min.js" async></script>
        <script
          src="assets/plugins/simplebar/js/simplebar.min.js"
          async
        ></script>
        <script
          src="assets/plugins/metismenu/js/metisMenu.min.js"
          async
        ></script>
        <script
          src="assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js"
          async
        ></script>
        <script
          src="assets/plugins/apexcharts-bundle/js/apexcharts.min.js"
          async
        ></script>
        <script src="assets/js/gauge.js" async></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr" async></script>

        <script src="assets/js/index.js" async></script>
        <script src="assets/js/app.js" async></script>
        <title>Vision Surgery AI – Medical Video Processing</title>
      </Head>
      <body className={inter.className}>
        {
          <AuthProvider>
            <CollapseDrawerProvider>
              <SettingsProvider>
                {
                  <>
                    <ToastWrapper />
                    {children}
                  </>
                }
              </SettingsProvider>
            </CollapseDrawerProvider>
          </AuthProvider>
        }
      </body>
    </html>
  );
}
