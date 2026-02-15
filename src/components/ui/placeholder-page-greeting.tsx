import { IconType } from "react-icons";
import * as motion from "motion/react-client";

interface Props {
  title: string;
  message: string;
  icon: IconType;
}

export default function PlaceholderPageGreeting({
  icon,
  message,
  title,
}: Props) {
  const Icon = icon;

  return (
    <div className="text-neutral-700 flex flex-col justify-center items-center">
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "keyframes", delay: 0 }}
      >
        <Icon size={120} />
      </motion.div>
      <motion.p
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "keyframes", delay: 0.2 }}
        className="font-primary text-2xl font-semibold"
      >
        {title}
      </motion.p>
      <motion.p
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "keyframes", delay: 0.3 }}
        className="text-sm"
      >
        {message}
      </motion.p>
    </div>
  );
}
