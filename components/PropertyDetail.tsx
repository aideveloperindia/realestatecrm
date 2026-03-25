'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Property {
  _id: string;
  title: string;
  type: string;
  price: number;
  location: {
    city: string;
    locality?: string;
    district?: string;
    address?: string;
  };
  client_id: {
    _id: string;
    name: string;
    phone: string;
    email?: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
  status: string;
}

interface CustomerMatch {
  customer: {
    id: string;
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
  };
  score: number;
  type_match: number;
  location_score: number;
  price_score: number;
  reasons: string[];
}

export default function PropertyDetail({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [matches, setMatches] = useState<CustomerMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    fetchProperty();
    fetchMatches();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/properties/${propertyId}`);
      const data = await res.json();
      setProperty(data.property);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await fetch(`/api/properties/${propertyId}/matches`);
      const data = await res.json();
      setMatches(data.matches || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const handleSendWhatsApp = async (customerId: string, customerPhone: string, customerName: string) => {
    if (!property) return;

    setSending(customerId);
    try {
      const defaultMessage = `Hi ${customerName}, I have a property that might interest you: ${property.title} (₹${property.price.toLocaleString()}). Would you like to know more?`;
      const text = messageText || defaultMessage;

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toPhone: customerPhone,
          messageText: text,
          propertyId: property._id,
          customerId,
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
    return <div className="text-center py-8">Loading property...</div>;
  }

  if (!property) {
    return <div className="text-center py-8">Property not found</div>;
  }

  return (
    <div className="px-4 py-6">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:text-blue-900 mb-4"
      >
        ← Back to Properties
      </button>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {property.type}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ₹{property.price.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Property Details</h2>
            <dl className="space-y-2 text-sm">
              {property.bedrooms && (
                <div>
                  <dt className="font-medium text-gray-700">Bedrooms</dt>
                  <dd className="text-gray-600">{property.bedrooms}</dd>
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <dt className="font-medium text-gray-700">Bathrooms</dt>
                  <dd className="text-gray-600">{property.bathrooms}</dd>
                </div>
              )}
              {property.area && (
                <div>
                  <dt className="font-medium text-gray-700">Area</dt>
                  <dd className="text-gray-600">{property.area.toLocaleString()} sqft</dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Location</h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium text-gray-700">City</dt>
                <dd className="text-gray-600">{property.location.city}</dd>
              </div>
              {property.location.locality && (
                <div>
                  <dt className="font-medium text-gray-700">Locality</dt>
                  <dd className="text-gray-600">{property.location.locality}</dd>
                </div>
              )}
              {property.location.district && (
                <div>
                  <dt className="font-medium text-gray-700">District</dt>
                  <dd className="text-gray-600">{property.location.district}</dd>
                </div>
              )}
              {property.location.address && (
                <div>
                  <dt className="font-medium text-gray-700">Address</dt>
                  <dd className="text-gray-600">{property.location.address}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {property.description && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-sm text-gray-600">{property.description}</p>
          </div>
        )}

        <div className="mt-6 border-t pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Client Information</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-gray-700">Name</dt>
              <dd className="text-gray-600">{property.client_id.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Phone</dt>
              <dd className="text-gray-600">{property.client_id.phone}</dd>
            </div>
            {property.client_id.email && (
              <div>
                <dt className="font-medium text-gray-700">Email</dt>
                <dd className="text-gray-600">{property.client_id.email}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-6">
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

        <h2 className="text-xl font-bold text-gray-900 mb-4">Suggested Customers (Top Matches)</h2>
        {matches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No matching customers found</div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.customer.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {match.customer.name}
                      </h3>
                      {match.customer.opt_in_whatsapp && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Opt-in
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Score: {match.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span>{match.customer.phone}</span>
                      {match.customer.email && <span className="ml-4">{match.customer.email}</span>}
                      <div className="mt-1">
                        Budget: ₹{match.customer.budget_min.toLocaleString()} - ₹{match.customer.budget_max.toLocaleString()}
                        {match.customer.preferred_types.length > 0 && (
                          <span className="ml-4">Types: {match.customer.preferred_types.join(', ')}</span>
                        )}
                      </div>
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
                    onClick={() => handleSendWhatsApp(match.customer.id, match.customer.phone, match.customer.name)}
                    disabled={sending === match.customer.id}
                    className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {sending === match.customer.id ? 'Opening...' : 'Send WhatsApp'}
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

