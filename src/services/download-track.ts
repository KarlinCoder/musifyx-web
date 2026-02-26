export const downloadTrack = (trackId: number) => {
  console.log(trackId);

  return new Promise<string>((resolve) =>
    setTimeout(() => {
      resolve("");
    }, 4000),
  );
};
