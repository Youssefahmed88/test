import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartDataPoint {
  month: string;
  growthRate: number;
  avgDonation: number;
  retentionRate: number;
}

interface DonationAnalyticsChartProps {
  data: ChartDataPoint[];
}

const DonationAnalyticsChart = ({ data }: DonationAnalyticsChartProps) => {
  const [period, setPeriod] = useState('Year');

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Donation Analytics</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Growth Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">Avg Donation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-3" />
              <span className="text-muted-foreground">Retention Rate</span>
            </div>
          </div>
          <select
            className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>Year</option>
            <option>Month</option>
            <option>Week</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="left"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value: number, name: string) => {
              if (name === 'growthRate' || name === 'retentionRate') {
                return [`${value.toFixed(1)}%`, name === 'growthRate' ? 'Growth Rate' : 'Retention Rate'];
              }
              return [`$${value.toFixed(0)}`, 'Avg Donation'];
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => {
              if (value === 'growthRate') return 'Monthly Growth Rate';
              if (value === 'avgDonation') return 'Average Donation';
              if (value === 'retentionRate') return 'Donor Retention Rate';
              return value;
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="growthRate"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgDonation"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="retentionRate"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center p-3 bg-secondary/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Monthly Donation Growth Rate</p>
          <p className="text-sm text-muted-foreground mb-2">How fast donations are increasing month over month</p>
          <p className="text-xs font-mono text-muted-foreground">(This Month - Last Month) / Last Month × 100%</p>
        </div>
        <div className="text-center p-3 bg-secondary/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Average Donation</p>
          <p className="text-sm text-muted-foreground mb-2">Typical donation size across the platform</p>
          <p className="text-xs font-mono text-muted-foreground">Total Donations / Number of Donations</p>
        </div>
        <div className="text-center p-3 bg-secondary/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Donor Retention Rate</p>
          <p className="text-sm text-muted-foreground mb-2">How many donors return to donate again</p>
          <p className="text-xs font-mono text-muted-foreground">Returning Donors / Total Active Donors × 100%</p>
        </div>
      </div>
    </Card>
  );
};

export default DonationAnalyticsChart;
