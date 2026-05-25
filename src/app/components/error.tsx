import { AlertTriangle } from "lucide-react";

export default function ApplicationError({error}: {error: string}) {
    return (
        <div className="max-w-md mx-auto p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
            <div>
                <h3 className="text-sm font-semibold text-red-800">Application Notice</h3>
                <p className="text-xs text-red-700 mt-1">{error}</p>
                </div>
            </div>
    )
}