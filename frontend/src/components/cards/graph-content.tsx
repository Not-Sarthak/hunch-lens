"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const generatePriceData = () => {
  const basePrice = 0.025;
  const data = [];

  for (let i = 0; i < 30; i++) {
    const volatility = 0.05;
    const randomFactor = Math.random() * volatility * 2 - volatility;
    const trendFactor = i > 15 ? 0.002 : -0.001;
    const dayChange = basePrice * (randomFactor + trendFactor);

    const previousPrice = i > 0 ? data[i - 1].price : basePrice;
    const newPrice = Math.max(0.001, previousPrice + dayChange);
    
    data.push({
      day: i + 1,
      price: newPrice,
      date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#16151A] p-3 border border-[#1E1E21] rounded-lg shadow-lg">
        <p className="text-[#6FDBB5] font-medium">{payload[0].payload.date}</p>
        <p className="text-white font-bold">
          ${payload[0].value.toFixed(5)}
        </p>
      </div>
    );
  }
  return null;
};

export const GraphContent = () => {
  const [timeRange, setTimeRange] = useState("1M");
  const data = generatePriceData();
  
  const startPrice = data[0].price;
  const endPrice = data[data.length - 1].price;
  const priceChange = ((endPrice - startPrice) / startPrice) * 100;
  const isPositive = priceChange >= 0;

  const handleRangeChange = (range: string) => {
    setTimeRange(range);
  };

  return (
    <div className="col-span-2 sm:col-span-2 p-3 sm:p-5 border border-[#1E1E21] rounded-lg bg-gradient-to-b from-[#1E1E21]/50 to-transparent backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div>
          <h3 className="text-[#787878] text-xs sm:text-sm mb-1">Token Price</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-lg sm:text-xl font-medium">${data[data.length - 1].price.toFixed(5)}</span>
            <span className={`text-xs sm:text-sm ${isPositive ? 'text-[#6FDBB5]' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 bg-[#16151A] rounded-lg p-1 text-[10px] sm:text-xs">
          {['1D', '1W', '1M', '3M', 'ALL'].map((range) => (
            <button
              key={range}
              onClick={() => handleRangeChange(range)}
              className={`px-2 sm:px-3 py-1 rounded-md transition-all ${
                timeRange === range
                  ? 'bg-[#1E1E21] text-white'
                  : 'text-[#787878] hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[200px] sm:h-[250px] md:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6FDBB5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6FDBB5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#787878', fontSize: 10 }}
              minTickGap={30}
              height={30}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#787878', fontSize: 10 }}
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => `$${value.toFixed(3)}`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#6FDBB5" 
              strokeWidth={2}
              fill="url(#colorPrice)" 
              activeDot={{ r: 6, fill: '#6FDBB5', stroke: '#fff', strokeWidth: 2 }}
              animationDuration={1500}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between text-[10px] sm:text-xs text-[#787878] gap-2 sm:gap-0">
        <span>Volume 24h: 1.24 ETH</span>
        <span>Market Cap: $12,450</span>
      </div>
    </div>
  );
}; 