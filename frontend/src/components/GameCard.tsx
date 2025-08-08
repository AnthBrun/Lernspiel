import Link from "next/link";

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export function GameCard({ title, description, icon, href }: GameCardProps) {
  return (
    <Link 
      href={href}
      className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6"
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
      <div className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
        Explore
        <svg 
          className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
