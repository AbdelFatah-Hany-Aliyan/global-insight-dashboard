
import { Layers, DollarSign, Users, Map, Globe } from "lucide-react";

export default function CountryData({ compareList }: { compareList: any[] }) {
    return (
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
    )
}