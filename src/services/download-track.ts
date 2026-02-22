export const downloadTrack = (trackId: number) =>
  new Promise<string>((resolve) =>
    setTimeout(() => {
      resolve("");
    }, 4000),
  );
