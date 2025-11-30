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
              This system will help you automate your property-customer matching process and manage 
              all your real estate operations efficiently.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features Included</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Secure admin login system</li>
              <li>Client Management (Property Sellers)</li>
              <li>Customer Management (Property Buyers) with WhatsApp opt-in tracking</li>
              <li>Property Management with status tracking</li>
              <li>Smart Matching Algorithm - Automatically matches properties to customers</li>
              <li>CSV Import - Bulk upload contacts and properties</li>
              <li>WhatsApp Integration - Send property details via WhatsApp</li>
              <li>Message Logging - Track all communication</li>
              <li>Search & Filtering - Find properties and customers quickly</li>
              <li>Responsive Design - Works on desktop, tablet, and mobile</li>
              <li>Complete documentation and user guides</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">Development & Deployment</h3>
                  <div className="text-2xl font-bold text-gray-900">₹1,90,000</div>
                </div>
                <p className="text-sm text-gray-600 mb-3">One-time payment includes:</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li>Complete CRM system development</li>
                  <li>Database setup and configuration</li>
                  <li>Hosting setup on FREE tier platforms (₹0/month hosting cost)</li>
                  <li>Domain and SSL certificate setup</li>
                  <li>User training sessions</li>
                  <li>Complete documentation</li>
                  <li>30 days post-deployment support</li>
                </ul>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">Hosting Cost</h3>
                  <div className="text-2xl font-bold text-green-600">₹0/month</div>
                </div>
                <p className="text-sm text-gray-700">
                  We use FREE tier hosting platforms (Vercel & MongoDB Atlas) which are completely free 
                  for your business needs. No monthly hosting fees!
                </p>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">Future Changes/Updates</h3>
                  <div className="text-2xl font-bold text-blue-600">₹500/change</div>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Pay only when you need changes. Each change that takes 1 day of work costs ₹500.
                </p>
                <p className="text-xs text-gray-600">
                  Examples: Adding a new field, modifying reports, small feature additions. 
                  No monthly maintenance fees - pay only for what you need.
                </p>
              </div>

              <div className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-300">
                <div>
                  <h3 className="font-bold text-gray-900 text-xl">Total Project Cost</h3>
                  <p className="text-sm text-gray-600">Everything included</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">₹1,90,000</div>
                  <div className="text-sm text-gray-600">One-time only</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cost Savings & Benefits</h2>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Current Monthly Cost</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span className="text-gray-700">Telecaller Salary:</span>
                      <span className="font-bold text-gray-900">₹10,000/month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span className="text-gray-700">Field Executive Salary:</span>
                      <span className="font-bold text-gray-900">₹10,000/month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-100 rounded border-2 border-red-200">
                      <span className="font-semibold text-gray-900">Total Monthly Cost:</span>
                      <span className="font-bold text-red-600 text-lg">₹20,000/month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-100 rounded border-2 border-red-200">
                      <span className="font-semibold text-gray-900">Annual Cost:</span>
                      <span className="font-bold text-red-600 text-lg">₹2,40,000/year</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">With CRM System</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span className="text-gray-700">Initial Setup (One-time):</span>
                      <span className="font-bold text-gray-900">₹1,90,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span className="text-gray-700">Hosting (Monthly):</span>
                      <span className="font-bold text-green-600">₹0/month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span className="text-gray-700">Maintenance:</span>
                      <span className="font-bold text-gray-900">₹500/change</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-100 rounded border-2 border-green-200">
                      <span className="font-semibold text-gray-900">First Year Total:</span>
                      <span className="font-bold text-green-600 text-lg">₹1,90,000*</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      *Assuming no changes needed in first year. Each change costs ₹500.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">First Year Savings</h3>
                    <p className="text-sm text-gray-600">
                      Your current annual cost: ₹2,40,000 vs CRM first year: ₹1,90,000
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">₹50,000</div>
                    <div className="text-sm text-gray-600">Saved in first year</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Additional Benefits:</h3>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><strong>Faster Operations:</strong> Match properties to customers in seconds instead of hours</li>
                  <li><strong>Better Accuracy:</strong> Automated matching reduces human errors</li>
                  <li><strong>24/7 Availability:</strong> Access your CRM from anywhere, anytime</li>
                  <li><strong>Professional Image:</strong> Impress clients with modern technology</li>
                  <li><strong>Scalability:</strong> Handle more properties and customers easily</li>
                  <li><strong>Data Security:</strong> All data safely stored in cloud database</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Complete CRM System</h3>
                <p className="text-sm">All features mentioned above</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Hosting Setup (FREE)</h3>
                <p className="text-sm">No monthly hosting charges</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Database Setup</h3>
                <p className="text-sm">MongoDB Atlas configuration</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Training Sessions</h3>
                <p className="text-sm">Learn how to use the system</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ Documentation</h3>
                <p className="text-sm">Complete user guides included</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✓ 30 Days Support</h3>
                <p className="text-sm">Post-deployment assistance</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>50% advance payment (₹95,000) to start development</li>
              <li>40% payment (₹76,000) upon completion and testing</li>
              <li>10% payment (₹19,000) upon successful deployment</li>
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
                <span>4-5 weeks from advance payment</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Ready to automate your real estate business? Let's discuss your requirements:
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
