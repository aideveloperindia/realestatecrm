# Example CSV Files

This directory contains example CSV files for importing data into the CRM.

## Files

- `clients-example.csv` - Example format for importing clients (sellers)
- `customers-example.csv` - Example format for importing customers (buyers)
- `properties-example.csv` - Example format for importing properties

## Usage

1. Go to `/import` in the CRM
2. Select the appropriate import type
3. Upload the corresponding CSV file
4. Review and resolve any flagged rows in the cleaning queue

## Notes

- Phone numbers will be automatically normalized to E.164 format (+91 for 10-digit Indian numbers)
- Required fields must be present for successful import
- Duplicate phone numbers will be detected and only the first occurrence will be imported
- Rows with errors will be flagged in the cleaning queue for manual review

