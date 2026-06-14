import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

export default function AccountPage() {
  return (
    <div className="flex justify-center p-10">
      <UserProfile appearance={{ theme: dark }} />
    </div>
  );
}
