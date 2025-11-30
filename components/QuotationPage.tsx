'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function QuotationPage() {
  return (
    <div className="px-2 sm:px-4 py-4 sm:py-6 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Project Quotation</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Karimnagar Properties CRM - Development & Deployment</p>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-gray-700 mb-4">
              A comprehensive, production-ready CRM system for real estate property management with 
              intelligent matching, WhatsApp integration, and complete data management capabilities. 
              This system will help you automate your property-customer matching process and manage 
              all your real estate operations efficiently.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Features Included</h2>
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
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
            
            <div className="space-y-4">
              <div className="p-4 sm:p-5 bg-gray-50 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Development & Deployment</h3>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">₹1,90,000</div>
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

              <div className="p-4 sm:p-5 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Hosting Cost</h3>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">₹0/month</div>
                </div>
                <p className="text-sm text-gray-700">
                  We use FREE tier hosting platforms (Vercel & MongoDB Atlas) which are completely free 
                  for your business needs. No monthly hosting fees!
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Future Changes/Updates</h3>
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">₹500/change</div>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Pay only when you need changes. Each change that takes 1 day of work costs ₹500.
                </p>
                <p className="text-xs text-gray-600">
                  Examples: Adding a new field, modifying reports, small feature additions. 
                  No monthly maintenance fees - pay only for what you need.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-300">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl">Total Project Cost</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Everything included</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">₹1,90,000</div>
                  <div className="text-xs sm:text-sm text-gray-600">One-time only</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Why You Need This Software</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important:</strong> This software does NOT replace your staff. Your telecaller and field executive are essential and will continue working with you. The software helps them work more efficiently and prevents data loss that affects your income.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-green-50 p-4 sm:p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Without Software vs With Software</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                  <h4 className="font-bold text-red-700 mb-3 text-center">❌ Without Software</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Scattered Data:</strong> Customer details in notebooks, Excel files, WhatsApp chats, phone contacts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Lost Opportunities:</strong> Can't find matching customers when new property arrives</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Time Wasted:</strong> Staff spends hours searching through scattered data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Missed Sales:</strong> Properties sit unsold because right customers aren't contacted</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Data Loss Risk:</strong> Notebooks get lost, Excel files corrupted, phones damaged</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Income Impact:</strong> Lower sales due to inefficient matching and lost data</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                  <h4 className="font-bold text-green-700 mb-3 text-center">✅ With Software</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span><strong>Organized Data:</strong> All customers, properties, and clients in one secure system</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span><strong>Instant Matching:</strong> System automatically finds best customers for any property</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span><strong>Time Saved:</strong> Staff can focus on calling customers instead of searching data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span><strong>More Sales:</strong> Right customers contacted at right time = faster property sales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span><strong>Data Safety:</strong> All data backed up in cloud - never lost even if device breaks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span><strong>Income Growth:</strong> Better organization = more sales = higher profit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Real Impact on Your Business</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-white p-3 rounded">
                  <p><strong>Scenario 1: New Property Arrives</strong></p>
                  <p className="mt-1 text-xs sm:text-sm">
                    <span className="text-red-600">Without Software:</span> Staff searches through notebooks/files for 2-3 hours to find matching customers. Many potential matches missed. Property takes longer to sell.
                  </p>
                  <p className="mt-1 text-xs sm:text-sm">
                    <span className="text-green-600">With Software:</span> System shows top 10 matching customers in 2 seconds. Staff immediately calls them. Property sells faster.
                  </p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p><strong>Scenario 2: Customer Calls Looking for Property</strong></p>
                  <p className="mt-1 text-xs sm:text-sm">
                    <span className="text-red-600">Without Software:</span> Staff searches through scattered data, might miss perfect property match. Customer goes to competitor.
                  </p>
                  <p className="mt-1 text-xs sm:text-sm">
                    <span className="text-green-600">With Software:</span> System instantly shows all matching properties. Staff presents best options. Customer buys from you.
                  </p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p><strong>Scenario 3: Data Loss</strong></p>
                  <p className="mt-1 text-xs sm:text-sm">
                    <span className="text-red-600">Without Software:</span> Notebook lost, Excel file corrupted, phone damaged = All customer data gone. Lost income from those customers.
                  </p>
                  <p className="mt-1 text-xs sm:text-sm">
                    <span className="text-green-600">With Software:</strong> All data in cloud. Even if device breaks, data is safe. No income loss.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 sm:p-6 rounded-lg border-2 border-green-300">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Investment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded">
                  <span className="text-xs sm:text-sm text-gray-700">One-time Setup:</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">₹1,90,000</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded">
                  <span className="text-xs sm:text-sm text-gray-700">Monthly Hosting:</span>
                  <span className="font-bold text-xs sm:text-sm text-green-600">₹0/month (FREE)</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded">
                  <span className="text-xs sm:text-sm text-gray-700">Future Changes:</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">₹500 per change (only when needed)</span>
                </div>
                <div className="mt-4 p-3 bg-white rounded border-2 border-green-400">
                  <p className="text-xs sm:text-sm text-gray-700 text-center">
                    <strong className="text-green-700">This software protects your data, increases sales efficiency, and helps your staff work better.</strong> Your staff (telecaller & field executive) remain essential - the software just makes them more effective!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">What's Included</h2>
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
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>50% advance payment (₹95,000) to start development</li>
              <li>40% payment (₹76,000) upon completion and testing</li>
              <li>10% payment (₹19,000) upon successful deployment</li>
              <li>All payments via bank transfer or UPI</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Timeline</h2>
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
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
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
