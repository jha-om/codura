import { SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignUpButton>
          <button
            className="group rounded-2xl pl-5 bg-blue-400 hover:bg-blue-500 hover:rounded-none transition-all duration-400 ease-out py-6 text-lg font-medium hover:px-6"
          >
            <span className="flex items-center transition-all duration-300 ease-out">
              Sign Up
              <ArrowRightIcon className="ml-0 size-5 opacity-0 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-x-2" />
            </span>
          </button>
        </SignUpButton>
      </SignedOut>

      <UserButton />
    </div>
  );
}
