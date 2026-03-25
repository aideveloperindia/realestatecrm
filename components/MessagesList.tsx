'use client';

import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  to_phone: string;
  message_text: string;
  method: string;
  status: string;
  property_id?: {
    title: string;
    price: number;
  };
  customer_id?: {
    name: string;
    phone: string;
  };
  created_by: {
    email: string;
  };
  createdAt: string;
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuickSend, setShowQuickSend] = useState(false);
  const [quickSendData, setQuickSendData] = useState({
    phone: '',
    message: '',
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleQuickSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSendData.phone || !quickSendData.message) {
      alert('Please enter phone number and message');
      return;
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toPhone: quickSendData.phone,
          messageText: quickSendData.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.link) {
        window.open(data.link, '_blank');
        alert('WhatsApp link opened. Message logged.');
        setQuickSendData({ phone: '', message: '' });
        setShowQuickSend(false);
        fetchMessages();
      } else {
        const errorMsg = data.error || 'Failed to generate WhatsApp link';
        console.error('API Error:', errorMsg, data);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
      alert(`Failed to send WhatsApp message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages Log</h1>
        <button
          onClick={() => setShowQuickSend(!showQuickSend)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          {showQuickSend ? 'Cancel' : 'Quick Send WhatsApp'}
        </button>
      </div>

      {showQuickSend && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Send WhatsApp to Any Number</h2>
          <form onSubmit={handleQuickSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={quickSendData.phone}
                onChange={(e) => setQuickSendData({ ...quickSendData, phone: e.target.value })}
                placeholder="+919505009699 or 9505009699"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Admin number: +919505009699 (your WhatsApp will be used)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                required
                value={quickSendData.message}
                onChange={(e) => setQuickSendData({ ...quickSendData, message: e.target.value })}
                placeholder="Enter your message here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Generate WhatsApp Link
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {messages.map((message) => (
            <li key={message._id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        To: {message.to_phone}
                      </span>
                      {message.customer_id && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({message.customer_id.name})
                        </span>
                      )}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        message.status === 'recorded' ? 'bg-blue-100 text-blue-800' :
                        message.status === 'sent' ? 'bg-green-100 text-green-800' :
                        message.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {message.status}
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {message.method}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {message.message_text.substring(0, 100)}
                      {message.message_text.length > 100 && '...'}
                    </div>
                    {message.property_id && (
                      <div className="mt-1 text-xs text-gray-500">
                        Property: {message.property_id.title} (₹{message.property_id.price.toLocaleString()})
                      </div>
                    )}
                    <div className="mt-1 text-xs text-gray-400">
                      {formatDate(message.createdAt)} • By: {message.created_by?.email || 'Unknown'}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {messages.length === 0 && (
          <div className="text-center py-8 text-gray-500">No messages found</div>
        )}
      </div>
    </div>
  );
}

