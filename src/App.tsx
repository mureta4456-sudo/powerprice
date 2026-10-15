import React, { useState } from 'react';

export function App() {
  const [kwh, setKwh] = useState<number>(150);
  const [rate, setRate] = useState<number>(0.15); // EUR per kWh

  const totalCost = (kwh * rate).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Galvenes daļa */}
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Electricity-Rate.eu</h1>
          <nav className="space-x-4 text-sm font-medium text-gray-600">
            <a href="#calculator" className="hover:text-blue-600">Kalkulators</a>
            <a href="#about" className="hover:text-blue-600">Par tarifiem</a>
            <a href="#faq" className="hover:text-blue-600">Biežāk uzdotie jautājumi</a>
          </nav>
        </div>
      </header>

      {/* Galvenais saturs */}
      <main className="max-w-4xl mx-auto px-4 space-y-12 pb-16">
        
        {/* Ievads un virsraksts */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Eiropas Elektroenerģijas Tarifu un Izmaksu Kalkulators
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Salīdziniet un aprēķiniet elektroenerģijas patēriņa izmaksas dažādās Eiropas Savienības valstīs. Iegūstiet aktuālo informāciju par enerģijas tirgus tendencēm un ietaupiet uz rēķiniem.
          </p>
        </section>

        {/* Kalkulatora rīks */}
        <section id="calculator" className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Elektrības rēķina aprēķins</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mēneša patēriņš (kWh):
              </label>
              <input
                type="number"
                value={kwh}
                onChange={(e) => setKwh(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarifs (€ par kWh):
              </label>
              <input
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
            <span className="text-lg font-medium text-blue-900">Kopējās mēneša izmaksas:</span>
            <span className="text-3xl font-extrabold text-blue-600">€{totalCost}</span>
          </div>
        </section>

        {/* Padziļināts informatīvais teksts (nepieciešams AdSense apstiprinājumam) */}
        <section id="about" className="bg-white shadow-md rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Kā tiek veidoti elektroenerģijas tarifi Eiropā?</h3>
          <p>
            Elektroenerģijas cena galalietotājiem sastāv no vairākām būtiskām komponentēm: pašas enerģijas ražošanas cenas biržā (piemēram, Nord Pool), pārvades un sadales sistēmas operatoru tarifiem, valsts nodokļiem un atjaunojamās enerģijas obligātās iepirkuma komponentēm.
          </p>
          <p>
            Mūsu mērķis ir sniegt pārskatāmu un viegli saprotamu informāciju par to, kā optimizēt savu elektroenerģijas patēriņu, izvēlēties izdevīgāko biržas vai fiksēto līguma plānu un samazināt ikmēneša izmaksas.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 pt-4">Galvenie padomi elektrības taupīšanai mājās:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><strong>Izmantojiet energoefektīvas ierīces:</strong> Nomainiet vecās spuldzes pret LED un izvēlieties A+++ klases sadzīves tehniku.</li>
            <li><strong>Pielāgojiet patēriņu stundām:</strong> Ja jums ir biržas (mainīgais) tarifs, lielāko elektroenerģijas patēriņu (veļas mazgāšana, trauku mazgāšana) plānojiet naktīs vai brīvdienās, kad cenas biržā ir zemākas.</li>
            <li><strong>Izslēdziet liekās ierīces:</strong> Neatstājiet ierīces gaidīšanas režīmā (standby), jo tās arī patērē elektroenerģiju.</li>
          </ul>
        </section>

        {/* Biežāk uzdotie jautājumi (FAQ) */}
        <section id="faq" className="bg-white shadow-md rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Biežāk uzdotie jautājumi</h3>
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-gray-900 text-lg">Kāda ir atšķirība starp fiksēto un mainīgo tarifu?</h5>
              <p className="text-gray-600">Fiksētais tarifs garantē nemainīgu kilovatstundas cenu līguma darbības laikā, savukārt mainīgais (biržas) tarifs mainās katru stundu atkarībā no elektroenerģijas pieprasījuma un piedāvājuma tirgū.</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 text-lg">Kā aprēķināt savu vidējo dienas patēriņu?</h5>
              <p className="text-gray-600">Jūs varat apskatīt savu iepriekšējo mēnešu rēķinus vai izmantot viedā skaitītāja datus, ko piedāvā jūsu sadales tīkla operators.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Kājene */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Electricity-Rate.eu. Visas tiesības aizsargātas.</p>
      </footer>
    </div>
  );
}
