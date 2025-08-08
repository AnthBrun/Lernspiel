import Link from "next/link";

export default function Scenarios() {
  const scenarios = [
    {
      id: 'inflation-crisis',
      title: 'Inflation Crisis Response',
      difficulty: 'Advanced',
      duration: '45-60 mins',
      description: 'Navigate rising inflation while maintaining economic stability. Compare MMT and traditional policy approaches in a high-stakes environment.',
      players: '4-6',
      roles: ['Government', 'Central Bank', 'Opposition', 'Media', 'Business', 'Citizens'],
      objectives: ['Keep inflation under 5%', 'Maintain employment above 94%', 'Preserve public confidence'],
      realWorldContext: 'Based on 2021-2022 global inflation surge',
      difficultyColor: 'bg-red-100 text-red-800',
      featured: true
    },
    {
      id: 'public-investment',
      title: 'Public Investment Planning',
      difficulty: 'Intermediate',
      duration: '30-45 mins', 
      description: 'Design infrastructure spending programs and analyze their economic impact through different theoretical lenses.',
      players: '3-5',
      roles: ['Government', 'Central Bank', 'Business', 'Academic', 'Citizens'],
      objectives: ['Boost GDP growth by 2%', 'Create 50,000 jobs', 'Maintain budget sustainability'],
      realWorldContext: 'Inspired by New Deal and modern Green New Deal proposals',
      difficultyColor: 'bg-yellow-100 text-yellow-800',
      featured: true
    },
    {
      id: 'employment-crisis',
      title: 'Employment Crisis Management',
      difficulty: 'Expert',
      duration: '60-75 mins',
      description: 'Address mass unemployment through policy interventions. Explore job guarantee vs traditional approaches.',
      players: '4-8',
      roles: ['Government', 'Central Bank', 'Opposition', 'Labor Union', 'Business', 'Media', 'Academic'],
      objectives: ['Reduce unemployment to under 6%', 'Maintain wage growth', 'Avoid economic recession'],
      realWorldContext: '2008 Financial Crisis and COVID-19 pandemic responses',
      difficultyColor: 'bg-purple-100 text-purple-800',
      featured: false
    },
    {
      id: 'debt-management',
      title: 'Government Debt Crisis',
      difficulty: 'Advanced',
      duration: '45-60 mins',
      description: 'Manage rising public debt while maintaining essential services. Compare MMT and traditional fiscal approaches.',
      players: '4-6',
      roles: ['Government', 'Central Bank', 'Opposition', 'International', 'Business', 'Citizens'],
      objectives: ['Stabilize debt-to-GDP ratio', 'Maintain public services', 'Preserve market confidence'],
      realWorldContext: 'European debt crisis and modern sovereign debt debates',
      difficultyColor: 'bg-red-100 text-red-800',
      featured: false
    },
    {
      id: 'climate-economics',
      title: 'Climate Transition Economics',
      difficulty: 'Intermediate',
      duration: '50-65 mins',
      description: 'Finance the transition to a green economy while managing economic disruption and social equity.',
      players: '5-7',
      roles: ['Government', 'Central Bank', 'Environmental', 'Business', 'Labor', 'Academic'],
      objectives: ['Reduce emissions by 40%', 'Create green jobs', 'Manage transition costs'],
      realWorldContext: 'Based on global climate policy and green transition challenges',
      difficultyColor: 'bg-green-100 text-green-800',
      featured: true
    },
    {
      id: 'international-trade',
      title: 'Trade War Response',
      difficulty: 'Advanced',
      duration: '40-55 mins',
      description: 'Navigate international trade conflicts and their domestic economic impacts.',
      players: '4-6',
      roles: ['Government', 'Central Bank', 'Business', 'Labor', 'International', 'Academic'],
      objectives: ['Minimize trade disruption', 'Protect domestic industries', 'Maintain international relations'],
      realWorldContext: 'US-China trade tensions and global supply chain disruptions',
      difficultyColor: 'bg-red-100 text-red-800',
      featured: false
    }
  ];

  const featuredScenarios = scenarios.filter(s => s.featured);
  const allScenarios = scenarios;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Economic Scenarios
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Explore real-world economic challenges
                </p>
              </div>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/lobby" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Play Now
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Scenarios */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Scenarios
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredScenarios.map((scenario) => (
              <div key={scenario.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-4">
                      {scenario.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${scenario.difficultyColor}`}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {scenario.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-20">👥 Players:</span>
                      <span>{scenario.players}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-20">⏱️ Duration:</span>
                      <span>{scenario.duration}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-20 flex-shrink-0">🎭 Roles:</span>
                      <span className="flex-1">{scenario.roles.slice(0, 3).join(', ')}{scenario.roles.length > 3 && ` +${scenario.roles.length - 3} more`}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link 
                      href={`/scenarios/${scenario.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Learn More
                    </Link>
                    <Link 
                      href={`/lobby?scenario=${scenario.id}`}
                      className="flex-1 border border-blue-600 text-blue-600 dark:text-blue-400 text-center py-2 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium"
                    >
                      Play Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Scenarios */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            All Scenarios
          </h2>
          
          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty:</label>
                <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration:</label>
                <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                  <option>Any Duration</option>
                  <option>Under 30 mins</option>
                  <option>30-45 mins</option>
                  <option>45-60 mins</option>
                  <option>Over 60 mins</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic:</label>
                <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                  <option>All Topics</option>
                  <option>Inflation</option>
                  <option>Employment</option>
                  <option>Public Investment</option>
                  <option>Debt Management</option>
                  <option>Trade</option>
                  <option>Climate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scenarios Grid */}
          <div className="space-y-4">
            {allScenarios.map((scenario) => (
              <div key={scenario.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-6">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mr-3">
                          {scenario.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${scenario.difficultyColor}`}>
                          {scenario.difficulty}
                        </span>
                        {scenario.featured && (
                          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {scenario.description}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <strong>Real-world context:</strong> {scenario.realWorldContext}
                      </div>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <span>👥 {scenario.players} players</span>
                        <span>⏱️ {scenario.duration}</span>
                        <span>🎯 {scenario.objectives.length} objectives</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 w-32">
                      <Link 
                        href={`/scenarios/${scenario.id}`}
                        className="bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Details
                      </Link>
                      <Link 
                        href={`/lobby?scenario=${scenario.id}`}
                        className="border border-blue-600 text-blue-600 dark:text-blue-400 text-center py-2 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm font-medium"
                      >
                        Play
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
