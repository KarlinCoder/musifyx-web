"use client";

import TextareaAutosize from "react-textarea-autosize";

export default function IAPage() {
  const pickRandomSuggestion = () => {
    const suggestions = [
      "Recomiéndame canciones para un verano en casa.",
      "Dime álbumes para escuchar mientras viajo en lancha.",
      "¿Qué música pongo para una cena romántica?",
      "Necesito playlist para estudiar sin distraerme.",
      "Recomiéndame lo mejor del indie español de los 2000s.",
      "¿Qué escucho para relajarme después del trabajo?",
      "Busco canciones alegres para levantar el ánimo.",
      "Dame una lista para bailar solo en mi cuarto.",
      "¿Qué álbumes clásicos debería conocer todo amante del rock?",
      "Música instrumental para programar toda la noche.",
      "Recomiéndame artistas similares a Rosalía.",
      "Playlist ideal para un road trip por la costa.",
      "¿Qué escucho mientras cocino algo nuevo?",
      "Música suave para dormir profundamente.",
      "Lo mejor del reggaetón de los últimos 5 años.",
      "Canciones perfectas para una fiesta en la playa.",
      "Recomiéndame bandas sonoras épicas de películas.",
      "¿Qué escucho cuando estoy triste pero no quiero deprimirme más?",
      "Lista de jazz moderno para un brunch elegante.",
      "Música electrónica energética para hacer ejercicio.",
      "Lo mejor del hip-hop latino actual.",
      "Canciones acústicas para tocar con guitarra.",
      "Recomiéndame música ambiental para meditar.",
      "¿Qué álbumes definen los años 90?",
      "Playlist para limpiar la casa con buena vibra.",
      "Música retro para sentirme en los 80s.",
      "Artistas emergentes que merecen ser escuchados.",
      "Lo mejor del pop alternativo internacional.",
      "Canciones en español para aprender idiomas.",
      "Música sin letra para concentrarme al 100%.",
      "¿Qué escucho en una tarde lluviosa con café?",
      "Recomiéndame lo más viral en TikTok este mes.",
      "Bandas poco conocidas pero increíbles del indie global.",
      "Música para leer novelas de misterio.",
      "Lo esencial de la música clásica para principiantes.",
      "Playlist nocturna para conducir por la ciudad vacía.",
      "Canciones con letras profundas que hagan reflexionar.",
      "Música para yoga o estiramientos suaves.",
      "Lo mejor del soul y R&B de todos los tiempos.",
      "Recomiéndame temas para una despedida de soltero/a.",
      "¿Qué poner en segundo plano durante una videollamada?",
      "Música para celebrar un logro personal.",
      "Lo más innovador en música experimental hoy.",
      "Canciones que transmitan esperanza y resiliencia.",
      "Playlist para un picnic en el parque.",
      "Música bailable pero sin voces (ideal para fondos).",
      "Lo mejor del flamenco moderno fusionado.",
      "Recomiéndame canciones en francés con buen ritmo.",
      "Álbumes conceptuales que cuenten una historia completa.",
      "Música para dibujar o hacer arte creativo.",
      "Lo más destacado del folk latinoamericano.",
    ];

    // eslint-disable-next-line react-hooks/purity
    const index = Math.floor(Math.random() * suggestions.length);
    return suggestions[index];
  };

  return (
    <div className="size-full flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center gap-3 max-w-220 h-full p-5 w-full">
        <p className="grow bg-background p-5 rounded-md border border-white/6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nemo
          repudiandae vitae accusantium alias harum excepturi temporibus laborum
          et quasi minima perferendis eaque, quis itaque quam voluptate fugiat.
          Expedita, cupiditate.
        </p>

        <div className="w-full">
          <TextareaAutosize
            placeholder={pickRandomSuggestion()}
            className="resize-none px-5 py-4 bg-background-light rounded-full w-full text-sm outline-2 outline-transparent hover:outline-primary/50 focus:outline-primary/70"
          />
        </div>
      </section>
    </div>
  );
}
