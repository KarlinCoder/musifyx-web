"use client";

import { FormEvent, useMemo } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { RiSendPlane2Fill, RiSparkling2Fill } from "react-icons/ri";

interface Props {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

const greetings = [
  "Buenas noches",
  "Buenas madrugadas",
  "Buenas tardes",
  "Buenos dias",
  "Hola",
  "Que onda",
  "Wenas",
  "Hi",
  "Hey",
  "Buenos Dias",
  "Buenas",
  "Saludos",
  "Que hay",
  "Como estas",
  "What up",
  "Buen comienzo de dia",
  "Start",
  "New day",
  "Vamos",
  "Ahi vamos",
  "Feliz dia",
  "Feliz noche",
  "Feliz manana",
  "Good morning",
  "Good evening",
  "Good afternoon",
  "Guten Morgen",
  "Bonjour",
  "Buongiorno",
  "Buenos dias",
  "Hora de musica",
  "Hora de buscar",
  "Momento musical",
  "Search time",
  "Descubrir",
  "Explorar",
  "Encontrar",
  "Buscando",
  "A buscar",
  "Con energia",
  "Con flow",
  "Con vibe",
  "Con ritmo",
  "Con estilo",
  "Llego el momento",
  "Es momento de",
  "Tiempo de",
  "Ahora si",
  "Ahora",
  "Ya llego",
  "Estas listo",
  "Listo para",
  "Preparado para",
  "Dispuesto a",
  "Vamos a buscar",
  "A ver que hay",
  "Que tal si",
  "Probemos",
  "Intentemos",
  "Descubre",
  "Explora",
  "Encuentra",
  "Busca",
  "Navega",
  "Musica para ti",
  "Sonidos para",
  "Ritmos para",
  "Vibes para",
  "Flow para",
  "Para tu mood",
  "Para tu momento",
  "Para tu dia",
  "Para tu noche",
  "Para tu amanecer",
  "Tu musica te espera",
  "Tu playlist arriving",
  "Tu sonido ideal",
  "Tu vibe perfecto",
  "Estas a punto de",
  "Vas a descubrir",
  "Encontraras",
  "Exploraras",
  "Descubriras",
  "La mejor musica",
  "Lo mejor del momento",
  "Lo top",
  "Lo viral",
  "Lo trending",
  "Algo nuevo",
  "Algo diferente",
  "Algo unique",
  "Algo fresh",
  "Algo nuevo",
  "Tu siguiente obsesion",
  "Tu proximo hit",
  "Tu nueva cancion",
  "Tu nuevo artista",
  "Tu nuevo album",
  "Ambientacion perfecta",
  "El soundtrack perfecto",
  "La banda sonora ideal",
  "El mix perfecto",
  "La fusion ideal",
];

const suffixes = [
  "Josue",
  "Juan",
  "Carlos",
  "Miguel",
  "Antonio",
  "Jose",
  "Luis",
  "Francisco",
  "Javier",
  "Daniel",
  "Pedro",
  "Fernando",
  "Rafael",
  "Eduardo",
  "Rodrigo",
  "Alberto",
  "Oscar",
  "Manuel",
  "Sergio",
  "Andres",
  "Alejandro",
  "Ricardo",
  "Gustavo",
  "Adrian",
  "Diego",
  "Pablo",
  "Jorge",
  "David",
  "Mario",
  "Hugo",
  "Marco",
  "Ivan",
  "Christian",
  "Sebastian",
  "Gabriel",
  "Angel",
  "Israel",
  "Emilio",
  "Julio",
  "Enrique",
  "Roberto",
  "Armando",
  "Guillermo",
  "Salvador",
  "Santigo",
  "Mateo",
  "Matias",
  "Tomas",
  "Bruno",
  "Leonardo",
  "Ezequiel",
  "Jonatan",
  "Brian",
  "Kevin",
  "Steven",
  "Bryan",
  "Alex",
  "David",
  "Victor",
  "Ruben",
  "Alvaro",
  "Iker",
  "Marc",
  "Dani",
  "Javi",
  "Pol",
  "Eneko",
  "Mikel",
  "Asier",
  "Unai",
  "Aritz",
  "Jon",
  "Ibai",
  "Kiko",
  "Juanma",
  "Joseba",
  "Gorka",
  "Beñat",
  "Gotzon",
  "Ekaitz",
];

const suggestions = [
  "Dame canciones de Bruno Mars",
  "Albums de rock clasico",
  "Playlists para entrenar",
  "Artistas similares a Taylor Swift",
  "Canciones populares de reggaeton",
  "Albums de jazz para relajar",
  "Mejores canciones de 2024",
  "Albums recientes de K-pop",
  "Playlists de study lofi",
  "Artistas de musique electronica",
  "Canciones romanticas en espanol",
  "Albums de los 80s",
  "Mejores podcasts musicales",
  "Playlists para dormir",
  "Canciones alegres para levantar el animo",
  "Albums de metall",
  "Playlists de gym",
  "Artistas indie alternativos",
  "Canciones de cumpleanos",
  "Albums de salsa",
  "Playlists para concentrarse",
  "Artistas de reggaeton old school",
  "Canciones clasicas del rock",
  "Albums de trap latino",
  "Playlists para meditar",
  "Artistas de bachata",
  "Canciones de peliculas famosas",
  "Albums de punk rock",
  "Playlists para caminar",
  "Artistas de pop mexicano",
  "Canciones para entrenar cardio",
  "Albums de house music",
  "Playlists de road trip",
  "Artistas de cumbia",
  "Canciones de desamor",
  "Albums de hip hop klassiko",
  "Playlists para limpar la casa",
  "Artistas de banda",
  "Canciones con flow brasileiro",
  "Albums de dubstep",
  "Playlists para trabajar",
  "Artistas de dembow",
  "Canciones energeticas para LA gym",
  "Albums de synthwave",
  "Playlists de cumpleanos",
  "Artistas de corridos",
  "Canciones de movilizacion",
  "Albums de ambient music",
  "Playlists para bailar",
  "Artistas de funk brasileiro",
  "Canzoni italiane famose",
  "Albums de techno",
  "Playlists de Halloween",
  "Artistas de bossa nova",
  "Canciones para LA manana",
  "Albums de rock alternativo",
  "Playlists para estudiar de noche",
  "Artistas de latin pop",
  "Canciones de viaje",
  "Albums de progressive house",
  "Playlists de San Valentin",
  "Artistas de mariachi",
  "Canciones motivacionales",
  "Albums de r&b",
  "Playlists para escribir",
  "Artistas de electro house",
  "Canciones de accion",
  "Albums de new age",
  "Playlists de productividad",
  "Artistas de merengue",
  "Canciones de reflexion",
  "Albums de breakbeat",
  "Playlists de cafe",
  "Artistas de vallenato",
  "Canciones de aventura",
  "Albums de downtempo",
  "Playlists para leer",
  "Artistas de salsa choke",
  "Canciones para running",
  "Albums de Drum and Bass",
  "Playlists de dinner party",
  "Artistas de urbana",
  "Canciones de temporada",
  "Albums de chillout",
  "Playlists para meditacion",
  "Artistas de reageton",
  "Canciones de superacion",
  "Albums de trance",
  "Playlists de motivation",
  "Artistas de urbana espana",
  "Canciones para hacer ejercicio",
  "Albums de lofi hip hop",
  "Playlists de relax",
  "Artistas de bossa nova",
  "Canciones para pensar",
  "Albums de psytrance",
  "Playlists de gaming",
  "Artistas de mambo",
  "Canciones para inspirar",
  "Albums de future bass",
  "Playlists para crear",
  "Artistas de champeta",
  "Canciones para celebrar",
  "Albums de garage",
  "Playlists de entrenamiento",
  "Artistas de salsa choke",
  "Canciones para dormir",
  "Albums de world music",
  "Playlists de naturaleza",
  "Artistas de afrobeats",
  "Canciones de nostalgia",
  "Albums de minimal",
  "Playlists de concentracion",
  "Artistas de dembow choke",
  "Canciones de inspiracion",
  "Albums de indie rock",
  "Playlists para networking",
  "Artistas de cumbia sonidera",
  "Canciones de energia positiva",
  "Albums de progressive rock",
  "Playlists de energia",
  "Artistas de electro latino",
  "Canciones para soniar",
  "Albums de nu disco",
  "Playlists de inspiracion",
  "Artistas de urbana Colombia",
];

function getGreeting(): string {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const seed = hour * 60 + minute;

  const greeting = greetings[seed % greetings.length];
  const suffix = suffixes[seed % suffixes.length];

  return `${greeting}, ${suffix}`;
}

function getRandomSuggestions(): string[] {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const seed = hour * 60 + minute;

  const shuffled = [...suggestions]
    .map((item, i) => ({
      item,
      sort: (seed * (i + 1) * 9301 + 49297) % 233280,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((s) => s.item);

  return shuffled.slice(0, 8);
}

export default function IAInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
}: Props) {
  const title = useMemo(() => getGreeting(), []);
  const randomSuggestions = useMemo(() => getRandomSuggestions(), []);

  return (
    <div className="size-full flex flex-col justify-center items-center px-5 pb-8 bg-red-500">
      <section className="flex flex-col justify-center gap-8 max-w-xl w-full bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-primary text-white font-medium">
            {title}
          </h1>

          <p className="text-text-muted text-sm">
            Que te gustaria escuchar hoy?
          </p>
        </div>

        <form onSubmit={onSubmit} className="w-full">
          <div className="relative">
            <TextareaAutosize
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Describe lo que buscas..."
              minRows={1}
              maxRows={3}
              className="resize-none w-full px-6 py-4 bg-background-light rounded-full text-sm outline-1 outline-transparent hover:outline-primary/30 focus:outline-primary/50 transition-all duration-200 placeholder:text-text-muted/50 styled-scrollbar"
              disabled={isLoading}
            />

            {input.trim() && (
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary hover:bg-primary/85 disabled:opacity-50 rounded-full text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <RiSendPlane2Fill size={16} />
                )}
              </button>
            )}
          </div>
        </form>

        <div className="space-y-3">
          <div className="flex flex-wrap justify-center gap-2">
            {randomSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onInputChange(suggestion)}
                className="text-xs px-4 py-2 bg-background-light hover:bg-white/10 rounded-full hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer text-text-muted hover:text-text"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </section>

      <p className="text-xs text-text-muted/40 text-center mt-auto pt-8">
        La IA puede cometer errores. Los resultados dependen de la
        disponibilidad en Deezer.
      </p>
    </div>
  );
}
