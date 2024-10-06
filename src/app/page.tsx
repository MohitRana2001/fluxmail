import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-toggle"
import { Spotlight } from "@/components/ui/spotlight"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Normal Human</Link>
        <nav className="flex items-center space-x-4">
          <Link href="/sign-in" className="text-sm hover:underline">Sign In</Link>
          <Link href="/sign-up" className="text-sm hover:underline">Sign Up</Link>
          <ModeToggle />
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <Spotlight
          className="top-20 left-0 md:left-60 md:-top-40"
          fill=""
        />
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-600 to-gray-900 text-transparent bg-clip-text dark:text-gray-200 ">
            The minimalistic, AI-powered email client.
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
            Normal Human empowers you to manage your email with ease, using advanced AI and a clean interface.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/mail">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://start-saas.com?utm=normalhuman">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 w-full max-w-5xl">
          <h2 className="text-3xl font-semibold mb-8">Experience the power of:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-driven email RAG",
                description: "Automatically prioritize your emails with our advanced AI system."
              },
              {
                title: "Full-text search",
                description: "Quickly find any email with our powerful search functionality."
              },
              {
                title: "Shortcut-focused interface",
                description: "Navigate your inbox efficiently with our intuitive keyboard shortcuts."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card text-card-foreground rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 w-full max-w-5xl">
          <Image
            src="/demo.png"
            alt="Normal Human Email Client Demo"
            width={1000}
            height={562}
            className="rounded-lg shadow-2xl transition-all hover:shadow-3xl hover:scale-[102%]"
          />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Normal Human. All rights reserved.
      </footer>     
    </div>
  )
}