'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Property {
  _id: string;
  title: string;
  type: string;
  price: number;
  location: {
    city: string;
    locality?: string;
  };
  status: string;
  client_id: {
    name: string;
    phone: string;
  };
}

export default function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchProperties();
  }, [statusFilter]);

  const fetchProperties = async () => {
    try {
      const url = `/api/properties${statusFilter ? `?status=${statusFilter}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchProperties();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const filteredProperties = properties.filter((p) =>
    search
      ? p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.city.toLowerCase().includes(search.toLowerCase())
      : true
  );

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
        <Link
          href="/properties/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Property
        </Link>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="on_hold">On Hold</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredProperties.map((property) => (
            <li key={property._id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {property.title}
                      </h3>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {property.type}
                      </span>
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : property.status === 'sold'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">₹{property.price.toLocaleString()}</span>
                      {' • '}
                      {property.location.locality || property.location.city}
                      {' • '}
                      Client: {property.client_id?.name || 'N/A'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={property.status}
                      onChange={(e) => handleStatusChange(property._id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="on_hold">On Hold</option>
                    </select>
                    <Link
                      href={`/properties/${property._id}`}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredProperties.length === 0 && (
          <div className="text-center py-8 text-gray-500">No properties found</div>
        )}
      </div>
    </div>
  );
}

