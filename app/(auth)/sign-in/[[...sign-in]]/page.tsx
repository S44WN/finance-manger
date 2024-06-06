import { SignIn } from "@clerk/nextjs";

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
          <SignIn />
        </div>
      </div>
    </div>
  );
}
