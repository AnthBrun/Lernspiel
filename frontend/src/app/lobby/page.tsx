export default function Lobby() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Game Lobby
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Join or create a multiplayer session
                </p>
              </div>
            </div>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Home
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Available Game Sessions
              </h2>
              
              {/* Session List */}
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Inflation Crisis Simulation
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Host: EconomicsProf • Advanced Level
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Open
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👥 3/6 players</span>
                      <span>⏱️ 45 mins</span>
                      <span>🎭 Multiple roles available</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Join Game
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Public Investment Planning
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Host: PolicyMaker • Intermediate Level
                      </p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Starting Soon
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👥 5/6 players</span>
                      <span>⏱️ 30 mins</span>
                      <span>🎭 Government role needed</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Join Game
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 opacity-60">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Employment Crisis Response
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Host: StudentTeacher • Expert Level
                      </p>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      In Progress
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👥 6/6 players</span>
                      <span>⏱️ 25 mins left</span>
                      <span>🎭 All roles filled</span>
                    </div>
                    <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                      Full
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Create Session & Quick Actions */}
          <div className="space-y-6">
            {/* Create New Session */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Create New Session
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scenario
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                    <option>Inflation Crisis Response</option>
                    <option>Public Investment Planning</option>
                    <option>Employment Crisis</option>
                    <option>Budget Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                    placeholder="My Economics Game"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Players
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                    <option>4 players</option>
                    <option>6 players</option>
                    <option>8 players</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="public" className="rounded" />
                  <label htmlFor="public" className="text-sm text-gray-700 dark:text-gray-300">
                    Make session public
                  </label>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  Create Session
                </button>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎲</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Random Match</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Join any available game</div>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Practice Mode</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Play with AI opponents</div>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Tutorial</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Learn how to play</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Online Players */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Online Now
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  247
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  players online
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">In Lobby:</span>
                  <span className="font-medium text-gray-900 dark:text-white">23</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Playing:</span>
                  <span className="font-medium text-gray-900 dark:text-white">224</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
