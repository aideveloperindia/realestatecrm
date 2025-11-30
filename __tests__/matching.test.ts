import { calculateMatchScore } from '../lib/utils/matching';
import { ICustomer } from '../lib/models/Customer';
import { IProperty } from '../lib/models/Property';

describe('Matching Algorithm', () => {
  const sampleCustomer: ICustomer = {
    _id: 'customer1' as any,
    name: 'Test Customer',
    phone: '+919876543210',
    budget_min: 2000000,
    budget_max: 5000000,
    preferred_types: ['apartment', 'house'],
    preferred_locations: {
      city: 'Karimnagar',
      locality: 'Town Center',
    },
    opt_in_whatsapp: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as ICustomer;

  const sampleProperty: IProperty = {
    _id: 'property1' as any,
    title: 'Test Property',
    type: 'apartment',
    price: 3500000,
    location: {
      city: 'Karimnagar',
      locality: 'Town Center',
    },
    client_id: 'client1' as any,
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as IProperty;

  test('calculates perfect match score', () => {
    const result = calculateMatchScore(sampleCustomer, sampleProperty);

    expect(result.type_match).toBe(1); // apartment is in preferred_types
    expect(result.location_score).toBe(1.0); // same locality
    expect(result.price_score).toBe(1.0); // within budget range
    expect(result.score).toBeGreaterThan(90); // High score for perfect match
    expect(result.reasons.length).toBeGreaterThan(0);
  });

  test('calculates score for property outside budget', () => {
    const expensiveProperty: IProperty = {
      ...sampleProperty,
      price: 8000000, // Way above budget
    };

    const result = calculateMatchScore(sampleCustomer, expensiveProperty);

    expect(result.price_score).toBeLessThan(0.5);
    expect(result.score).toBeLessThan(70);
  });

  test('calculates score for different location', () => {
    const differentLocationProperty: IProperty = {
      ...sampleProperty,
      location: {
        city: 'Hyderabad',
        locality: 'Different Area',
      },
    };

    const result = calculateMatchScore(sampleCustomer, differentLocationProperty);

    expect(result.location_score).toBe(0);
    expect(result.score).toBeLessThan(60);
  });

  test('calculates score for non-preferred type', () => {
    const plotProperty: IProperty = {
      ...sampleProperty,
      type: 'plot', // Not in preferred_types
    };

    const result = calculateMatchScore(sampleCustomer, plotProperty);

    expect(result.type_match).toBe(0);
    expect(result.score).toBeLessThan(80);
  });

  test('handles customer with no preferred types', () => {
    const customerNoTypes: ICustomer = {
      ...sampleCustomer,
      preferred_types: [],
    };

    const result = calculateMatchScore(customerNoTypes, sampleProperty);

    expect(result.type_match).toBe(1); // Should match if no preferences
    expect(result.score).toBeGreaterThan(0);
  });
});

