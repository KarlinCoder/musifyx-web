"use client";

import botProfilePicture from "@/assets/bot-profile-picture.webp";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { RiCloseFill, RiMessage3Fill } from "react-icons/ri";
import AssistantPanel from "./assistant-panel";

export default function FloatAssistant() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(!showModal);

  return (
    <>
      <motion.button
        initial={{ translateX: 100 }}
        animate={{ translateX: 0 }}
        onClick={handleShowModal}
        className="absolute bottom-6 right-6 grid place-items-center p-3.5 rounded-full bg-primary transition-colors duration-100 hover:bg-secondary active:bg-primary cursor-pointer"
      >
        <div>
          <RiMessage3Fill size={25} />
        </div>
      </motion.button>

      <AnimatePresence>
        {showModal && <AssistantPanel onClose={handleShowModal} />}
      </AnimatePresence>
    </>
  );
}
