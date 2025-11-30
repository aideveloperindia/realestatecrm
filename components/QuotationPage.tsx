'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function QuotationPage() {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Quotation</h1>
        <p className="text-gray-600 mb-8">Karimnagar Properties CRM - Development & Deployment</p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-gray-700 mb-4">
              A comprehensive, production-ready CRM system for real estate property management with 
              intelligent matching, WhatsApp integration, and complete data management capabilities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features Included</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Single admin authentication system (JWT + secure cookies)</li>
              <li>Client Management (Property Sellers)</li>
              <li>Customer Management (Property Buyers) with opt-in tracking</li>
              <li>Property Management with status tracking</li>
              <li>Smart Matching Algorithm (Property ↔ Customer with scoring)</li>
              <li>CSV Import with data cleaning and normalization</li>
              <li>WhatsApp Integration (wa.me links - ready for Cloud API)</li>
              <li>Message Logging & Audit Trail</li>
              <li>Search & Filtering capabilities</li>
              <li>Phone number normalization (E.164 format)</li>
              <li>Responsive UI with Tailwind CSS</li>
              <li>Complete documentation and user guides</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div>
                <h3 className="font-medium mb-2">Frontend:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Next.js 14 (App Router)</li>
                  <li>React 18 with TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Backend:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Next.js API Routes</li>
                  <li>MongoDB with Mongoose</li>
                  <li>JWT Authentication</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing Breakdown</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Development</h3>
                  <p className="text-sm text-gray-600">Complete CRM system development</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹1,50,000</div>
                  <div className="text-sm text-gray-600">One-time</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Deployment & Setup</h3>
                  <p className="text-sm text-gray-600">Vercel deployment + MongoDB Atlas setup</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹25,000</div>
                  <div className="text-sm text-gray-600">One-time</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Training & Documentation</h3>
                  <p className="text-sm text-gray-600">User training + complete documentation</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹15,000</div>
                  <div className="text-sm text-gray-600">One-time</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Total Project Cost</h3>
                  <p className="text-sm text-gray-600">Including all features and deployment</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">₹1,90,000</div>
                  <div className="text-sm text-gray-600">One-time payment</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Complete Source Code</h3>
                <p className="text-sm">Full access to all code files</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Database Setup</h3>
                <p className="text-sm">MongoDB Atlas configuration</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Hosting Setup</h3>
                <p className="text-sm">Vercel deployment configuration</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Documentation</h3>
                <p className="text-sm">Complete user guides and technical docs</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ 30 Days Support</h3>
                <p className="text-sm">Post-deployment support included</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Future Enhancements Ready</h3>
                <p className="text-sm">Code structure for easy expansion</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>50% advance payment to start development</li>
              <li>40% payment upon completion and testing</li>
              <li>10% payment upon successful deployment</li>
              <li>All payments via bank transfer or UPI</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Development Phase:</span>
                <span className="font-medium">2-3 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Testing & Refinement:</span>
                <span className="font-medium">1 week</span>
              </div>
              <div className="flex justify-between">
                <span>Deployment & Training:</span>
                <span className="font-medium">3-5 days</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
                <span>Total Timeline:</span>
                <span>4-5 weeks</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact for Quotation</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                For detailed quotation, customization requests, or to discuss your specific requirements, 
                please contact:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> aideveloperindia@gmail.com</p>
                <p><strong>Website:</strong> <a href="https://aideveloperindia.store/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aideveloperindia.store</a></p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
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

