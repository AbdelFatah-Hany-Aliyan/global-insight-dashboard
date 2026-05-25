'use client';

import { useState } from 'react';
import {Search, Globe, Users, Map, DollarSign, AlertTriangle, RefreshCw, Layers} from 'lucide-react';
import { Country } from '../types/country';

export default function Home() {

  const [searchQuery, setSearchQuery] = useState("");
  const [compareList, setCompareList] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleCompare = (country: Country) =>{
    if(compareList.some((c) => c.name.common === country.name.common)){
      setCompareList(compareList.filter((c) => c.name.common !== country.name.common));
    }else{
      if(compareList.length >= 2){
        alert("You can only compare two countries at a time.");
        return;
      }
      setCompareList([...compareList, country]);
    }
  }

  const fetchCountries = async (query: string) => {
    const trimed = query.trim();

    if(trimed.length > 50){
      setError("Search query is too long. Please limit to 50 characters.");
      return;
    }

    if(trimed.length < 3){
      setError("Please enter at least 3 characters for the country name.");
      return;
    }

    if(!trimed){
      setError("Please enter a valid country name.");
      return;
    }

    if(/^a-zA-Z\s]/.test(trimed)){
      setError("Invalid Characters detected. Please use text only")
      return
    }

    setLoading(true);
    setError(null)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000);

    try{
      const res = await fetch(`https://restcountries.com/v3.1/name/${trimed}`,{
        signal: controller.signal
      })

      clearTimeout(timeout);

      if(res.status === 404){
        throw new Error("No countries found matching your search.")
      }
      if(!res.ok){
        throw new Error(`Server responded with error status: ${res.status}`);
      }

      const data: Country[] = await res.json();
      setCountries(data);
    }catch(err: any){
      clearTimeout(timeout);
      if(err.name === "AbortError"){
        setError("The request took too long and was aborted. Please try again.");
      }else{
        setError(err.message || "Something went wrong while fetching data. Please try again.");
      }
      setCountries([]);
    }finally{
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600 flex items-center justify-center gap-2">
            <Globe className="w-9 h-9"/> Global Insight Dashboard
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Search and compare world countries. Built with strict API resilience mechanisms.
          </p>
        </header>

        {/* Search Bar & Input Handling */}
        <div className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search e.g., Palestine, Canada, Japan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchCountries(searchQuery)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400"/>
          </div>
          <button
            onClick={() => fetchCountries(searchQuery)}
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Search"}
          </button>
        </div>

        {/* Error States Display */}
        {error && (
          <div className="max-w-md mx-auto p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
            <div>
              <h3 className="text-sm font-semibold text-red-800">Application Notice</h3>
              <p className="text-xs text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Country Data Display */}
        {compareList.length > 0 && (
          <section className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
              <Layers className="w-5 h-5"/> Comparison Slot ({compareList.length}/2)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compareList.map((country) => {
                const currencyKey = country.currencies ? Object.keys(country.currencies)[0] : null;
                const currency = currencyKey && country.currencies ? country.currencies[currencyKey] : null;

                return(
                  <div key={country.name.common} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={country.flag.svg} alt={country.name.common} className="w-12 h-8 object-cover rounded shadow-xs" />
                      <h3 className="font-bold text-xl">{country.name.common}</h3>
                    </div>
                    <hr/>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5"> <Users/> Pop: {country.population.toLocaleString()}</div>
                      <div className="flex items-center gap-1.5"> <Map/> Area: {country.area.toLocaleString()} km²</div>
                      <div className="flex items-center gap-1.5"> <Globe/> Globe: {country.region}</div>
                      <div>
                        <DollarSign className="w-4 h-4 text-gray-400"/>Cur: {currency ? `${currency.name} (${currency.symbol || ''})` : "N/A"}
                      </div>
                    </div>
                  </div>
                )})}
            </div>
          </section>
        )}

        {/* Search Results */}
        {countries.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {countries.map((country) => {
                const isCompared = compareList.some((c) => c.name.common === country.name.common);
                return(
                  <div key={country.name.common} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={country.flag.svg} alt={country.name.common} className="w-10 h-6 object-cover rounded" />
                      <h3 className="font-semibold text-gray-800 truncate">{country.name.common}</h3>
                    </div>
                    <button
                      onClick={() => toggleCompare(country)}
                      className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors ${
                        isCompared
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-gray-100 text-gray-700 hover:bg-indigo-600 hover:text-white"
                      }`}
                    >
                      {isCompared ? "Remove from Compare" : "Add to Compare"}
                    </button>
                  </div>
                )})}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
