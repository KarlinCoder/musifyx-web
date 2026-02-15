import FloatAssistant from "@/components/float-assistant";
import SearchBar from "@/components/search-bar";
import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MusifyX</title>
      </head>
      <body className="relative flex font-secondary bg-background-dark h-dvh text-text overflow-hidden">
        <Sidebar />
        <div className="grow p-5 relative">
          <SearchBar />

          {children}
        </div>

        <FloatAssistant />
      </body>
    </html>
  );
}
