import { Search, RefreshCw } from 'lucide-react';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loading: boolean;
    fetchCountries: (query: string) => void;
}

export default function SearchBar({searchQuery, setSearchQuery, loading, fetchCountries}: SearchBarProps) {

    return (
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
    )
}