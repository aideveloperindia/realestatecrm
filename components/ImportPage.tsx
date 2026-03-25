'use client';

import { useState } from 'react';

export default function ImportPage() {
  const [importType, setImportType] = useState<'clients' | 'customers' | 'properties'>('clients');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', importType);

      const res = await fetch('/api/import/csv', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
        if (data.queueId) {
          // Fetch cleaning queue
          const queueRes = await fetch(`/api/import/csv?queueId=${data.queueId}`);
          const queueData = await queueRes.json();
          setResult({ ...data, queue: queueData.queue });
        }
      } else {
        setError(data.error || 'Import failed');
      }
    } catch (error) {
      console.error('Import error:', error);
      setError('Failed to import file');
    } finally {
      setUploading(false);
    }
  };

  const getExpectedColumns = () => {
    if (importType === 'clients') {
      return ['name', 'phone', 'email', 'address', 'notes'];
    } else if (importType === 'customers') {
      return ['name', 'phone', 'email', 'budget_min', 'budget_max', 'preferred_types', 'city', 'locality', 'district'];
    } else {
      return ['title', 'type', 'price', 'city', 'locality', 'district', 'address', 'bedrooms', 'bathrooms', 'area', 'description'];
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">CSV Import</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Import Instructions</h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Expected Columns for {importType}:</h3>
            <ul className="list-disc list-inside space-y-1">
              {getExpectedColumns().map((col) => (
                <li key={col}>{col}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Phone Number Normalization:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>10-digit numbers will be normalized to +91 format</li>
              <li>Numbers starting with 0 will have 0 removed and +91 added</li>
              <li>Numbers starting with 91 will have + added</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Data Cleaning:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Rows with missing required fields will be flagged</li>
              <li>Duplicate phone numbers will be detected</li>
              <li>Invalid phone formats will be flagged for review</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Import Type
            </label>
            <select
              value={importType}
              onChange={(e) => setImportType(e.target.value as any)}
              className="block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="clients">Clients (Sellers)</option>
              <option value="customers">Customers (Buyers)</option>
              <option value="properties">Properties</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          {result && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-800">
                <div className="font-medium mb-2">Import Results:</div>
                <div>Imported: {result.imported}</div>
                <div>Skipped: {result.skipped}</div>
                <div>Errors: {result.errors}</div>
                {result.queueId && (
                  <div className="mt-2">
                    <div className="font-medium">Rows needing cleaning: {result.queue?.length || 0}</div>
                    <div className="text-xs mt-1">
                      Note: Cleaning queue is stored in memory. Refresh to clear.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {result?.queue && result.queue.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Cleaning Queue</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {result.queue.map((row: any, idx: number) => (
                  <div key={idx} className="border border-red-200 rounded p-2 bg-red-50">
                    <div className="text-xs font-medium text-red-800 mb-1">Row {row._rowIndex}</div>
                    <div className="text-xs text-red-600">
                      Errors: {row._errors?.join(', ') || 'Unknown errors'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Data: {JSON.stringify(row, null, 2).substring(0, 200)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Importing...' : 'Import CSV'}
          </button>
        </form>
      </div>
    </div>
  );
}

