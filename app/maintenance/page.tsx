import React from "react";
import { AlertTriangle } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-12 rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col items-center">
        <div className="h-20 w-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-10 w-10 text-amber-500" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          We'll be right back
        </h1>
        
        <p className="text-neutral-400 text-lg md:text-xl mb-8 max-w-md">
          Clevora Agro is currently undergoing scheduled maintenance. We are updating our systems to serve you better.
        </p>
        
        <div className="w-full max-w-sm h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500 animate-pulse rounded-full" style={{ width: '100%' }}></div>
        </div>
        
        <p className="text-neutral-500 text-sm mt-8">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
}
