'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    properties: 0,
    clients: 0,
    customers: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [propsRes, clientsRes, customersRes, messagesRes] = await Promise.all([
        fetch('/api/properties'),
        fetch('/api/clients'),
        fetch('/api/customers'),
        fetch('/api/messages?limit=1'),
      ]);

      const props = await propsRes.json();
      const clients = await clientsRes.json();
      const customers = await customersRes.json();
      const messages = await messagesRes.json();

      setStats({
        properties: props.total || 0,
        clients: clients.total || 0,
        customers: customers.total || 0,
        messages: messages.total || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600">{stats.properties}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Properties</dt>
                  <dd className="text-lg font-medium text-gray-900">Total</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/properties" className="font-medium text-blue-700 hover:text-blue-900">
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-green-600">{stats.clients}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Clients</dt>
                  <dd className="text-lg font-medium text-gray-900">Sellers</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/clients" className="font-medium text-green-700 hover:text-green-900">
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-purple-600">{stats.customers}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Customers</dt>
                  <dd className="text-lg font-medium text-gray-900">Buyers</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/customers" className="font-medium text-purple-700 hover:text-purple-900">
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-orange-600">{stats.messages}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Messages</dt>
                  <dd className="text-lg font-medium text-gray-900">Sent</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/messages" className="font-medium text-orange-700 hover:text-orange-900">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/properties/new"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="font-medium text-gray-900">Add Property</div>
            <div className="text-sm text-gray-500">Create a new property listing</div>
          </Link>
          <Link
            href="/customers/new"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="font-medium text-gray-900">Add Customer</div>
            <div className="text-sm text-gray-500">Register a new buyer</div>
          </Link>
          <Link
            href="/import"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="font-medium text-gray-900">Import Data</div>
            <div className="text-sm text-gray-500">Upload CSV file</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

