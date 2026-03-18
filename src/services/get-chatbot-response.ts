import { ChatbotResponse } from "@/types/chatbot";
import axios from "axios";

export const getChatbotResponse = async (message: string, username: string) => {
  try {
    const { data } = await axios.post<ChatbotResponse>(
      "https://musify.api.karlincoder.com/agent",
      {
        message,
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
