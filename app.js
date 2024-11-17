import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

const sampleData = [
  // Camry Data
  {
    year: 2021,
    model: 'Camry',
    cityMPG: 28,
    highwayMPG: 39,
    combinedMPG: 32,
    transmission: 'Automatic 8-Speed',
    engineSize: '2.5L 4-Cylinder'
  },
  {
    year: 2022,
    model: 'Camry',
    cityMPG: 28,
    highwayMPG: 39,
    combinedMPG: 32,
    transmission: 'Automatic 8-Speed',
    engineSize: '2.5L 4-Cylinder'
  },
  {
    year: 2023,
    model: 'Camry',
    cityMPG: 28,
    highwayMPG: 39,
    combinedMPG: 32,
    transmission: 'Automatic 8-Speed',
    engineSize: '2.5L 4-Cylinder'
  },
  {
    year: 2024,
    model: 'Camry',
    cityMPG: 27,
    highwayMPG: 38,
    combinedMPG: 31,
    transmission: 'Automatic 8-Speed',
    engineSize: '2.5L 4-Cylinder'
  },
  // RAV4 Data
  {
    year: 2021,
    model: 'RAV4',
    cityMPG: 27,
    highwayMPG: 35,
    combinedMPG: 30,
    transmission: 'Automatic 8-Speed',
    engineSize: '2.5L 4-Cylinder'
  },
  {
    year: 2022,
    model: 'RAV4',
    cityMPG: 27,
    highwayMPG: 35,
    combinedMPG: 30,
    transmission: 'Automatic 8-Speed',
    engineSize: '2.5L 4-Cylinder'
  },
  {
    year: 2023,
    model: 'RAV4',
    cityMPG: 27,
    highwayMPG: 34,
    combinedMPG: 30,
    transmission: 'Automatic 8-Speed',
    engineSize: '2.5L 4-Cylinder'
  },
  {
    year: 2024,
    model: 'RAV4',
    cityMPG: 27,
    highwayMPG: 34,
    combinedMPG: 30,
    transmission: 'Automatic 8-Speed',
    engineSize: '2.5L 4-Cylinder'
  }
];

const FuelEconomyDashboard = () => {
  const [selectedModels, setSelectedModels] = useState([]);

  const toggleModel = (model) => {
    setSelectedModels(prev => {
      if (prev.includes(model)) {
        return prev.filter(m => m !== model);
      }
      return [...prev, model];
    });
  };

  const filteredData = selectedModels.length > 0
    ? sampleData.filter(d => selectedModels.includes(d.model))
    : sampleData;

  // Prepare data for chart
  const prepareChartData = () => {
    const yearGroups = {};
    filteredData.forEach(entry => {
      if (!yearGroups[entry.year]) {
        yearGroups[entry.year] = {
          year: entry.year,
          'Camry - City': null,
          'Camry - Highway': null,
          'RAV4 - City': null,
          'RAV4 - Highway': null,
        };
      }
      if (entry.model === 'Camry') {
        yearGroups[entry.year]['Camry - City'] = entry.cityMPG;
        yearGroups[entry.year]['Camry - Highway'] = entry.highwayMPG;
      } else if (entry.model === 'RAV4') {
        yearGroups[entry.year]['RAV4 - City'] = entry.cityMPG;
        yearGroups[entry.year]['RAV4 - Highway'] = entry.highwayMPG;
      }
    });
    return Object.values(yearGroups);
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Toyota Fuel Economy Analysis (2021-2024)</CardTitle>
            <div className="flex space-x-4">
              <Button 
                variant={selectedModels.includes('Camry') ? "default" : "outline"}
                onClick={() => toggleModel('Camry')}
              >
                Camry
              </Button>
              <Button 
                variant={selectedModels.includes('RAV4') ? "default" : "outline"}
                onClick={() => toggleModel('RAV4')}
              >
                RAV4
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={prepareChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  label={{ value: 'Miles Per Gallon', angle: -90, position: 'insideLeft' }}
                  domain={[20, 45]}
                />
                <Tooltip />
                <Legend />
                {selectedModels.includes('Camry') && (
                  <>
                    <Line type="monotone" dataKey="Camry - City" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="Camry - Highway" stroke="#8884d8" strokeWidth={2} strokeDasharray="5 5" />
                  </>
                )}
                {selectedModels.includes('RAV4') && (
                  <>
                    <Line type="monotone" dataKey="RAV4 - City" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="RAV4 - Highway" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Model</th>
                  <th className="p-2 text-left">Year</th>
                  <th className="p-2 text-left">City MPG</th>
                  <th className="p-2 text-left">Highway MPG</th>
                  <th className="p-2 text-left">Combined MPG</th>
                  <th className="p-2 text-left">Engine Size</th>
                  <th className="p-2 text-left">Transmission</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{entry.model}</td>
                    <td className="p-2">{entry.year}</td>
                    <td className="p-2">{entry.cityMPG}</td>
                    <td className="p-2">{entry.highwayMPG}</td>
                    <td className="p-2">{entry.combinedMPG}</td>
                    <td className="p-2">{entry.engineSize}</td>
                    <td className="p-2">{entry.transmission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FuelEconomyDashboard;
