'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function QuotationPage() {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Quotation</h1>
        <p className="text-gray-600 mb-4">Karimnagar Properties CRM - Development & Deployment</p>
        
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">💡 All Costs Included - Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">✅ One-Time Cost: ₹1,90,000</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Engineering costs: Included</li>
                <li>• Platform fees: Included (FREE tier setup)</li>
                <li>• Deployment: Included</li>
                <li>• Training: Included</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📅 Monthly Cost: ₹7,500 - ₹51,500</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Hosting: ₹0 - ₹21,500/month</li>
                <li>• Maintenance: ₹7,500 - ₹30,000/month</li>
                <li>• ROI: 11-85 days</li>
                <li>• Annual Savings: ₹11,60,000+</li>
              </ul>
            </div>
          </div>
        </div>

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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">One-Time Development Cost Breakdown</h2>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Development</h3>
                  <div className="text-2xl font-bold text-gray-900">₹1,50,000</div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Complete CRM system development including:</p>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Engineering costs (80-100 hours @ ₹1,500-2,000/hour) - Included</li>
                  <li>Full-stack development (Frontend + Backend)</li>
                  <li>Database design & implementation</li>
                  <li>Authentication system, Matching algorithm, CSV import/export</li>
                  <li>WhatsApp integration, UI/UX design, Testing & bug fixes</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Deployment & Setup</h3>
                  <div className="text-2xl font-bold text-gray-900">₹25,000</div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Including platform setup fees:</p>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Vercel hosting setup (FREE tier available - ₹0 included)</li>
                  <li>MongoDB Atlas database setup (FREE tier available - ₹0 included)</li>
                  <li>SSL certificate setup (FREE with Vercel - ₹0 included)</li>
                  <li>Environment variable configuration</li>
                  <li>CDN & Global distribution (FREE - ₹0 included)</li>
                  <li>Domain configuration & deployment automation</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Training & Documentation</h3>
                  <div className="text-2xl font-bold text-gray-900">₹15,000</div>
                </div>
                <p className="text-sm text-gray-600 mb-2">User training + complete documentation</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Total One-Time Cost</h3>
                  <p className="text-sm text-gray-600">All platform fees and engineering costs included</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">₹1,90,000</div>
                  <div className="text-sm text-gray-600">One-time payment</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Maintenance & Hosting Costs</h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">Option 1: Basic (FREE Tier)</h3>
                    <div className="text-2xl font-bold text-green-600">₹7,500/month</div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div className="flex justify-between">
                      <span>Vercel Hosting (FREE tier):</span>
                      <span>₹0/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MongoDB Atlas (FREE tier):</span>
                      <span>₹0/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Basic Maintenance (5 hours/month):</span>
                      <span>₹7,500/month</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Perfect for small operations (up to 1,000 properties/customers)</p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">Option 2: Professional (Recommended)</h3>
                    <div className="text-2xl font-bold text-yellow-600">₹17,400/month</div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div className="flex justify-between">
                      <span>Vercel Pro:</span>
                      <span>₹1,650/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MongoDB Atlas M2:</span>
                      <span>₹750/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Professional Maintenance (10 hours/month):</span>
                      <span>₹15,000/month</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">For growing business (10,000+ properties/customers)</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">Option 3: Enterprise</h3>
                    <div className="text-2xl font-bold text-orange-600">₹51,500/month</div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div className="flex justify-between">
                      <span>Vercel Enterprise:</span>
                      <span>₹16,500/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MongoDB Atlas M10:</span>
                      <span>₹5,000/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dedicated Maintenance (20 hours/month):</span>
                      <span>₹30,000/month</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">For large-scale operations with high volume</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">💰 Profit & ROI Analysis</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Expected Value Creation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-gray-900">Time Saved</div>
                      <div className="text-green-600 font-bold">₹30,000 - ₹1,20,000/month</div>
                      <div className="text-xs text-gray-600">Automated manual processes</div>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-gray-900">Efficiency Gain</div>
                      <div className="text-green-600 font-bold">₹20,000 - ₹80,000/month</div>
                      <div className="text-xs text-gray-600">40-60% faster operations</div>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-gray-900">Sales Increase</div>
                      <div className="text-green-600 font-bold">₹15,000 - ₹2,00,000/month</div>
                      <div className="text-xs text-gray-600">Better matching & automation</div>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-gray-900">Error Reduction</div>
                      <div className="text-green-600 font-bold">₹10,000 - ₹50,000/month</div>
                      <div className="text-xs text-gray-600">Automated validation</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">ROI Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Small Business (Basic Plan):</span>
                      <span className="font-bold text-green-600">2.8 months (85 days)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Medium Business (Professional Plan):</span>
                      <span className="font-bold text-green-600">1.04 months (31 days)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Large Business (Enterprise Plan):</span>
                      <span className="font-bold text-green-600">0.38 months (11 days)</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    Expected monthly profit: ₹67,500 - ₹4,98,500 (depending on business scale)
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Cost Comparison</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Manual Process (Annual Cost):</span>
                      <span className="font-bold text-red-600">₹14,40,000/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">With CRM (Annual Cost):</span>
                      <span className="font-bold text-green-600">₹2,80,000/year</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold">
                      <span className="text-gray-900">Annual Savings:</span>
                      <span className="text-green-600">₹11,60,000/year (80.5% savings)</span>
                    </div>
                  </div>
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

