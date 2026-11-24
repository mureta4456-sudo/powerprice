import React, { useState } from 'react';

const BLOG_POSTS = [
  { slug: 'how-to-read-electricity-prices', title: 'How to Read Electricity Spot Prices', excerpt: 'Understanding EEX, Nord Pool, and other European electricity market data.' },
  { slug: 'dynamic-vs-fixed-tariffs', title: 'Dynamic vs Fixed Tariffs: Which Is Better?', excerpt: 'A detailed comparison of variable market prices vs fixed-rate contracts.' },
  { slug: 'energy-saving-tips', title: '10 Energy-Saving Tips for Households', excerpt: 'Simple ways to reduce your electricity consumption and save money.' },
  { slug: 'eu-renewable-energy-targets', title: 'EU Renewable Energy Targets', excerpt: 'How renewable energy integration affects electricity prices across Europe.' },
  { slug: 'battery-storage-benefits', title: 'Home Battery Storage', excerpt: 'Reducing peak-time electricity costs with home battery systems.' },
];

export function App() {
  const [kwh, setKwh] = useState<number>(150);
  const [rate, setRate] = useState<number>(0.15);
  const [country, setCountry] = useState<string>('LV');

  const totalCost = (kwh * rate).toFixed(2);
  const countries = [
    { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
    { code: 'EE', name: 'Estonia', flag: '�🇪🇪' },
    { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">PowerPrice - Electricity Spot Prices</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 space-y-12 pb-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Track Real-Time Electricity Spot Prices Across Europe
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare dynamic (market-based) vs fixed electricity tariffs across 30+ EU countries. 
            Our calculator helps you understand current spot prices from Nord Pool, EEX, and other 
            European electricity exchanges to reduce your monthly energy costs.
          </p>
        </section>

        {/* Calculator */}
        <section id="calculator" className="bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country:</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
              {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>})}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Consumption (kWh):
            </label>
            <input type="number" value={kwh} onChange={(e) => setKwh(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Rate (€ per kWh):
            </label>
            <input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="md:col-span-3 bg-blue-50 p-4 rounded-xl flex justify-between items-center">
            <span className="text-lg font-medium text-blue-900">Monthly Cost: €{totalCost}</span>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-white shadow-md rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How Our Electricity Price Calculator Works</h3>
          <p>Electricity spot prices fluctuate throughout the day based on supply and demand. 
          In countries with liberalized energy markets, the wholesale price of electricity varies 
          every hour.</p>
          
          <h4 className="text-xl font-semibold mt-6">Key Factors Affecting Prices</h4>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Renewable Energy Production:</strong> Wind, solar, and hydroelectric power generation fluctuate with weather conditions.</li>
            <li><strong>Time of Day:</strong> Peak hours (typically afternoon to early evening) have higher prices due to increased demand.</li>
            <li><strong>Seasonal Changes:</strong> Winter months typically see higher prices due to heating demand.</li>
            <li><strong>National Restrictions:</strong> Some countries impose taxes, grid fees, and renewable energy obligations.</li>
          </ul>
        </section>

        {/* Blog Section */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Latest Energy-saving Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map(post => (
              <article key={post.slug} className="bg-white rounded-xl shadow-md p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">Read more →</a>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white shadow-md rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
          <div className="space-y-4 mt-6">
            <div>
              <h5 className="font-semibold text-gray-900">What are electricity spot prices?</h5>
              <p className="text-gray-600">Electricity spot prices are the current market price for electricity delivery in today's market. They are determined by supply and demand on European electricity exchanges like Nord Pool and EEX.</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">How often do prices change?</h5>
              <p className="text-gray-600">Spot prices typically change every 15 minutes to once per hour, depending on the exchange and the specific market.</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Can I save money with dynamic pricing?</h5>
              <p className="text-gray-600">Yes. By charging appliances during low-price hours and avoiding high-price periods, households can significantly reduce energy costs.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} PowerPrice. Electricity spot prices for educational purposes only.</p>
        <p className="mt-2">Data source: ENTSO-E Transparency Platform. Prices are indicative only.</p>
      </footer>
    </div>
  );
}
