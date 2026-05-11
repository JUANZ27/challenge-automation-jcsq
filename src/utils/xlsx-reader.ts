import XLSX from 'xlsx';
import { environment } from '../config/environment.js';

export interface PokemonRow {
  id: number;
  name: string;
  abilities: string[];
}

export function readPokemonRows(): PokemonRow[] {
  const workbook = XLSX.readFile(environment.dataFilePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, string | number>>(sheet, { defval: '' });

  return rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name).trim().toLowerCase(),
    abilities: String(row.abilities)
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  }));
}
