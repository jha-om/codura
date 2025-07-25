import { currentUser } from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./theme-selector";
import LanguageSelector from "./language-selector";
import RunButton from "./run-button";
import HeaderProfileBtn from "./header-profile-btn";

export default async function Header() {
    const user = await currentUser();
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    console.log("user:::", user);
    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || ""
    })


    return (
        <div className="relative z-10">
            <div className="flex items-center lg:justify-between justify-center bg-[#0a0a0f]/80 border border-gray-800 backdrop-blur-xl p-6 mb-4 rounded-lg">
                <div className="hidden lg:flex items-center gap-8">
                    <Link href={"/"} className="flex items-center gap-3 group relative">

                        {/* logo */}
                        <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
                                ring-white/10 group-hover:ring-white/20 transition-all"
                        >
                            <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                        </div>

                        <div className="flex flex-col">
                            <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                                Codura
                            </span>
                            <span className="block h-0.5 w-2 bg-gradient-to-r from-blue-400 via-blue-300 -mt-1 ml-[15px]"></span>
                            <span className="block text-xs text-blue-400/60 font-medium">
                                Interactive Code Editor
                            </span>
                        </div>
                    </Link>

                    <nav className="flex items-center space-x-1">
                        <Link
                            href="/snippets"
                            className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                            <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors"
                            >
                                Snippets
                            </span>
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <ThemeSelector />
                        <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
                    </div>

                    {!convexUser?.isPro && (
                        <Link
                            href="/pricing"
                            className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-blue-500 hover:border-blue-500/80 hover:bg-transparent 
                transition-all duration-300"
                        >
                            <Sparkles className="w-4 h-4 text-blue-500 hover:text-blue-400" />
                            <span className="text-sm font-medium text-blue-400/90 hover:text-blue-400">
                                Pro
                            </span>
                        </Link>
                    )}

                    <SignedIn>
                        <RunButton />
                    </SignedIn>

                    <div className="pl-3 border-l border-gray-800">
                        <HeaderProfileBtn />
                    </div>
                </div>
            </div>
        </div>
    )
}