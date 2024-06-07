import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-3">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Hey there!</h1>
          <p className="text-base text-[#6a7380]">
            Sign-in or Sign-up to get to your dashboard!
          </p>
        </div>

        <div className="mt-6">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <div className="flex items-center justify-center h-32 ">
              <Loader2
                size={32}
                className="animate-spin text-muted-foreground text-[#2E2A47]"
              />
            </div>
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full hidden bg-blue-400 lg:flex items-center justify-center">
        <Image src="/images/logo.svg" alt="Sign-in" width={300} height={300} />
      </div>
    </div>
  );
}
