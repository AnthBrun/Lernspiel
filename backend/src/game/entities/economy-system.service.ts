import economySystems from './economy_models/planwirtschaft.json';

console.log('Loaded economy systems:', economySystems);

export class EconomySystemService {
  getAllSystems() {
    return economySystems;
  }

  getSystemByName(name: string) {
    //if (!economySystems) return null;
    return economySystems.find(sys => sys.name === name);
  }
}
