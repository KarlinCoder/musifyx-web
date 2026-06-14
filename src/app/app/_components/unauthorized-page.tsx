import Link from "next/link";
import { RiVipDiamondFill } from "react-icons/ri";

export default function UnauthorizedPage() {
  return (
    <div className="size-full flex flex-col gap-3 justify-center items-center">
      <div>
        <RiVipDiamondFill size={40} className="text-white" />
      </div>

      <h2 className="text-text-muted text-sm">
        Solo usuarios con suscripcion de pago pueden acceder a esta
        funcionalidad
      </h2>

      <Link
        target="_blank"
        href="/plans"
        className="block bg-primary rounded-full text-sm px-6 py-2"
      >
        Ver planes
      </Link>
    </div>
  );
}
