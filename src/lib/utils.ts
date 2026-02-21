import { FastAverageColor } from "fast-average-color";

export const formatSecondsToMinutes = (seconds: number): string => {
  if (seconds < 0) seconds = 0;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const genericBlur =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMzMzIi8+Cjwvc3ZnPg==";

export const getAverageColor = async (imgUrl: string) => {
  const fac = new FastAverageColor();
  const color = await fac.getColorAsync(imgUrl);
  return color.hex;
};

export function formatDateToSpanish(date: string | Date): string {
  const d = new Date(date);

  // verif basica de fecha valida
  if (isNaN(d.getTime())) {
    return "Fecha inválida";
  }

  const day = d.getDate();
  const year = d.getFullYear();

  const monthName = d.toLocaleDateString("es-ES", { month: "long" });

  return `${day} de ${monthName} del ${year}`;
}
