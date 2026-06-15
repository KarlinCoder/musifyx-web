"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";
import Providers from "./providers";
import DownloadsList from "./_components/downloads-list";
import Loader from "@/components/loader";
import { loginRoute } from "@/config/auth-routes";
import { useDialogsStore } from "./_stores/useDialogsStore";
import { AnimatePresence } from "motion/react";
import ShowQueueButton from "./_components/show-queue-button";
import { ToastContainer, Bounce } from "react-toastify";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const { isQueueSidebarOpen } = useDialogsStore();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace(loginRoute);
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-dvh text-text">
        <Loader />
      </div>
    );
  }

  if (!isSignedIn) return null;

  return (
    <Providers>
      <ToastContainer
        position="top-right"
        autoClose={9000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="relative flex h-dvh text-text overflow-hidden">
        <Sidebar />
        <main className="relative flex flex-col size-full styled-scrollbar overflow-x-hidden overflow-y-auto px-5">
          <div className="absolute top-6 right-6 size-12 aspect-square border-2 border-white/20 rounded-full">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: { width: "100%", height: "100%" },
                },
              }}
            />
          </div>

          {children}

          <ShowQueueButton />
          <AnimatePresence>
            {isQueueSidebarOpen && <DownloadsList />}
          </AnimatePresence>
        </main>
      </div>
    </Providers>
  );
}
