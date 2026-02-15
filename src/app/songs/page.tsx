import PageContainer from "@/components/ui/page-container";
import PlaceholderPageGreeting from "@/components/ui/placeholder-page-greeting";
import { RiMusic2Line } from "react-icons/ri";

export default function SongsPage() {
  return (
    <PageContainer>
      <PlaceholderPageGreeting
        icon={RiMusic2Line}
        message="Comienza a buscar canciones o preguntale a la IA."
        title="Explora canciones."
      />
    </PageContainer>
  );
}
