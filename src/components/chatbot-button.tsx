import { RiBardFill } from "react-icons/ri";

interface Props {
  onClick: () => void;
}

export default function ChatbotButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed z-10 shadow-2xl shadow-background bottom-4 cursor-pointer right-6 bg-primary hover:opacity-90 active:opacity-100 rounded-full p-3"
    >
      <div>
        <RiBardFill size={25} />
      </div>
    </button>
  );
}
