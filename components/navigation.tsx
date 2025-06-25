"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Music, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Find Artists", href: "/artists" },
  { name: "Join as Artist", href: "/onboard" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Music className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-2 h-2 text-white m-0.5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Artistly
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">Find Perfect Artists</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105",
                  pathname === item.href
                    ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/80"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-sm"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Link href="/onboard">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 py-1.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-xs"
            >
              <Link href="/onboard">Get Started</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative w-10 h-10 rounded-full hover:bg-blue-50 transition-colors duration-300"
                >
                  <Menu className={cn("h-5 w-5 text-gray-600 transition-all duration-300", isOpen && "rotate-90 opacity-0")} />
                  <X className={cn("h-5 w-5 text-gray-600 absolute transition-all duration-300", !isOpen && "rotate-90 opacity-0")} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] bg-white/95 backdrop-blur-xl border-l border-gray-200/50"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 pb-8 pt-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-lg flex items-center justify-center">
                      <Music className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                      Artistly
                    </span>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-2 py-8 flex-1">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "relative flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 group",
                          pathname === item.href
                            ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/80"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={cn(
                          "w-2 h-2 rounded-full mr-3 transition-all duration-300",
                          pathname === item.href
                            ? "bg-white shadow-lg"
                            : "bg-blue-300 group-hover:bg-blue-500"
                        )} />
                        {item.name}
                        {pathname === item.href && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-sm"></div>
                        )}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Footer */}
                  <div className="border-t border-gray-100 pt-6 pb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-4">Ready to showcase your talent?</p>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/onboard">Join as Artist</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}