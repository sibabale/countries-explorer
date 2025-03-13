import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.country.deleteMany();

    const response = await axios.get('https://restcountries.com/v3.1/all', {
      timeout: 10000,
      headers: {
        Accept: 'application/json',
      },
    });

    const allCountries = response.data as any[];

    // Map only the fields that match our schema
    const mappedCountries = allCountries.map((country: any) => ({
      name: {
        common: country.name.common,
        official: country.name.official,
        nativeName: country.name.nativeName || {},
      },
      tld: country.tld || [],
      independent: country.independent,
      status: country.status,
      unMember: country.unMember,
      currencies: country.currencies || {},
      idd: country.idd || {},
      capital: country.capital || [],
      region: country.region,
      subregion: country.subregion,
      languages: country.languages || {},
      latlng: country.latlng || [],
      landlocked: country.landlocked,
      flag: country.flag,
      maps: country.maps || {},
      population: country.population,
      timezones: country.timezones || [],
      continents: country.continents || [],
      flags: country.flags || {},
      startOfWeek: country.startOfWeek,
      capitalInfo: country.capitalInfo || {},
      postalCode: country.postalCode || null,
      borders: country.borders || [],
    }));

    // Use transaction for better performance
    await prisma.$transaction(
      mappedCountries.map((country: any) =>
        prisma.country.create({
          data: country,
        }),
      ),
    );

    console.log(`Seeded ${mappedCountries.length} countries successfully`);
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
