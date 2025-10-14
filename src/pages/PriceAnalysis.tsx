import { useState } from "react";
import { FilterBar, Filters } from "@/components/FilterBar";
import { mockData } from "@/data/mockData";
import { filterData } from "@/utils/filterData";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PriceAnalysis = () => {
  const [filters, setFilters] = useState<Filters>({
    competitor: "all",
    clothingType: "all",
    clothingSubtype: "all",
  });

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredData = filterData(mockData, filters);

  // Price vs Clothing Type
  const priceByType = filteredData.map((item, index) => ({
    type: item.clothingType,
    price: item.price,
    id: index,
  }));

  // Price vs Clothing Subtype
  const priceBySubtype = filteredData.map((item, index) => ({
    subtype: item.clothingSubtype,
    price: item.price,
    id: index,
  }));

  // Price vs Competitor Clothing Type
  const fashionbugTypeData = filteredData
    .filter(item => item.competitor === "fashionbug")
    .map((item, index) => ({ type: item.clothingType, price: item.price, id: index }));
  
  const coolplanetTypeData = filteredData
    .filter(item => item.competitor === "coolplanet")
    .map((item, index) => ({ type: item.clothingType, price: item.price, id: index }));

  // Price vs Competitor Clothing Subtype
  const fashionbugSubtypeData = filteredData
    .filter(item => item.competitor === "fashionbug")
    .map((item, index) => ({ subtype: item.clothingSubtype, price: item.price, id: index }));
  
  const coolplanetSubtypeData = filteredData
    .filter(item => item.competitor === "coolplanet")
    .map((item, index) => ({ subtype: item.clothingSubtype, price: item.price, id: index }));

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Price Analysis</h1>
          <p className="text-muted-foreground text-lg">
            Compare pricing strategies across competitors and product categories
          </p>
        </div>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        <div className="grid gap-8">
          {/* Price vs Clothing Type */}
          <div className="bg-card rounded-xl border border-border shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Price vs Clothing Type</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="type" name="Type" className="text-sm" />
                <YAxis dataKey="price" name="Price (LKR)" className="text-sm" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="All Products" data={priceByType} fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Price vs Clothing Subtype */}
          <div className="bg-card rounded-xl border border-border shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Price vs Clothing Subtype</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="subtype" name="Subtype" className="text-sm" />
                <YAxis dataKey="price" name="Price (LKR)" className="text-sm" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="All Products" data={priceBySubtype} fill="hsl(var(--accent))" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Price vs Competitor Clothing Type */}
          <div className="bg-card rounded-xl border border-border shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Price vs Competitor Clothing Type</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="type" name="Type" className="text-sm" />
                <YAxis dataKey="price" name="Price (LKR)" className="text-sm" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="FashionBug" data={fashionbugTypeData} fill="hsl(var(--primary))" />
                <Scatter name="CoolPlanet" data={coolplanetTypeData} fill="hsl(var(--accent))" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Price vs Competitor Clothing Subtype */}
          <div className="bg-card rounded-xl border border-border shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Price vs Competitor Clothing Subtype</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="subtype" name="Subtype" className="text-sm" />
                <YAxis dataKey="price" name="Price (LKR)" className="text-sm" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="FashionBug" data={fashionbugSubtypeData} fill="hsl(var(--primary))" />
                <Scatter name="CoolPlanet" data={coolplanetSubtypeData} fill="hsl(var(--accent))" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceAnalysis;
