'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Lädt...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Lernspiel Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hallo, {user.email}!</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Willkommen im Dashboard!</h2>
            <div className="space-y-2">
              <p><strong>E-Mail:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Rolle:</strong> {user.role}</p>
            </div>

            {/* Rollenbasierte Funktionen */}
            {user.role === 'admin' && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-red-700">Admin-Funktionen</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Benutzerverwaltung</li>
                  <li>Systemstatistiken</li>
                  <li>Alle Kurse und Sitzungen einsehen</li>
                </ul>
              </div>
            )}
            {user.role === 'teacher' && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Lehrer-Funktionen</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Kurse verwalten</li>
                  <li>Schülerfortschritt einsehen</li>
                  <li>Materialien hochladen</li>
                </ul>
              </div>
            )}
            {user.role === 'student' && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Schüler-Funktionen</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Spielsitzung starten</li>
                  <li>Lernmaterial ansehen</li>
                  <li>Fortschritt überprüfen</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
