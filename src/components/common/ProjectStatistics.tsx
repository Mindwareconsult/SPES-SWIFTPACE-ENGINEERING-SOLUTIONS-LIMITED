import React, { useState, useEffect, useRef } from 'react';
import { Building2, Award, Users, ShieldCheck } from 'lucide-react';

interface MetricItem {
  id: string;
  label: string;
  targetValue: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const ProjectStatistics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics: MetricItem[] = [
    {
      id: 'projects',
      label: 'Projects Completed',
      targetValue: 48,
      suffix: '+',
      description: 'Commercial, civic infrastructure & residential developments',
      icon: Building2,
      accentColor: 'text-[#12BCEB]'
    },
    {
      id: 'experience',
      label: 'Years Combined Experience',
      targetValue: 15,
      suffix: '+',
      description: 'Senior structural, architectural & project directors',
      icon: Award,
      accentColor: 'text-[#078A43]'
    },
    {
      id: 'clients',
      label: 'Clients Served',
      targetValue: 85,
      suffix: '+',
      description: 'Corporate institutions, private investors & public agencies',
      icon: Users,
      accentColor: 'text-sky-400'
    },
    {
      id: 'safety',
      label: 'Structural Safety Record',
      targetValue: 100,
      suffix: '%',
      description: 'Code-compliant design & zero structural failures',
      icon: ShieldCheck,
      accentColor: 'text-teal-400'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative py-16 bg-[#040D1E]/90 border-y border-[#12BCEB]/20 overflow-hidden">
      {/* Subtle blueprint grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #12BCEB 1px, transparent 1px), linear-gradient(to bottom, #12BCEB 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
            <span className="w-2 h-2 rounded-full bg-[#12BCEB] animate-pulse"></span>
            <span>Measurable Engineering Impact</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Proven Performance by the Numbers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Backed by rigorous engineering calculations, laboratory-tested materials, and client confidence across Nigeria.
          </p>
        </div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <CounterCard
              key={metric.id}
              metric={metric}
              triggerAnimation={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CounterCardProps {
  metric: MetricItem;
  triggerAnimation: boolean;
}

const CounterCard: React.FC<CounterCardProps> = ({ metric, triggerAnimation }) => {
  const [count, setCount] = useState(0);
  const Icon = metric.icon;

  useEffect(() => {
    if (!triggerAnimation) return;

    let start = 0;
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic formula for organic smooth slowdown
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * metric.targetValue);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(metric.targetValue);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [triggerAnimation, metric.targetValue]);

  return (
    <div className="group relative rounded-2xl bg-[#081D43]/70 backdrop-blur-md border border-white/10 hover:border-[#12BCEB]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-cyan-950/30 overflow-hidden">
      
      {/* Ambient gradient hover effect */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#12BCEB]/10 rounded-full blur-2xl group-hover:bg-[#12BCEB]/20 transition-all pointer-events-none" />

      {/* Icon & Label Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
          {metric.label}
        </span>
        <div className="p-2 rounded-lg bg-[#06152F] border border-white/5 group-hover:border-[#12BCEB]/30 transition-colors">
          <Icon className={`w-4 h-4 ${metric.accentColor}`} />
        </div>
      </div>

      {/* Animated Numerals */}
      <div className="py-4">
        <div className="flex items-baseline gap-1">
          {metric.prefix && (
            <span className="font-serif-luxury text-2xl font-bold text-slate-400">
              {metric.prefix}
            </span>
          )}
          <span className="font-serif-luxury text-4xl sm:text-5xl font-black text-white tracking-tight">
            {count}
          </span>
          <span className={`font-serif-luxury text-3xl sm:text-4xl font-bold ${metric.accentColor}`}>
            {metric.suffix}
          </span>
        </div>

        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
          {metric.description}
        </p>
      </div>

      {/* Decorative Technical Accent Line */}
      <div className="pt-2">
        <div className="h-1 w-full bg-[#06152F] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#063B85] to-[#12BCEB] transition-all duration-1000 ease-out"
            style={{ width: triggerAnimation ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  );
};
