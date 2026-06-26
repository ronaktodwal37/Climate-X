import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'dark';
  hover?: boolean;
  glow?: boolean;
}

const variants = {
  default: 'bg-climate-dark/70 backdrop-blur-xl border border-cyan-500/10',
  accent: 'bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-xl border border-cyan-500/20',
  dark: 'bg-climate-dark/90 backdrop-blur-xl border border-cyan-500/5',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', variant = 'default', hover = true, glow = false }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`
          ${variants[variant]}
          rounded-xl
          ${hover ? 'hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5' : ''}
          ${glow ? 'shadow-xl shadow-cyan-500/10' : ''}
          transition-all duration-300
          p-4
          ${className}
        `}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={hover ? { scale: 1.01 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  decimal?: number;
}

export function StatCard({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  color = 'primary',
  decimal = 1,
}: StatCardProps) {
  const colors = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-climate-success',
    warning: 'text-climate-warning',
    danger: 'text-climate-danger',
  };

  const trendColors = {
    up: 'text-climate-danger',
    down: 'text-climate-success',
    stable: 'text-muted-foreground',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→',
  };

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-bold ${colors[color]}`}>
              {typeof value === 'number' ? value.toFixed(decimal) : value}
            </span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-1 text-xs ${trendColors[trend]}`}>
              <span>{trendIcons[trend]}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`${colors[color]} opacity-80`}>
            {icon}
          </div>
        )}
      </div>
      <div className={`absolute inset-0 bg-gradient-to-br from-${color === 'primary' ? 'primary' : color}/5 to-transparent pointer-events-none`} />
    </GlassCard>
  );
}

interface MetricGaugeProps {
  value: number;
  max?: number;
  label: string;
  unit?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MetricGauge({
  value,
  max = 100,
  label,
  unit,
  color = '#00C2FF',
  size = 'md',
}: MetricGaugeProps) {
  const sizes = {
    sm: { radius: 40, strokeWidth: 6 },
    md: { radius: 60, strokeWidth: 8 },
    lg: { radius: 80, strokeWidth: 10 },
  };

  const { radius, strokeWidth } = sizes[size];
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = radius + strokeWidth;
  const viewBoxSize = center * 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={viewBoxSize}
        height={viewBoxSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="transform -rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(0, 194, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute transform rotate-0" style={{ marginTop: radius - 15 }}>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold" style={{ color }}>
            {value.toFixed(1)}
          </span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}
