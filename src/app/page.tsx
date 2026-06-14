"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaMusic,
  FaDownload,
  FaUsers,
  FaBolt,
  FaStar,
  FaCrown,
  FaFire,
  FaInfinity,
  FaWifi,
  FaHeart,
  FaList,
  FaComments,
  FaBell,
  FaFolder,
  FaCloud,
  FaEnvelope,
  FaGlobe,
  FaDiscord,
  FaTwitter,
  FaGithub,
  FaArrowUp,
  FaInstagram,
  FaUser,
  FaMobile,
  FaShield,
} from "react-icons/fa6";

const navItems = [
  { id: "home", label: "Inicio" },
  { id: "about", label: "Qué es Musify" },
  { id: "plans", label: "Planes" },
  { id: "vs-snaptube", label: "Vs Snaptube" },
  { id: "creator", label: "Creador" },
  { id: "why", label: "Por qué usar" },
  { id: "features", label: "Funcionalidades" },
];

const features = [
  {
    icon: FaList,
    title: "Búsqueda global",
    description:
      "Accede a más de 100 millones de canciones de todas las plataformas. Busca por artista, álbum, género o simplemente por el tono que tienes en mente.",
  },
  {
    icon: FaDownload,
    title: "Descargas ilimitadas",
    description:
      "Descarga toda la música que quieras sin límites. Calidad HD, FLAC, o optimiza el espacio con MP3 320kbps. Tu música, tus reglas.",
  },
  {
    icon: FaList,
    title: "Reproductor premium",
    description:
      "Experiencia de audio sin igual. Ecualizador avanzado, efectos de sonido, modo karaoke, lyrics en tiempo real y mucho más.",
  },
  {
    icon: FaList,
    title: "Playlists inteligentes",
    description:
      "Crea, organiza y descubre playlists automáticamente. Deja que Musify te sugiera basée en tus gustos con algoritmos de IA.",
  },
  {
    icon: FaHeart,
    title: "Biblioteca personal",
    description:
      "Tu colección, tu manera. Guarda favoritos, crea listas, importa desde otras plataformas y mantén todo perfectamente organizado.",
  },
  {
    icon: FaList,
    title: "Modo offline",
    description:
      "Sin internet no significa sin música. Descarga tu biblioteca y escúchala en cualquier lugar, sin anuncios ni interrupciones.",
  },
  {
    icon: FaList,
    title: "Compartir música",
    description:
      "Comparte tus canciones y playlists con amigos. Genera enlaces públicos o privados y controla quién puede escuchar.",
  },
  {
    icon: FaCloud,
    title: "Sincronización en la nube",
    description:
      "Tu música te sigue a todas partes. Sincroniza tu biblioteca entre dispositivos automáticamente. Empieza en el teléfono, continúa en PC.",
  },
  {
    icon: FaList,
    title: "Importar música",
    description:
      "Migra toda tu biblioteca desde Spotify, Apple Music, YouTube y más. Tus datos, playlists y preferencias siempre contigo.",
  },
  {
    icon: FaList,
    title: "Estadísticas avanzadas",
    description:
      "Conoce tus hábitos de escucha. Top canciones, artistas más escuchados, tiempo de reproducción y gráficos detallados.",
  },
  {
    icon: FaComments,
    title: "Comunidad activa",
    description:
      "Conecta con otros amantes de la música. Discute, recomienda y descubre nuevas tendencias junto a una comunidad vibrante.",
  },
  {
    icon: FaBell,
    title: "Notificaciones inteligentes",
    description:
      "Nunca te pierdas un lanzamiento. Notificaciones sobre nuevos álbumes de tus artistas favoritos, éxitos trending y recomendaciones.",
  },
  {
    icon: FaFolder,
    title: "Gestor de archivos",
    description:
      "Organiza tu música como prefieres. Carpetas personalizadas, etiquetas, gestión de metadatos y limpieza automática de duplicados.",
  },
  {
    icon: FaList,
    title: "App móvil completa",
    description:
      "La experiencia completa en tu bolsillo. Interfaz optimizada, controles rápidos, widgets y modo coche para听证 sin distractions.",
  },
  {
    icon: FaWifi,
    title: "Streaming sin anuncios",
    description:
      "Escucha música sin interrupciones. Sin anuncios, sin pausas forzadas. Solo tú y la música que amas.",
  },
  {
    icon: FaInfinity,
    title: "Reproducción continua",
    description:
      "La música nunca para. Modo shuffle avanzado, cola inteligente, salt between playlists y flow infinito de canciones.",
  },
];

