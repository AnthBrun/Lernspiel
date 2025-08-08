'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import socket from '@/lib/socket';

interface EconomicIndicators {
  inflation: number;
  unemployment: number;
  gdpGrowth: number;
  publicSentiment: number;
}

interface GameState {
  currentRound: number;
  totalRounds: number;
  timeRemaining: string;
  scenarioTitle: string;
  playerRole: string;
  indicators: EconomicIndicators;
}

export default function GameUI() {
  const [socketStatus, setSocketStatus] = useState('Connecting...');
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 3,
    totalRounds: 6,
    timeRemaining: '23:45',
    scenarioTitle: 'Inflation Crisis Response',
    playerRole: 'Minister of Finance',
    indicators: {
      inflation: 7.2,
      unemployment: 6.8,
      gdpGrowth: 2.1,
      publicSentiment: 52
    }
  });

  useEffect(() => {
    socket.connect();

    socket.emit('ping');
    socket.on('pong', () => setSocketStatus('🟢 Connected'));
    
    // Listen for game state updates
    socket.on('gameStateUpdate', (newState: GameState) => {
      setGameState(newState);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAction = (actionId: string) => {
    socket.emit('playerAction', { actionId, playerId: 'current-player' });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Game Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₿</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    {gameState.scenarioTitle}
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Round {gameState.currentRound} of {gameState.totalRounds} • Advanced Scenario
                  </p>
                </div>
              </div>
              
              {/* Game Status */}
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700 dark:text-gray-300">{socketStatus}</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  ⏱️ {gameState.timeRemaining} remaining
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <Link 
                href="/lobby"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Leave Game
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Game Area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Economic Dashboard */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Economic Indicators
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">Inflation</span>
                    <span className="text-red-600 dark:text-red-400">📈</span>
                  </div>
                  <div className="text-2xl font-bold text-red-800 dark:text-red-200">
                    {gameState.indicators.inflation}%
                  </div>
                  <div className="text-xs text-red-600 dark:text-red-400">+1.8% from last round</div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Unemployment</span>
                    <span className="text-yellow-600 dark:text-yellow-400">👥</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                    {gameState.indicators.unemployment}%
                  </div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">-0.2% from last round</div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">GDP Growth</span>
                    <span className="text-blue-600 dark:text-blue-400">📊</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {gameState.indicators.gdpGrowth}%
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Stable</div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Public Sentiment</span>
                    <span className="text-purple-600 dark:text-purple-400">😐</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                    {gameState.indicators.publicSentiment}%
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">-8% from last round</div>
                </div>
              </div>
            </div>

            {/* Current Situation */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Current Situation
              </h3>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <span className="text-amber-600 dark:text-amber-400 text-xl">⚠️</span>
                  <div>
                    <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
                      Supply Chain Disruptions Escalate
                    </h4>
                    <p className="text-amber-700 dark:text-amber-300">
                      Major shipping delays and energy price spikes are driving inflation higher. 
                      The public is demanding immediate action while businesses warn of potential layoffs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p>
                  As {gameState.playerRole}, you must respond to mounting inflationary pressures while 
                  balancing competing demands from various stakeholders. The Central Bank is considering 
                  interest rate adjustments, while your party&apos;s economists are split between traditional 
                  austerity measures and MMT-inspired approaches.
                </p>
              </div>
            </div>

            {/* Available Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Available Actions
              </h3>
              <div className="grid gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Implement Targeted Tax Cuts
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        Reduce taxes on essential goods to help consumers cope with rising prices.
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>💰 Cost: $15B</span>
                        <span>⏱️ Takes effect: Immediate</span>
                        <span>🎯 Impact: Consumer relief</span>
                      </div>
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="text-xs text-center">
                        <div className="text-green-600 dark:text-green-400 font-medium">MMT View</div>
                        <div className="text-green-700 dark:text-green-300">Recommended</div>
                      </div>
                      <div className="text-xs text-center">
                        <div className="text-amber-600 dark:text-amber-400 font-medium">Traditional</div>
                        <div className="text-amber-700 dark:text-amber-300">Cautious</div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAction('tax-cuts')}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Take Action
                  </button>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Coordinate with Central Bank
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        Work with the Central Bank to develop a coordinated monetary-fiscal response.
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>💰 Cost: No direct cost</span>
                        <span>⏱️ Takes effect: Next round</span>
                        <span>🎯 Impact: Policy coordination</span>
                      </div>
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="text-xs text-center">
                        <div className="text-blue-600 dark:text-blue-400 font-medium">MMT View</div>
                        <div className="text-blue-700 dark:text-blue-300">Neutral</div>
                      </div>
                      <div className="text-xs text-center">
                        <div className="text-green-600 dark:text-green-400 font-medium">Traditional</div>
                        <div className="text-green-700 dark:text-green-300">Recommended</div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAction('coordinate-cb')}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Take Action
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Your Role */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Your Role
              </h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🏛️</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{gameState.playerRole}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Government Official</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Budget Authority:</span>
                  <span className="font-medium text-gray-900 dark:text-white">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Information Access:</span>
                  <span className="font-medium text-gray-900 dark:text-white">Full</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Public Influence:</span>
                  <span className="font-medium text-gray-900 dark:text-white">Very High</span>
                </div>
              </div>
            </div>

            {/* Other Players */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Other Players
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🏦</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">Central Bank Governor</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">EcoPlayer23</div>
                    </div>
                  </div>
                  <div className="text-green-500">●</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">⚖️</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">Opposition Leader</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">PolicyCritic</div>
                    </div>
                  </div>
                  <div className="text-green-500">●</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📺</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">Media Representative</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">NewsHound</div>
                    </div>
                  </div>
                  <div className="text-green-500">●</div>
                </div>
              </div>
            </div>

            {/* Game Progress */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Game Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Round Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {gameState.currentRound} / {gameState.totalRounds}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${(gameState.currentRound / gameState.totalRounds) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Success Criteria</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Keep inflation under 5%</span>
                      <span className="text-red-600 dark:text-red-400">❌</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Maintain employment &gt; 94%</span>
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Public confidence &gt; 60%</span>
                      <span className="text-red-600 dark:text-red-400">❌</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Log */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Actions
              </h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-blue-500 pl-3">
                  <div className="font-medium text-gray-900 dark:text-white">Central Bank raised rates to 4.5%</div>
                  <div className="text-gray-600 dark:text-gray-400">Round 2 • Central Bank Governor</div>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <div className="font-medium text-gray-900 dark:text-white">Emergency infrastructure spending approved</div>
                  <div className="text-gray-600 dark:text-gray-400">Round 2 • You</div>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <div className="font-medium text-gray-900 dark:text-white">Opposition called for budget cuts</div>
                  <div className="text-gray-600 dark:text-gray-400">Round 1 • Opposition Leader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
