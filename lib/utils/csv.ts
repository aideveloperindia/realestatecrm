import Papa from 'papaparse';
import { normalizePhone } from './phone';

export interface CSVRow {
  [key: string]: string | number | undefined;
  _rowIndex?: number;
  _errors?: string[];
  _normalized?: {
    phone?: string;
    price?: number;
  };
}

export interface CSVParseResult {
  rows: CSVRow[];
  errors: string[];
  headers: string[];
}

/**
 * Parse CSV file
 */
export function parseCSV(fileContent: string): CSVParseResult {
  const result: CSVParseResult = {
    rows: [],
    errors: [],
    headers: [],
  };

  try {
    const parsed = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
    });

    if (parsed.errors.length > 0) {
      result.errors.push(...parsed.errors.map(e => e.message));
    }

    result.headers = parsed.meta.fields || [];
    result.rows = parsed.data.map((row: any, index: number) => ({
      ...row,
      _rowIndex: index + 1, // 1-based index
      _errors: [],
      _normalized: {},
    }));

    return result;
  } catch (error) {
    result.errors.push(`Failed to parse CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return result;
  }
}

/**
 * Normalize and validate CSV row
 */
export function normalizeCSVRow(row: CSVRow, expectedFields: {
  phone?: string[];
  price?: string[];
  required?: string[];
}): CSVRow {
  const errors: string[] = [];
  const normalized: CSVRow['_normalized'] = {};

  // Normalize phone numbers
  if (expectedFields.phone) {
    for (const phoneField of expectedFields.phone) {
      const phoneValue = row[phoneField];
      if (phoneValue && typeof phoneValue === 'string') {
        const normalizedPhone = normalizePhone(phoneValue);
        normalized.phone = normalizedPhone;
        row[phoneField] = normalizedPhone;
        
        // Validate E.164
        if (!/^\+\d{1,15}$/.test(normalizedPhone)) {
          errors.push(`Invalid phone format in ${phoneField}: ${phoneValue}`);
        }
      } else if (expectedFields.required?.includes(phoneField)) {
        errors.push(`Missing required field: ${phoneField}`);
      }
    }
  }

  // Normalize price
  if (expectedFields.price) {
    for (const priceField of expectedFields.price) {
      const priceValue = row[priceField];
      if (priceValue) {
        // Remove currency symbols and commas
        const cleaned = String(priceValue).replace(/[₹,\s]/g, '');
        const parsed = parseFloat(cleaned);
        if (!isNaN(parsed) && parsed > 0) {
          normalized.price = parsed;
          row[priceField] = parsed;
        } else {
          errors.push(`Invalid price in ${priceField}: ${priceValue}`);
        }
      } else if (expectedFields.required?.includes(priceField)) {
        errors.push(`Missing required field: ${priceField}`);
      }
    }
  }

  // Check required fields
  if (expectedFields.required) {
    for (const field of expectedFields.required) {
      if (!row[field] || String(row[field]).trim() === '') {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  row._errors = errors;
  row._normalized = normalized;

  return row;
}

/**
 * Deduplicate rows by phone number
 */
export function deduplicateByPhone(rows: CSVRow[], phoneField: string): {
  unique: CSVRow[];
  duplicates: CSVRow[];
} {
  const seen = new Map<string, CSVRow>();
  const unique: CSVRow[] = [];
  const duplicates: CSVRow[] = [];

  for (const row of rows) {
    const phone = String(row[phoneField] || '').trim();
    if (!phone) {
      unique.push(row); // Keep rows without phone for manual review
      continue;
    }

    const normalized = normalizePhone(phone);
    if (seen.has(normalized)) {
      duplicates.push(row);
    } else {
      seen.set(normalized, row);
      unique.push(row);
    }
  }

  return { unique, duplicates };
}

