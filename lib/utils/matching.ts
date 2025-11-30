import { ICustomer } from '../models/Customer';
import { IProperty } from '../models/Property';

export interface MatchResult {
  property: IProperty;
  score: number;
  type_match: number;
  location_score: number;
  price_score: number;
  reasons: string[];
}

/**
 * Calculate match score between a customer and property
 */
export function calculateMatchScore(customer: ICustomer, property: IProperty): MatchResult {
  // Type match (0 or 1)
  const typeMatch = customer.preferred_types.length === 0 || 
                    customer.preferred_types.includes(property.type) ? 1 : 0;

  // Location score
  let locationScore = 0;
  const customerLoc = customer.preferred_locations;
  const propertyLoc = property.location;

  if (customerLoc.locality && propertyLoc.locality && 
      customerLoc.locality.toLowerCase() === propertyLoc.locality.toLowerCase()) {
    locationScore = 1.0;
  } else if (customerLoc.city && propertyLoc.city && 
             customerLoc.city.toLowerCase() === propertyLoc.city.toLowerCase()) {
    locationScore = 0.7;
  } else if (customerLoc.district && propertyLoc.district && 
             customerLoc.district.toLowerCase() === propertyLoc.district.toLowerCase()) {
    locationScore = 0.4;
  }

  // Price score
  const budgetMid = (customer.budget_min + customer.budget_max) / 2;
  let priceScore = 0;

  if (property.price >= customer.budget_min && property.price <= customer.budget_max) {
    priceScore = 1.0;
  } else {
    // Fuzzy match: within ±20% of budget midpoint
    const diff = Math.abs(property.price - budgetMid);
    const percentDiff = diff / budgetMid;
    
    if (percentDiff <= 0.2) {
      priceScore = 1 - percentDiff;
    } else {
      // Beyond 20%, score decreases
      priceScore = Math.max(0, 1 - (percentDiff - 0.2) * 2);
    }
  }

  // Final score: weighted combination
  const finalScore = 100 * (0.5 * priceScore + 0.3 * locationScore + 0.2 * typeMatch);

  // Generate reasons
  const reasons: string[] = [];
  if (typeMatch === 1) {
    reasons.push(`Matches preferred type: ${property.type}`);
  }
  if (locationScore >= 0.7) {
    reasons.push(`Location match: ${propertyLoc.locality || propertyLoc.city}`);
  } else if (locationScore >= 0.4) {
    reasons.push(`Nearby location: ${propertyLoc.district || propertyLoc.city}`);
  }
  if (priceScore >= 0.8) {
    reasons.push(`Price within budget: ₹${property.price.toLocaleString()}`);
  } else if (priceScore >= 0.5) {
    reasons.push(`Price close to budget: ₹${property.price.toLocaleString()}`);
  }

  return {
    property,
    score: Math.round(finalScore * 100) / 100, // Round to 2 decimal places
    type_match: typeMatch,
    location_score: locationScore,
    price_score: priceScore,
    reasons,
  };
}

/**
 * Find top matches for a customer
 */
export function findTopMatches(
  customer: ICustomer,
  properties: IProperty[],
  limit: number = 10
): MatchResult[] {
  const matches = properties
    .filter(p => p.status === 'available') // Only available properties
    .map(property => calculateMatchScore(customer, property))
    .sort((a, b) => b.score - a.score) // Sort descending by score
    .slice(0, limit);

  return matches;
}

