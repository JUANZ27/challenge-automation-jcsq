import { test, expect } from '../../src/fixtures/base-test.js';
import { readPokemonRows } from '../../src/utils/xlsx-reader.js';

const rows = readPokemonRows();

for (const row of rows) {
  test(`GET pokemon by id - ${row.id}`, async ({ request }) => {
    const startedAt = Date.now();
    const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${row.id}`);
    const body = await response.json();
    const elapsed = Date.now() - startedAt;

    expect(response.status()).toBe(200);
    expect(elapsed).toBeLessThan(10_000);
    expect(body.id).toBe(row.id);
    expect(body.name).toBe(row.name);
    expect(Array.isArray(body.abilities)).toBeTruthy();
    const names = body.abilities.map((item: { ability: { name: string } }) => item.ability.name.toLowerCase());
    expect(names).toEqual(expect.arrayContaining(row.abilities));
  });

  test(`GET pokemon by name - ${row.name}`, async ({ request }) => {
    const startedAt = Date.now();
    const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${row.name}`);
    const body = await response.json();
    const elapsed = Date.now() - startedAt;

    expect(response.status()).toBe(200);
    expect(elapsed).toBeLessThan(10_000);
    expect(body.id).toBe(row.id);
    expect(body.name).toBe(row.name);
  });
}
