import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MusifyX</title>
      </head>
      <body className="relative flex font-secondary bg-background-dark h-dvh text-text overflow-hidden">
        <Sidebar />

        <main className="flex flex-col size-full styled-scrollbar relative overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
