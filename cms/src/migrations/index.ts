import * as migration_20251026_101139 from './20251026_101139';
import * as migration_20251026_101437 from './20251026_101437';

export const migrations = [
  {
    up: migration_20251026_101139.up,
    down: migration_20251026_101139.down,
    name: '20251026_101139',
  },
  {
    up: migration_20251026_101437.up,
    down: migration_20251026_101437.down,
    name: '20251026_101437'
  },
];
