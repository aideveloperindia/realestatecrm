'use client';

import { useEffect, useState } from 'react';

interface Client {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [sendingClientId, setSendingClientId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const url = search ? `/api/clients?search=${encodeURIComponent(search)}` : '/api/clients';
      const res = await fetch(url);
      const data = await res.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ name: '', phone: '', email: '', address: '', notes: '' });
        fetchClients();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create client');
      }
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Failed to create client');
    }
  };

  const handleSendClientReminder = async (client: Client) => {
    setSendingClientId(client._id);
    try {
      const typesRes = await fetch(`/api/clients/${client._id}/property-types`);
      const typesData = await typesRes.json();
      const types: string[] = typesData.types || [];

      const typesText =
        types.length > 0 ? types.join(', ') : 'your preferred property type';
      const messageText = `Hi ${client.name}, this is a reminder from Real Estate Sales CRM. We can help you sell your ${typesText} properties faster. Would you like to share any updates and get buyer follow-ups? Reply YES.`;

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toPhone: client.phone,
          messageText,
        }),
      });

      const data = await res.json();
      if (res.ok && data.link) {
        window.open(data.link, '_blank');
        alert('WhatsApp link opened. Message logged.');
      } else {
        alert(data.error || 'Failed to generate WhatsApp link');
      }
    } catch (error) {
      console.error('Error sending client WhatsApp reminder:', error);
      alert('Failed to send WhatsApp message');
    } finally {
      setSendingClientId(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading clients...</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clients (Sellers)</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          {showForm ? 'Cancel' : 'Add Client'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Add New Client</h2>
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
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Create Client
            </button>
          </form>
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchClients();
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {clients.map((client) => (
            <li key={client._id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>{client.phone}</span>
                      {client.email && <span className="ml-4">{client.email}</span>}
                      {client.address && <div className="mt-1">{client.address}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSendClientReminder(client)}
                      disabled={sendingClientId === client._id}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {sendingClientId === client._id ? 'Opening...' : 'WhatsApp Reminder'}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {clients.length === 0 && (
          <div className="text-center py-8 text-gray-500">No clients found</div>
        )}
      </div>
    </div>
  );
}

