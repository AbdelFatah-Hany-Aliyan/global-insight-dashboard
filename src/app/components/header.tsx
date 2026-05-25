import { Globe } from 'lucide-react';

export default function Header(){
    return(
        <header className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600 flex items-center justify-center gap-2">
            <Globe className="w-9 h-9"/> Global Insight Dashboard
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
            Search and compare world countries. Built with strict API resilience mechanisms.
            </p>
        </header>
    )
}