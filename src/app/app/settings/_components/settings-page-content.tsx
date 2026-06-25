"use client";

import SectionTitle from "@/app/app/_components/section-title";
import Toggle from "./toggle";
import Slider from "./slider";
import Section from "./section";
import { useSettingsStore } from "../../_stores/useSettingsStore";

export default function SettingsPageContent() {
  const {
    previewVolume,
    hideExplicit,
    setPreviewVolume,
    setHideExplicit,
  } = useSettingsStore();

  return (
    <div className="grid-results">
      <SectionTitle>Ajustes</SectionTitle>

      <Section title="Reproducción">
        <Slider
          value={previewVolume}
          onChange={setPreviewVolume}
          label="Volumen de previews"
          description="Controla el volumen de las vistas previas de canciones al pasar el cursor sobre ellas"
        />
      </Section>

      <Section title="Contenido">
        <Toggle
          checked={hideExplicit}
          onChange={setHideExplicit}
          label="Ocultar contenido explícito"
          description="Filtra canciones, álbumes y playlists marcados con etiqueta explícita. Ideal si niños o adolescentes usan la aplicación"
        />
      </Section>
    </div>
  );
}
