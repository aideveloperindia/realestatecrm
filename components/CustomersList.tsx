'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Customer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  budget_min: number;
  budget_max: number;
  preferred_types: string[];
  preferred_locations: {
    city?: string;
    locality?: string;
  };
  opt_in_whatsapp: boolean;
}

export default function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget_min: '',
    budget_max: '',
    preferred_types: '',
    city: '',
    locality: '',
    district: '',
    opt_in_whatsapp: false,
    notes: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const url = search ? `/api/customers?search=${encodeURIComponent(search)}` : '/api/customers';
      const res = await fetch(url);
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          budget_min: parseFloat(formData.budget_min),
          budget_max: parseFloat(formData.budget_max),
          preferred_types: formData.preferred_types
            ? formData.preferred_types.split(',').map((t) => t.trim())
            : [],
          preferred_locations: {
            city: formData.city || undefined,
            locality: formData.locality || undefined,
            district: formData.district || undefined,
          },
        }),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          budget_min: '',
          budget_max: '',
          preferred_types: '',
          city: '',
          locality: '',
          district: '',
          opt_in_whatsapp: false,
          notes: '',
        });
        fetchCustomers();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create customer');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Failed to create customer');
    }
  };

  const toggleOptIn = async (id: string, currentValue: boolean) => {
    try {
      await fetch(`/api/customers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opt_in_whatsapp: !currentValue }),
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error updating opt-in:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading customers...</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers (Buyers)</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          {showForm ? 'Cancel' : 'Add Customer'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Add New Customer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget Min *</label>
                <input
                  type="number"
                  required
                  value={formData.budget_min}
                  onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget Max *</label>
                <input
                  type="number"
                  required
                  value={formData.budget_max}
                  onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Types (comma-separated)</label>
                <input
                  type="text"
                  placeholder="apartment, house, plot"
                  value={formData.preferred_types}
                  onChange={(e) => setFormData({ ...formData, preferred_types: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Locality</label>
                <input
                  type="text"
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="opt_in"
                checked={formData.opt_in_whatsapp}
                onChange={(e) => setFormData({ ...formData, opt_in_whatsapp: e.target.checked })}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="opt_in" className="ml-2 block text-sm text-gray-900">
                Opt-in for WhatsApp messages
              </label>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Create Customer
            </button>
          </form>
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchCustomers();
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {customers.map((customer) => (
            <li key={customer._id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Link
                        href={`/customers/${customer._id}`}
                        className="text-lg font-medium text-gray-900 hover:text-blue-600"
                      >
                        {customer.name}
                      </Link>
                      {customer.opt_in_whatsapp && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Opt-in
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>{customer.phone}</span>
                      {customer.email && <span className="ml-4">{customer.email}</span>}
                      <div className="mt-1">
                        Budget: ₹{customer.budget_min.toLocaleString()} - ₹{customer.budget_max.toLocaleString()}
                        {customer.preferred_types.length > 0 && (
                          <span className="ml-4">
                            Types: {customer.preferred_types.join(', ')}
                          </span>
                        )}
                        {customer.preferred_locations.city && (
                          <span className="ml-4">Location: {customer.preferred_locations.locality || customer.preferred_locations.city}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleOptIn(customer._id, customer.opt_in_whatsapp)}
                      className={`text-sm px-3 py-1 rounded ${
                        customer.opt_in_whatsapp
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {customer.opt_in_whatsapp ? 'Opted In' : 'Opt In'}
                    </button>
                    <Link
                      href={`/customers/${customer._id}`}
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
        {customers.length === 0 && (
          <div className="text-center py-8 text-gray-500">No customers found</div>
        )}
      </div>
    </div>
  );
}

