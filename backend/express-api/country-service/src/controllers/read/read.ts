import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [countries, total] = await prisma.$transaction([
      prisma.country.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          name: 'asc',
        },
      }),
      prisma.country.count(),
    ]);

    if (!countries.length) {
      return res.status(404).json({ error: 'No countries found' });
    }

    res.status(200).json({
      data: countries,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries: ' + error });
  }
};

export const getCountryByName = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: 'Country name is required' });
    }
    const country = await prisma.country.findFirst({
      where: {
        name: {
          path: ['common'],
          equals: name,
        },
      },
    });
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country' });
  }
};
