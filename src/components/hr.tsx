interface Props {
  className: string;
}

export default function Hr({ className }: Props) {
  return (
    <hr className={`text-white/16 rounded-full h-px w-full ${className}`} />
  );
}
