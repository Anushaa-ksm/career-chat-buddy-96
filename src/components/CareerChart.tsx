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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-card/90 p-2 border-2 border-border font-pixel text-xs">
          <p className="label text-foreground">{`${label || payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  if (type === 'bar') {
    return (
      <div className="w-full h-64 bg-card/80 border-4 border-border p-4 font-pixel">
        <h3 className="text-xs font-bold mb-4 text-card-foreground text-center tracking-wider">CAREER MATCH %</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 8, fontFamily: '"Press Start 2P"' }}
              stroke="hsl(var(--foreground))"
              interval={0}
              dy={5}
            />
            <YAxis 
              tick={{ fontSize: 10, fontFamily: '"Press Start 2P"' }}
              stroke="hsl(var(--foreground))"
            />
            <Tooltip 
              cursor={{fill: 'hsl(var(--muted))'}}
              content={<CustomTooltip />}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-72 bg-card/80 border-4 border-border p-4 font-pixel">
      <h3 className="text-xs font-bold mb-2 text-card-foreground text-center tracking-wider">CAREER PREDICTIONS</h3>
      <ResponsiveContainer width="100%" height="60%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            dataKey="value"
            strokeWidth={4}
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
            content={<CustomTooltip />}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 border-2 border-foreground"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-card-foreground">
              {item.name.slice(0, 4)}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};