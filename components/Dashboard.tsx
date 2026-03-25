'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        fetch('/api/properties').catch(err => ({ ok: false, json: () => ({ total: 0 }) })),
        fetch('/api/clients').catch(err => ({ ok: false, json: () => ({ total: 0 }) })),
        fetch('/api/customers').catch(err => ({ ok: false, json: () => ({ total: 0 }) })),
        fetch('/api/messages?limit=1').catch(err => ({ ok: false, json: () => ({ total: 0 }) })),
      ]);

      const props = propsRes.ok ? await propsRes.json() : { total: 0 };
      const clients = clientsRes.ok ? await clientsRes.json() : { total: 0 };
      const customers = customersRes.ok ? await customersRes.json() : { total: 0 };
      const messages = messagesRes.ok ? await messagesRes.json() : { total: 0 };

      setStats({
        properties: props.total || 0,
        clients: clients.total || 0,
        customers: customers.total || 0,
        messages: messages.total || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set all stats to 0 on error
      setStats({
        properties: 0,
        clients: 0,
        customers: 0,
        messages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="px-2 sm:px-4 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Dashboard</h1>

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

      <div className="mt-8 text-center">
        <Link
          href="/quotation"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium mb-8"
        >
          View Project Quotation
        </Link>
      </div>

      <div className="mt-8 text-center border-t pt-6">
        <a
          href="https://aideveloperindia.store/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <span>Built by</span>
          <Image
            src="/A-logo.png"
            alt="AI Developer India Logo"
            width={24}
            height={24}
            className="inline-block"
          />
          <span className="font-medium">AI Developer India</span>
        </a>
      </div>
    </div>
  );
}

