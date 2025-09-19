import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface CareerData {
  name: string;
  value: number;
  color: string;
}

interface CareerChartProps {
  data: CareerData[];
  type?: 'pie' | 'bar';
}

const COLORS = {
  Engineering: '#22C55E',  // Green
  Medicine: '#EF4444',     // Red  
  Arts: '#F59E0B',         // Amber
  Commerce: '#3B82F6'      // Blue
};

export const CareerChart = ({ data, type = 'pie' }: CareerChartProps) => {
  const chartData = data.map(item => ({
    ...item,
    color: COLORS[item.name as keyof typeof COLORS] || '#6B7280'
  }));

  if (type === 'bar') {
    return (
      <div className="w-full h-64 bg-card/80 border-2 border-border p-4 font-pixel">
        <h3 className="text-sm font-bold mb-2 text-card-foreground text-center">CAREER MATCH %</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fontFamily: 'Courier New' }}
              stroke="hsl(var(--foreground))"
            />
            <YAxis 
              tick={{ fontSize: 10, fontFamily: 'Courier New' }}
              stroke="hsl(var(--foreground))"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '2px solid hsl(var(--border))',
                borderRadius: 0,
                fontFamily: 'Courier New'
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-64 bg-card/80 border-2 border-border p-4 font-pixel">
      <h3 className="text-sm font-bold mb-2 text-card-foreground text-center">CAREER PREDICTIONS</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            strokeWidth={2}
            stroke="hsl(var(--background))"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '2px solid hsl(var(--border))',
              borderRadius: 0,
              fontFamily: 'Courier New'
            }}
            formatter={(value: number) => [`${value}%`, 'Match']}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 border border-foreground"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-card-foreground">
              {item.name}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};