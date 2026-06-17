import Link from "next/link";
import { genericBlur } from "@/lib/utils";
import ImageWithFallback from "@/components/image-with-fallback";

interface Props {
  country: string;
  countryCode: string;
  label: string;
  playlistId: number;
  coverUrl: string;
}

const countryFlags: Record<string, string> = {
  mundial: "🌍",
  usa: "🇺🇸",
  brasil: "🇧🇷",
  reino_unido: "🇬🇧",
  alemania: "🇩🇪",
  francia: "🇫🇷",
  colombia: "🇨🇴",
  canada: "🇨🇦",
  mexico: "🇲🇽",
  holanda: "🇳🇱",
  sudafrica: "🇿🇦",
  jamaica: "🇯🇲",
  venezuela: "🇻🇪",
  ucrania: "🇺🇦",
  tunes: "🇹🇳",
  tailaindia: "🇹🇭",
  el_salvador: "🇸🇻",
  senegal: "🇸🇳",
  eslovenia: "🇸🇮",
  arabia_saudita: "🇸🇦",
  paraguay: "🇵🇾",
  portugal: "🇵🇹",
  filipinas: "🇵🇭",
  peru: "🇵🇪",
  malasia: "🇲🇾",
  libano: "🇱🇧",
  marruecos: "🇲🇦",
  corea_del_sur: "🇰🇷",
  japon: "🇯🇵",
  jordania: "🇯🇴",
  israel: "🇮🇱",
  hungria: "🇭🇺",
  ecuador: "🇪🇨",
  algeria: "🇩🇿",
  bolivia: "🇧🇴",
  bulgaria: "🇧🇬",
  emiratos: "🇦🇪",
  singapur: "🇸🇬",
  noruega: "🇳🇴",
  espana: "🇪🇸",
  suecia: "🇸🇪",
  islandia: "🇮🇸",
  Dinamarca: "🇩🇰",
  costa_rica: "🇨🇷",
  suiza: "🇨🇭",
  belgica: "🇧🇪",
  australia: "🇦🇺",
  turquia: "🇹🇷",
  rusia: "🇷🇺",
  nigeria: "🇳🇬",
  austria: "🇦🇹",
  argentina: "🇦🇷",
  indonesia: "🇮🇩",
  italia: "🇮🇹",
  chile: "🇨🇱",
  guatemala: "🇬🇹",
  rumania: "🇷🇴",
  eslovaquia: "🇸🇰",
  serbia: "🇷🇸",
  kenia: "🇰🇪",
  polonia: "🇵🇱",
  croacia: "🇭🇷",
  republica_checa: "🇨🇿",
  letonia: "🇱🇻",
  lituania: "🇱🇹",
  estonia: "🇪🇪",
  finlandia: "🇫🇮",
  honduras: "🇭🇳",
  costa_marfil: "🇨🇮",
};

const keyMap: Record<string, string> = {
  "Top Mundial": "mundial",
  "Top USA": "usa",
  "Top Brasil": "brasil",
  "Top Reino Unido": "reino_unido",
  "Top Alemania": "alemania",
  "Top Francia": "francia",
  "Top Colombia": "colombia",
  "Top Canadá": "canada",
  "Top México": "mexico",
  "Top Holanda": "holanda",
  "Top Sudáfrica": "sudafrica",
  "Top Jamaica": "jamaica",
  "Top Venezuela": "venezuela",
  "Top Ucrania": "ucrania",
  "Top Túnez": "tunes",
  "Top Tailaindia": "tailaindia",
  "Top El Salvador": "el_salvador",
  "Top Senegal": "senegal",
  "Top Eslovenia": "eslovenia",
  "Top Arabia Saudita": "arabia_saudita",
  "Top Paraguay": "paraguay",
  "Top Portugal": "portugal",
  "Top Filipinas": "filipinas",
  "Top Perú": "peru",
  "Top Malasia": "malasia",
  "Top Líbano": "libano",
  "Top Marruecos": "marruecos",
  "Top Corea del Sur": "corea_del_sur",
  "Top Japón": "japon",
  "Top Jordania": "jordania",
  "Top Israel": "israel",
  "Top Hungría": "hungria",
  "Top Egipto": "egipto",
  "Top Ecuador": "ecuador",
  "Top Algeria": "algeria",
  "Top Bolivia": "bolivia",
  "Top Bulgaria": "bulgaria",
  "Top Emiratos Árabes Unidos": "emiratos",
  "Top Singapur": "singapur",
  "Top Noruega": "noruega",
  "Top España": "espana",
  "Top Suecia": "suecia",
  "Top Islandia": "islandia",
  "Top Dinamarca": "dinamarca",
  "Top Costa Rica": "costa_rica",
  "Top Suiza": "suiza",
  "Top Bélgica": "belgica",
  "Top Australia": "australia",
  "Top Turquía": "turquia",
  "Top Rusia": "rusia",
  "Top Nigeria": "nigeria",
  "Top Austria": "austria",
  "Top Argentina": "argentina",
  "Top Indonesia": "indonesia",
  "Top Italia": "italia",
  "Top Chile": "chile",
  "Top Guatemala": "guatemala",
  "Top Rumanía": "rumania",
  "Top Eslovaquia": "eslovaquia",
  "Top Serbia": "serbia",
  "Top Kenia": "kenia",
  "Top Polonia": "polonia",
  "Top Croacia": "croacia",
  "Top República Checa": "republica_checa",
  "Top Letonia": "letonia",
  "Top Lituania": "lituania",
  "Top Estonia": "estonia",
  "Top Finlandia": "finlandia",
  "Top Honduras": "honduras",
  "Top Costa de Marfil": "costa_marfil",
};

export default function CountryChartCard({
  countryCode,
  label,
  playlistId,
  coverUrl,
}: Props) {
  const flag = countryFlags[countryCode] || "🌐";

  return (
    <Link
      href={`/app/playlists/${playlistId}`}
      className="flex items-center gap-4 p-3 hover:bg-background-light rounded-xl transition-all duration-200 cursor-pointer group"
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
        <ImageWithFallback
          src={coverUrl}
          fallbackType="playlist"
          alt={label}
          placeholder="blur"
          blurDataURL={genericBlur}
          width={64}
          height={64}
          className="size-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-text truncate group-hover:text-primary transition-colors">
          {label.replace("Top ", "")}
        </p>
        <p className="text-xs text-text-muted">Top 100 - Musify</p>
      </div>

      <div className="text-2xl shrink-0 group-hover:scale-110 transition-transform duration-200">
        {flag}
      </div>
    </Link>
  );
}

export { keyMap };