const plans = [
  {
    name: "Gratis",
    price: "0€",
    period: "para siempre",
    icon: FaMusic,
    features: [
      "Búsqueda básica",
      "5 descargas al día",
      "Calidad estándar (128kbps)",
      "Con anuncios",
      "1 dispositivo",
    ],
    popular: false,
    cta: "Comenzar gratis",
    href: "/signup",
  },
  {
    name: "Premium",
    price: "4.99€",
    period: "al mes",
    icon: FaCrown,
    features: [
      "Búsqueda ilimitada",
      "Descargas ilimitadas",
      "Calidad máxima (FLAC)",
      "Sin anuncios",
      "3 dispositivos",
      "Modo offline",
      "Sincronización cloud",
    ],
    popular: true,
    cta: "Obtener Premium",
    href: "/plans",
  },
  {
    name: "Family",
    price: "7.99€",
    period: "al mes",
    icon: FaUsers,
    features: [
      "Todo lo de Premium",
      "Hasta 6 miembros",
      "Playlists familiares",
      "Control parental",
      "Cuentas independientes",
      "Estadísticas por miembro",
    ],
    popular: false,
    cta: "Plan Familiar",
    href: "/plans",
  },
];

const snaptubeAdvantages = [
  {
    title: "Sin anuncios intrusivos",
    description:
      "A diferencia de Snaptube que muestra anuncios constanticos entre cada canción, Musify te ofrece una experiencia limpia y fluida.",
    musify: "0 anuncios siempre",
    snaptube: "Múltiples anuncios diarios",
  },
  {
    title: "Interfaz moderna y profesional",
    description:
      "Snaptube tiene una interfaz anticuada y poco intuitiva. Musify ofrece un diseño elegante, oscuro y completamente en español.",
    musify: "UI moderna y oscura",
    snaptube: "Interfaz desactualizada",
  },
  {
    title: "Legalidar y transparencia",
    description:
      "Musify opera dentro del marco legal, ofreciendo una alternativa legítima. Snaptube ha tenido problemas legales reiterados.",
    musify: "Servicio 100% transparente",
    snaptube: "Historial de problemas legales",
  },
  {
    title: "Actualizaciones constantes",
    description:
      "Musify se actualiza regularmente con nuevas funciones y mejoras. Snaptube tiene un desarrollo erratico e impredecible.",
    musify: "Actualizaciones mensuales",
    snaptube: "Actualizaciones esporádicas",
  },
  {
    title: "Calidad de audio superior",
    description:
      "Ofrecemos múltiples opciones de calidad incluyendo FLAC lossless. Snaptube tiene opciones limitadas y a menudo degrada la calidad.",
    musify: "Hasta FLAC 24-bit/192kHz",
    snaptube: "Máximo 320kbps",
  },
  {
    title: "Soporte técnico en español",
    description:
      "Atención al cliente y documentación completamente en español. Snaptube solo ofrece soporte limitado en inglés.",
    musify: "Soporte en español 24/7",
    snaptube: "Soporte limitado",
  },
];

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background-dark text-text">
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background-light/90 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 flex gap-2 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-4 py-2 rounded-full text-sm font-secondary transition-all ${
              activeSection === item.id
                ? "bg-primary text-white"
                : "text-text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition"
        >
          <FaArrowUp className="text-white" />
        </button>
      )}

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background-dark pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <FaFire className="text-orange-500" />
            <span className="text-sm font-secondary">
              La nueva generación de streaming musical
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl font-primary font-extrabold mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
            MUSIFY
          </h1>

          <p className="text-2xl md:text-3xl font-secondary text-text-muted mb-8 leading-relaxed">
            Tu biblioteca musical personal.{" "}
            <span className="text-primary font-semibold">
              Descarga, organiza y disfruta
            </span>{" "}
            de tu música favorita sin límites ni anuncios.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="px-10 py-5 bg-primary font-secondary font-bold text-white rounded-full hover:opacity-90 transition shadow-2xl shadow-primary/40"
            >
              Comenzar ahora
            </Link>
            <Link
              href="#about"
              className="px-10 py-5 bg-background-light font-secondary font-bold text-text border border-white/10 rounded-full hover:bg-white/10 transition"
            >
              Descubrir más
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-text-muted">
            <div className="text-center">
              <p className="text-3xl font-primary font-bold text-white">
                100M+
              </p>
              <p className="text-sm">Canciones</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-primary font-bold text-white">1M+</p>
              <p className="text-sm">Usuarios</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-primary font-bold text-white">50+</p>
              <p className="text-sm">Países</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-background-light/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-primary font-bold mb-8">
                ¿Qué es <span className="text-primary">Musify</span>?
              </h2>
              <p className="text-xl text-text-muted mb-6 leading-relaxed">
                Musify es la plataforma de streaming y descarga de música más
                completa del mercado. Nacimos con una misión clara:{" "}
                <span className="text-white font-semibold">
                  democratizar el acceso a la música
                </span>{" "}
                para todos los hispanohablantes del mundo.
              </p>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                A diferencia de otras plataformas, Musify te permite descargar
                música para escucharla sin conexión, sin anuncios y con la mejor
                calidad de audio posible. Todo esto en una interfaz hermosa,
                moderna y completamente en español.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background-dark p-4 rounded-xl border border-white/5">
                  <FaShield className="text-3xl text-green-500 mb-2" />
                  <p className="font-semibold">Seguro y privado</p>
                  <p className="text-sm text-text-muted">
                    Tus datos siempre protegidos
                  </p>
                </div>
                <div className="bg-background-dark p-4 rounded-xl border border-white/5">
                  <FaInfinity className="text-3xl text-primary mb-2" />
                  <p className="font-semibold">Ilimitado</p>
                  <p className="text-sm text-text-muted">
                    Sin límites de reproducción
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl p-1">
                <div className="w-full h-full bg-background-dark rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                      <FaMusic className="text-6xl text-white" />
                    </div>
                    <p className="text-2xl font-primary font-bold">
                      Musify App
                    </p>
                    <p className="text-text-muted">Versión 2.0</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
                Nuevo
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-primary font-bold mb-4">
              Planes <span className="text-primary">flexibles</span>
            </h2>
            <p className="text-xl text-text-muted">
              Elige el plan que mejor se adapte a ti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-background-light rounded-3xl p-8 border ${
                  plan.popular
                    ? "border-primary shadow-2xl shadow-primary/20"
                    : "border-white/5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-bold">
                    Más popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <plan.icon
                    size={40}
                    className={`mx-auto mb-4 ${
                      plan.popular ? "text-primary" : "text-text-muted"
                    }`}
                  />
                  <h3 className="text-2xl font-primary font-bold">
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-4xl font-primary font-bold">
                      {plan.price}
                    </span>
                    <span className="text-text-muted">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <FaStar
                        size={14}
                        className={
                          plan.popular ? "text-primary" : "text-text-muted"
                        }
                      />
                      <span className="text-text-muted text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-4 rounded-full font-bold transition ${
                    plan.popular
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-white/5 text-text hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vs-snaptube" className="py-24 px-6 bg-background-light/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-primary font-bold mb-4">
              ¿Por qué elegir <span className="text-primary">Musify</span> sobre{" "}
              <span className="text-red-500">SnapTube</span>?
            </h2>
            <p className="text-xl text-text-muted">
              La comparación es clara. Descubre por qué miles de usuarios migran
              a Musify cada día.
            </p>
          </div>

          <div className="space-y-6">
            {snaptubeAdvantages.map((adv, index) => (
              <div
                key={index}
                className="bg-background-light rounded-2xl p-6 border border-white/5"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h3 className="text-xl font-primary font-bold text-white">
                    {adv.title}
                  </h3>
                  <div className="flex gap-4 md:ml-auto">
                    <span className="text-sm text-text-muted">
                      Musify:{" "}
                      <span className="text-green-500 font-semibold">
                        {adv.musify}
                      </span>
                    </span>
                    <span className="text-sm text-text-muted">
                      SnapTube:{" "}
                      <span className="text-red-400 font-semibold">
                        {adv.snaptube}
                      </span>
                    </span>
                  </div>
                </div>
                <p className="text-text-muted">{adv.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/app"
              className="inline-block px-10 py-5 bg-primary font-secondary font-bold text-white rounded-full hover:opacity-90 transition shadow-2xl shadow-primary/40"
            >
              Probar Musify gratis
            </Link>
          </div>
        </div>
      </section>

      <section id="creator" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-primary font-bold mb-4">
              El <span className="text-primary">creador</span>
            </h2>
            <p className="text-xl text-text-muted">
              Conoce a la persona detrás de Musify
            </p>
          </div>

          <div className="bg-background-light rounded-3xl p-10 border border-white/5">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <FaUser className="text-5xl text-white" />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-primary font-bold mb-2">
                  Gian Carlos
                </h3>
                <p className="text-primary font-semibold mb-4">
                  Fundador y desarrollador principal
                </p>
                <p className="text-text-muted leading-relaxed">
                  Soy un desarrollador independiente apasionado por la música y
                  la tecnología. Creé Musify porque quería una plataforma que
                  realmente entendiera las necesidades de los hispanohablantes:
                  una app que fuera{" "}
                  <span className="text-white">
                    intuitiva, completa y sin barreras de idioma.
                  </span>
                </p>
                <p className="text-text-muted leading-relaxed mt-4">
                  Cada línea de código de Musify está escrita con dedicación y
                  con el objetivo de mejorar la experiencia musical de nuestros
                  usuarios. ¡Gracias por ser parte de esta aventura!
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaDiscord className="text-xl" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="py-24 px-6 bg-background-light/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-primary font-bold mb-4">
              ¿Por qué usar <span className="text-primary">Musify</span>?
            </h2>
            <p className="text-xl text-text-muted">
              7 razones que te convencerán
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FaList,
                title: "100% Legal y seguro",
                description:
                  "Operamos dentro del marco legal. Sin malware, sin spyware, sin sorpresas ocultas.",
              },
              {
                icon: FaGlobe,
                title: "Totalmente en español",
                description:
                  "Cada elemento de la app está traducido. documentación, soporte y comunidad.",
              },
              {
                icon: FaMobile,
                title: "Experiencia multiplataforma",
                description:
                  "Web, Windows, macOS, Linux, Android e iOS. Tu música en todos tus dispositivos.",
              },
              {
                icon: FaBolt,
                title: "Rápido y ligero",
                description:
                  "App optimizada para funcionar smoothly incluso en dispositivos antiguos.",
              },
              {
                icon: FaComments,
                title: "Comunidad activa",
                description:
                  "Únete a miles de usuarios, participa en discusiones y descubre nueva música.",
              },
              {
                icon: FaStar,
                title: "Actualizaciones constantes",
                description:
                  "Nuevas funciones cada mes. Siempre mejorando basándote en tus comentarios.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-background-light p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition"
              >
                <item.icon className="text-4xl text-primary mb-4" />
                <h3 className="text-xl font-primary font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-primary font-bold mb-4">
              Todas las <span className="text-primary">funcionalidades</span>
            </h2>
            <p className="text-xl text-text-muted">
              Descubre todo lo que Musify puede hacer por ti
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-background-light p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition hover:bg-background-light/80"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition">
                  <feature.icon className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-primary font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-primary/20 to-background-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-primary font-bold mb-6">
            ¿Listo para probar <span className="text-primary">Musify</span>?
          </h2>
          <p className="text-xl text-text-muted mb-10">
            Únete a más de 1 millón de usuarios que ya disfrutan de la mejor
            experiencia musical. Es gratis y no requiere tarjeta de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-10 py-5 bg-primary font-secondary font-bold text-white rounded-full hover:opacity-90 transition shadow-2xl shadow-primary/40"
            >
              Crear cuenta gratis
            </Link>
            <Link
              href="/app"
              className="px-10 py-5 bg-white/10 font-secondary font-bold text-white rounded-full hover:bg-white/20 transition"
            >
              Explorar demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-white/5 bg-background-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-primary font-bold mb-4">Musify</h3>
              <p className="text-text-muted text-sm">
                Tu biblioteca musical personal. Descarga, organiza y disfruta
                sin límites.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-primary transition"
                  >
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="#plans" className="hover:text-primary transition">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="hover:text-primary transition">
                    App
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Compañía</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>
                  <Link
                    href="#creator"
                    className="hover:text-primary transition"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Carreras
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Soporte</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              © 2026 Musify. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaDiscord className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
