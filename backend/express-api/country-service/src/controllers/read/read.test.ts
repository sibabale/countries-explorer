const mCountry = {
  findMany: jest.fn(),
  count: jest.fn(),
  findFirst: jest.fn(),
};

const mPrismaClient = {
  $transaction: jest.fn(),
  country: mCountry,
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mPrismaClient),
}));

const { getAllCountries, getCountryByName } = require('./read');

describe('getAllCountries Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return countries with meta information when data is found', async () => {
    const dummyCountries = [
      { id: 1, name: { common: 'Country A' } },
      { id: 2, name: { common: 'Country B' } },
    ];
    const totalCount = 2;
    mPrismaClient.$transaction.mockResolvedValue([dummyCountries, totalCount]);

    const req = { query: { page: '1', limit: '10' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await getAllCountries(req, res);

    expect(mPrismaClient.$transaction).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: dummyCountries,
      meta: {
        total: totalCount,
        page: 1,
        limit: 10,
        pages: Math.ceil(totalCount / 10),
      },
    });
  });

  it('should return 404 when no countries are found', async () => {
    mPrismaClient.$transaction.mockResolvedValue([[], 0]);

    const req = { query: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await getAllCountries(req, res);

    expect(mPrismaClient.$transaction).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No countries found' });
  });

  it('should return 500 on server error', async () => {
    mPrismaClient.$transaction.mockRejectedValue(new Error('DB error'));

    const req = { query: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await getAllCountries(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to fetch countries: Error: DB error',
    });
  });
});

describe('getCountryByName Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if country name is not provided', async () => {
    const req = { query: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await getCountryByName(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Country name is required',
    });
  });

  it('should return 404 if country is not found', async () => {
    mPrismaClient.country.findFirst.mockResolvedValue(null);

    const req = { query: { name: 'Nonexistent Country' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await getCountryByName(req, res);

    expect(mPrismaClient.country.findFirst).toHaveBeenCalledWith({
      where: {
        name: {
          path: ['common'],
          equals: 'Nonexistent Country',
        },
      },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Country not found' });
  });

  it('should return country data if found', async () => {
    const dummyCountry = { id: 1, name: { common: 'Country A' } };
    mPrismaClient.country.findFirst.mockResolvedValue(dummyCountry);

    const req = { query: { name: 'Country A' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await getCountryByName(req, res);

    expect(mPrismaClient.country.findFirst).toHaveBeenCalledWith({
      where: {
        name: {
          path: ['common'],
          equals: 'Country A',
        },
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(dummyCountry);
  });

  it('should return 500 on server error', async () => {
    mPrismaClient.country.findFirst.mockRejectedValue(new Error('DB error'));

    const req = { query: { name: 'Country A' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await getCountryByName(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch country' });
  });
});
