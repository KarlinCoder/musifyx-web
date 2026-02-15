import PageContainer from "@/components/ui/page-container";
import PlaceholderPageGreeting from "@/components/ui/placeholder-page-greeting";
import { RiPlayList2Line } from "react-icons/ri";

export default function PlaylistsPage() {
  return (
    <PageContainer>
      <PlaceholderPageGreeting
        icon={RiPlayList2Line}
        message="Comienza a buscar playlists o preguntale a la IA."
        title="Explora playlists."
      />
    </PageContainer>
  );
}
