'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    district?: string;
  };
  opt_in_whatsapp: boolean;
}

interface Match {
  property: {
    _id: string;
    title: string;
    type: string;
    price: number;
    location: {
      city: string;
      locality?: string;
    };
  };
  score: number;
  type_match: number;
  location_score: number;
  price_score: number;
  reasons: string[];
}

export default function CustomerDetail({ customerId }: { customerId: string }) {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    fetchCustomer();
    fetchMatches();
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      const res = await fetch(`/api/customers/${customerId}`);
      const data = await res.json();
      setCustomer(data.customer);
    } catch (error) {
      console.error('Error fetching customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await fetch(`/api/customers/${customerId}/matches`);
      const data = await res.json();
      setMatches(data.matches || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const handleSendWhatsApp = async (propertyId: string, propertyTitle: string) => {
    if (!customer) return;

    if (!customer.opt_in_whatsapp) {
      if (!confirm('Customer has not opted in for WhatsApp. Send anyway?')) {
        return;
      }
    }

    setSending(propertyId);
    try {
      const defaultMessage = `Hi ${customer.name}, I found a property that might interest you: ${propertyTitle}. Would you like to know more?`;
      const text = messageText || defaultMessage;

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toPhone: customer.phone,
          messageText: text,
          propertyId,
          customerId: customer._id,
        }),
      });

      const data = await res.json();
      if (res.ok && data.link) {
        window.open(data.link, '_blank');
        alert('WhatsApp link opened. Message logged.');
        setMessageText('');
      } else {
        alert(data.error || 'Failed to generate WhatsApp link');
      }
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
      alert('Failed to send WhatsApp message');
    } finally {
      setSending(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading customer...</div>;
  }

  if (!customer) {
    return <div className="text-center py-8">Customer not found</div>;
  }

  return (
    <div className="px-4 py-6">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:text-blue-900 mb-4"
      >
        ← Back to Customers
      </button>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{customer.name}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Phone:</span> {customer.phone}
          </div>
          {customer.email && (
            <div>
              <span className="font-medium">Email:</span> {customer.email}
            </div>
          )}
          <div>
            <span className="font-medium">Budget:</span> ₹{customer.budget_min.toLocaleString()} - ₹{customer.budget_max.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Opt-in:</span>{' '}
            <span className={customer.opt_in_whatsapp ? 'text-green-600' : 'text-red-600'}>
              {customer.opt_in_whatsapp ? 'Yes' : 'No'}
            </span>
          </div>
          {customer.preferred_types.length > 0 && (
            <div>
              <span className="font-medium">Preferred Types:</span> {customer.preferred_types.join(', ')}
            </div>
          )}
          {customer.preferred_locations.city && (
            <div>
              <span className="font-medium">Location:</span> {customer.preferred_locations.locality || customer.preferred_locations.city}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Default Message Template (optional)
        </label>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Leave empty to use default message"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Property Matches</h2>
        {matches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No matches found</div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.property._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {match.property.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {match.property.type}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Score: {match.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">₹{match.property.price.toLocaleString()}</span>
                      {' • '}
                      {match.property.location.locality || match.property.location.city}
                    </div>
                    <div className="text-xs text-gray-500">
                      <div>Price Score: {(match.price_score * 100).toFixed(0)}%</div>
                      <div>Location Score: {(match.location_score * 100).toFixed(0)}%</div>
                      <div>Type Match: {match.type_match ? 'Yes' : 'No'}</div>
                    </div>
                    {match.reasons.length > 0 && (
                      <div className="mt-2 text-xs text-gray-600">
                        <div className="font-medium">Match Reasons:</div>
                        <ul className="list-disc list-inside">
                          {match.reasons.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleSendWhatsApp(match.property._id, match.property.title)}
                    disabled={sending === match.property._id}
                    className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {sending === match.property._id ? 'Opening...' : 'Send WhatsApp'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

