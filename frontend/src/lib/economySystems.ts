export async function fetchEconomySystems() {
  const res = await fetch('http://localhost:3000/economy-systems');
  if (!res.ok) throw new Error('Failed to fetch economy systems');
  return res.json();
}

export async function fetchEconomySystem(name: string) {
  const res = await fetch(`http://localhost:3000/economy-systems/${name}`);
  if (!res.ok) throw new Error('Failed to fetch economy system');
  return res.json();
}
