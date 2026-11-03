import React, { useState } from 'react';
import { MessageSquare, Phone, X, ExternalLink } from 'lucide-react';

interface WhatsAppButtonProps {
  primaryPhone?: string;
  secondaryPhone?: string;
  contextMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  primaryPhone = '2349010753592',
  secondaryPhone = '2347076365837',
  contextMessage = 'Hello SPES Swiftpace Engineering Solutions Limited, I visited your website and would like to enquire about your engineering and construction services.'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const encodedMsg = encodeURIComponent(contextMessage);
  const primaryUrl = `https://wa.me/${primaryPhone.replace(/\D/g, '')}?text=${encodedMsg}`;
  const secondaryUrl = `https://wa.me/${secondaryPhone.replace(/\D/g, '')}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl bg-[#081D43] p-4 text-white shadow-2xl border border-[#12BCEB]/30 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-sm">SPES Engineering Desk</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 my-3 leading-relaxed">
            Chat with an engineer or construction director directly on WhatsApp for prompt project consultations.
          </p>

          <div className="space-y-2">
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-medium transition-all group shadow-sm"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <div className="text-left">
                  <div className="font-bold">WhatsApp Direct (Primary)</div>
                  <div className="text-[10px] text-emerald-100">+234 901 075 3592</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A2C68] hover:bg-[#0D3884] text-white text-xs font-medium transition-all group border border-white/10"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#12BCEB]" />
                <div className="text-left">
                  <div className="font-bold">WhatsApp Secondary</div>
                  <div className="text-[10px] text-slate-300">+234 707 636 5837</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="tel:+2349010753592"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium transition-all border border-white/5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Voice Call: +234 901 075 3592</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/40 hover:shadow-emerald-500/25 transition-all duration-300 group border border-emerald-400/30"
        aria-label="Connect on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="text-xs font-bold tracking-wide uppercase hidden sm:inline-block">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
