import PageContainer from "@/components/ui/page-container";
import PlaceholderPageGreeting from "@/components/ui/placeholder-page-greeting";
import { RiUser2Line } from "react-icons/ri";

export default function ArtistsPage() {
  return (
    <PageContainer>
      <PlaceholderPageGreeting
        icon={RiUser2Line}
        message="Comienza a buscar artistas o preguntale a la IA."
        title="Explora artistas."
      />
    </PageContainer>
  );
}
