import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import type { ChartDataPoint } from '@/types';

interface ClimateLineChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
  height?: number;
  showPredicted?: boolean;
}

export function ClimateLineChart({
  data,
  title,
  color = '#00C2FF',
  height = 250,
  showPredicted = false,
}: ClimateLineChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 194, 255, 0.1)" />
          <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(11, 30, 61, 0.95)',
              border: '1px solid rgba(0, 194, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: color }}
          />
          {showPredicted && (
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#FFB300"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

interface ClimateAreaChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
  height?: number;
}

export function ClimateAreaChart({
  data,
  title,
  color = '#1F6FEB',
  height = 250,
}: ClimateAreaChartProps) {
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 194, 255, 0.1)" />
          <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(11, 30, 61, 0.95)',
              border: '1px solid rgba(0, 194, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

interface ClimateBarChartProps {
  data: { name: string; value: number }[];
  title: string;
  height?: number;
}

export function ClimateBarChart({ data, title, height = 250 }: ClimateBarChartProps) {
  const colors = ['#00C2FF', '#1F6FEB', '#00C853', '#FFB300', '#F44336'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 194, 255, 0.1)" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(11, 30, 61, 0.95)',
              border: '1px solid rgba(0, 194, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

interface RiskPieChartProps {
  data: { name: string; value: number; fill: string }[];
  height?: number;
}

export function RiskPieChart({ data, height = 250 }: RiskPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(11, 30, 61, 0.95)',
            border: '1px solid rgba(0, 194, 255, 0.2)',
            borderRadius: '8px',
            color: '#fff',
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => <span className="text-muted-foreground text-xs">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
