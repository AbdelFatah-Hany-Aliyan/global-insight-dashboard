import { Country } from "@/types/country";

interface SearchResultsProps {
    countries: Country[];
    compareList: Country[];
    toggleCompare: (country: Country) => void;
}

export default function SearchResults({countries, compareList, toggleCompare}: SearchResultsProps) {

    return (
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
    )
}