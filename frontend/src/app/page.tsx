import Link from "next/link";
import { GameCard } from "@/components/GameCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Economics Learning Game
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Explore MMT vs Traditional Economics
                </p>
              </div>
            </div>
            <nav className="flex space-x-6">
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                About
              </Link>
              <Link 
                href="/learning" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Learning Center
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learn Economics Through Interactive Gameplay
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Experience different economic theories firsthand by playing as government officials, 
            central bankers, business leaders, and citizens in realistic economic scenarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/lobby"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Playing
            </Link>
            <Link 
              href="/scenarios"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Browse Scenarios
            </Link>
          </div>
        </div>

        {/* Game Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <GameCard
            title="Role-Based Gameplay"
            description="Play as different economic actors with unique powers and information access"
            icon="🎭"
            href="/roles"
          />
          <GameCard
            title="Economic Scenarios"
            description="Navigate realistic crises: inflation, recession, debt management, and more"
            icon="📊"
            href="/scenarios"
          />
          <GameCard
            title="Theory Comparison"
            description="Compare MMT and Traditional economics approaches side-by-side"
            icon="⚖️"
            href="/learning"
          />
          <GameCard
            title="Real-Time Multiplayer"
            description="Collaborate or compete with other players in live sessions"
            icon="🌐"
            href="/lobby"
          />
          <GameCard
            title="Educational Content"
            description="Access tutorials, case studies, and expert analysis"
            icon="📚"
            href="/learning"
          />
          <GameCard
            title="Performance Analytics"
            description="Track decisions and outcomes to improve your economic understanding"
            icon="📈"
            href="/profile"
          />
        </div>

        {/* Recent Scenarios Preview */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Popular Scenarios
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Inflation Crisis Response
                </h4>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  Advanced
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Navigate rising inflation while maintaining economic stability. 
                Compare MMT and traditional policy approaches.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">45-60 mins</span>
                <Link 
                  href="/scenarios/inflation-crisis"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Public Investment Planning
                </h4>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Intermediate
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Design infrastructure spending programs and analyze their 
                economic impact through different theoretical lenses.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">30-45 mins</span>
                <Link 
                  href="/scenarios/public-investment"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold mb-4">Game</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/lobby" className="hover:text-white">Play Now</Link></li>
                <li><Link href="/scenarios" className="hover:text-white">Scenarios</Link></li>
                <li><Link href="/roles" className="hover:text-white">Roles</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Learn</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/learning" className="hover:text-white">Learning Center</Link></li>
                <li><Link href="/tutorials" className="hover:text-white">Tutorials</Link></li>
                <li><Link href="/glossary" className="hover:text-white">Glossary</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Community</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/leaderboard" className="hover:text-white">Leaderboard</Link></li>
                <li><Link href="/forums" className="hover:text-white">Forums</Link></li>
                <li><Link href="/profile" className="hover:text-white">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">About</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Project</Link></li>
                <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Economics Learning Game. Educational project exploring economic theory through interactive gameplay.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
