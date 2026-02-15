import PageContainer from "@/components/ui/page-container";
import PlaceholderPageGreeting from "@/components/ui/placeholder-page-greeting";
import { RiAlbumLine } from "react-icons/ri";

export default function AlbumsPage() {
  return (
    <PageContainer>
      <PlaceholderPageGreeting
        icon={RiAlbumLine}
        message="Comienza a buscar albumes o preguntale a la IA."
        title="Explora albumes."
      />
    </PageContainer>
  );
}
