import { FastAverageColor } from "fast-average-color";

export const formatSecondsToMinutes = (seconds: number): string => {
  if (seconds < 0) seconds = 0;

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const genericBlur =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMzMzIi8+Cjwvc3ZnPg==";

export const getAverageColor = async (imgUrl: string) => {
  const fac = new FastAverageColor();
  const color = await fac.getColorAsync(imgUrl);
  return color.hex;
};

export const formatDateToSpanish = (date: string | Date): string => {
  const d = new Date(date);

  // verif basica de fecha valida
  if (isNaN(d.getTime())) {
    return "Fecha inválida";
  }

  const day = d.getDate();
  const year = d.getFullYear();

  const monthName = d.toLocaleDateString("es-ES", { month: "long" });

  return `${day} de ${monthName} del ${year}`;
};

export const capitalize = (word: string) => {
  const letter = word[0].toUpperCase();
  const rest = word.slice(1).toLowerCase();
  return letter + rest;
};

export const getChatbotGreeting = (username: string) => {
  const greetings = [
    `¡Hola ${username}! ¿Listo para encontrar nueva música?`,
    `¡Buenas ${username}! ¿Qué ritmo tienes hoy?`,
    `¡Hey ${username}! Tu próxima canción favorita te espera.`,
    `¡Hola ${username}! ¿Preparado para descubrir sonidos increíbles?`,
    `¡Qué tal ${username}! Es hora de explorar nuevos géneros.`,
    `¡Hola ${username}! ¿Listo para una sesión de descubrimiento musical?`,
    `¡Buen día ${username}! Tu playlist te está esperando.`,
    `¡Hey ${username}! ¿Qué género vamos a explorar hoy?`,
    `¡Hola ${username}! Prepárate para encontrar tu nuevo artista favorito.`,
    `¡Qué onda ${username}! ¿Listo para llenar tu biblioteca de música?`,
    `¡Hola ${username}! Hoy es un buen día para descubrir música nueva.`,
    `¡Buenas tardes ${username}! ¿Qué tal si encontramos algo fresco?`,
    `¡Hey ${username}! Tu próximo hit está a un clic de distancia.`,
    `¡Hola ${username}! ¿Listo para expandir tus horizontes musicales?`,
    `¡Qué tal ${username}! Es momento de explorar nuevos sonidos.`,
    `¡Hola ${username}! ¿Preparado para una aventura musical?`,
    `¡Buenas ${username}! Tu música ideal te está esperando.`,
    `¡Hey ${username}! ¿Listo para encontrar esa canción perfecta?`,
    `¡Hola ${username}! Hoy vamos a descubrir algo increíble.`,
    `¡Qué pasa ${username}! ¿Qué género te llama la atención hoy?`,
    `¡Hola ${username}! Prepárate para una experiencia musical única.`,
    `¡Buen día ${username}! ¿Listo para explorar nuevos artistas?`,
    `¡Hey ${username}! Tu próxima obsesión musical comienza aquí.`,
    `¡Hola ${username}! ¿Qué tal si encontramos música para tu estado de ánimo?`,
    `¡Qué tal ${username}! Es hora de darle play a algo nuevo.`,
    `¡Hola ${username}! ¿Listo para descubrir tu soundtrack perfecto?`,
    `¡Buenas ${username}! Tu viaje musical comienza ahora.`,
    `¡Hey ${username}! ¿Preparado para encontrar música que te mueva?`,
    `¡Hola ${username}! Hoy es el día perfecto para explorar.`,
    `¡Qué onda ${username}! ¿Listo para añadir nuevos favoritos?`,
    `¡Hola ${username}! Prepárate para descubrir ritmos únicos.`,
    `¡Buen día ${username}! ¿Qué tal si exploramos algo diferente?`,
    `¡Hey ${username}! Tu próxima canción épica te espera.`,
    `¡Hola ${username}! ¿Listo para una sesión de descubrimiento?`,
    `¡Qué tal ${username}! Es momento de encontrar nueva inspiración musical.`,
    `¡Hola ${username}! ¿Preparado para explorar nuevos sonidos?`,
    `¡Buenas ${username}! Tu playlist perfecta está por crearse.`,
    `¡Hey ${username}! ¿Listo para descubrir música que te inspire?`,
    `¡Hola ${username}! Hoy vamos a encontrar algo especial.`,
    `¡Qué pasa ${username}! ¿Qué tal si exploramos nuevos géneros?`,
    `¡Hola ${username}! Prepárate para una experiencia sonora única.`,
    `¡Buen día ${username}! ¿Listo para descubrir tu nueva canción favorita?`,
    `¡Hey ${username}! Tu próximo artista favorito está aquí.`,
    `¡Hola ${username}! ¿Preparado para explorar el mundo de la música?`,
    `¡Qué tal ${username}! Es hora de encontrar música que te conecte.`,
    `¡Hola ${username}! ¿Listo para una aventura de descubrimiento?`,
    `¡Buenas ${username}! Tu próxima melodía perfecta te espera.`,
    `¡Hey ${username}! ¿Qué tal si encontramos algo que te haga vibrar?`,
    `¡Hola ${username}! Prepárate para descubrir música increíble.`,
    `¡Qué onda ${username}! ¿Listo para explorar y disfrutar?`,
  ];

  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
};

export const getSuggestionPlaceholder = () => {
  const suggestionsPlaceholder = [
    "último álbum de Linkin Park",
    "canciones para viajar en bici por la noche",
    "música para concentrarme estudiando",
    "playlist de reggaetón clásico 2010-2015",
    "artistas similares a Bad Bunny",
    "canciones tristes para llorar un poco",
    "música electrónica para entrenar",
    "lo mejor de The Weeknd",
    "rock en español de los 90",
    "canciones para una cita romántica",
    "nuevos lanzamientos de esta semana",
    "música cubana contemporánea",
    "playlist para cocinar con energía",
    "canciones de desamor en inglés",
    "música instrumental para meditar",
    "top 10 de Karol G",
    "canciones para manejar de noche",
    "música para una fiesta en casa",
    "artistas emergentes de trap latino",
    "clásicos del rock alternativo",
    "música para yoga y relajación",
    "canciones que fueron #1 en 2024",
    "playlist de indie pop para domingo",
    "música de los 80 en español",
    "canciones para celebrar un logro",
    "álbumes conceptuales recomendados",
    "música para trabajar sin distraerse",
    "canciones de anime openings épicos",
    "reggaetón para perrear sin parar",
    "música acústica para madrugada",
    "artistas parecidos a Rosalía",
    "canciones para un roadtrip",
    "playlist de jazz suave para café",
    "música para después de una ruptura",
    "top canciones de Feid",
    "música latina para bailar en pareja",
    "canciones con letras profundas",
    "playlist de synthwave retro",
    "música para celebrar el fin de semana",
    "artistas nuevos que deberías escuchar",
    "canciones para hacer ejercicio intenso",
    "música de fondo para videollamadas",
    "clásicos del merengue y bachata",
    "canciones para un picnic al atardecer",
    "playlist de lo-fi beats para estudiar",
    "música para inspirarse creativamente",
    "top álbumes de rock progresivo",
    "canciones para viajar en autobús",
    "música para una cena elegante",
    "artistas similares a Peso Pluma",
    "canciones de empoderamiento femenino",
    "playlist de house para pre-fiesta",
    "música para desconectar del estrés",
    "canciones que marcan una generación",
    "música cubana tradicional y moderna",
    "playlist para correr 5K",
    "canciones para recordar viejos tiempos",
    "música para una tarde lluviosa",
    "top canciones de Shakira",
    "artistas de R&B contemporáneo",
    "canciones para una boda",
    "música para meditación guiada",
    "playlist de punk rock energético",
    "canciones para empezar el día con ánimo",
    "música para trabajar en equipo",
    "clásicos del hip hop old school",
    "canciones para un viaje en carretera",
    "playlist de baladas románticas",
    "música para concentrarse programando",
    "artistas emergentes de indie latino",
    "canciones para celebrar cumpleaños",
    "música para una sesión de fotos",
    "top álbumes de pop internacional",
    "canciones para reflexionar en silencio",
    "playlist de cumbia para bailar",
    "música para una mañana productiva",
    "artistas similares a Dua Lipa",
    "canciones para una noche de juegos",
    "música para desconectar redes sociales",
    "playlist de bossa nova relajante",
    "canciones para un primer encuentro",
    "música para inspirar creatividad artística",
    "top canciones de música urbana latina",
    "canciones para manejar con confianza",
    "playlist de rock clásico en español",
    "música para una tarde de lectura",
    "artistas de electrónica experimental",
    "canciones para celebrar la amistad",
    "música para una sesión de spa en casa",
    "playlist de salsa para bailar solo",
    "canciones para un momento de gratitud",
    "música para enfocarse en metas",
    "top álbumes debut que marcaron historia",
    "canciones para un viaje en tren",
    "playlist de chillout para después de trabajar",
    "música para una caminata al amanecer",
    "artistas que mezclan géneros únicos",
    "canciones para celebrar pequeños logros",
    "música para una noche de estrellas",
    "playlist de covers acústicos increíbles",
    "canciones para reconectar contigo mismo",
    "música para una sesión de brainstorming",
  ];

  const randomIndex = Math.floor(Math.random() * suggestionsPlaceholder.length);
  return suggestionsPlaceholder[randomIndex];
};

export const formatRecordType = (type: string) => {
  if (type === "song") return "Canción";
  if (type === "album") return "Álbum";
  if (type === "ep") return "EP";
  return type;
};
