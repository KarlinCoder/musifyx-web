interface Props {
  title: string;
  message: string;
}

export default function ToastError({ message, title }: Props) {
  return (
    <div className="-space-y-1">
      <p className="text-base">{title}</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
