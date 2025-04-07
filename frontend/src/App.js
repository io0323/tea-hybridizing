import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VarietyCard = ({ variety, onDragStart }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md cursor-move"
      draggable
      onDragStart={(e) => onDragStart(e, variety)}
    >
      <h3 className="text-lg font-bold">{variety.name}</h3>
      <div className="mt-2">
        <p>香り: {variety.aroma}/10</p>
        <p>耐病性: {variety.disease_resistance}/10</p>
        <p>収量: {variety.yield}/10</p>
        <p>味: {variety.flavor}/10</p>
      </div>
    </div>
  );
};

const DropZone = ({ onDrop, children }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const variety = JSON.parse(e.dataTransfer.getData('variety'));
    onDrop(variety);
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 p-4 rounded-lg min-h-[200px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

const VarietyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    aroma: 5,
    disease_resistance: 5,
    yield: 5,
    flavor: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      aroma: 5,
      disease_resistance: 5,
      yield: 5,
      flavor: 5
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">新品種登録</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">品種名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">香り (1-10)</label>
          <input
            type="number"
            name="aroma"
            value={formData.aroma}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">耐病性 (1-10)</label>
          <input
            type="number"
            name="disease_resistance"
            value={formData.disease_resistance}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">収量 (1-10)</label>
          <input
            type="number"
            name="yield"
            value={formData.yield}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">味 (1-10)</label>
          <input
            type="number"
            name="flavor"
            value={formData.flavor}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          登録
        </button>
      </div>
    </form>
  );
};

function App() {
  const [varieties, setVarieties] = useState([]);
  const [selectedVarieties, setSelectedVarieties] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/varieties');
      setVarieties(response.data);
    } catch (error) {
      console.error('Error fetching varieties:', error);
    }
  };

  const handleAddVariety = async (formData) => {
    try {
      await axios.post('http://localhost:5001/api/varieties', formData);
      fetchVarieties();
    } catch (error) {
      console.error('Error adding variety:', error);
    }
  };

  const handleDragStart = (e, variety) => {
    e.dataTransfer.setData('variety', JSON.stringify(variety));
  };

  const handleDrop = (variety) => {
    if (selectedVarieties.length < 2) {
      setSelectedVarieties([...selectedVarieties, variety]);
    }
  };

  const handleHybridize = async () => {
    if (selectedVarieties.length === 2) {
      try {
        const response = await axios.post('http://localhost:5001/api/hybridize');
        const newVariety = response.data;
        setVarieties([...varieties, newVariety]);
        setSelectedVarieties([]);
        updateChartData();
      } catch (error) {
        console.error('Error hybridizing:', error);
      }
    }
  };

  const updateChartData = () => {
    const labels = varieties.map(variety => variety.name);
    const data = {
      labels,
      datasets: [
        {
          label: '香り',
          data: varieties.map(variety => variety.aroma),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: '耐病性',
          data: varieties.map(variety => variety.disease_resistance),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: '収量',
          data: varieties.map(variety => variety.yield),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: '味',
          data: varieties.map(variety => variety.flavor),
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
      ],
    };
    setChartData(data);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">品種改良シミュレーター</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">品種一覧</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {varieties.map(variety => (
                <VarietyCard
                  key={variety.id}
                  variety={variety}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </div>

          <div>
            <VarietyForm onSubmit={handleAddVariety} />
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">交配エリア</h2>
              <DropZone onDrop={handleDrop}>
                {selectedVarieties.map(variety => (
                  <VarietyCard key={variety.id} variety={variety} />
                ))}
                {selectedVarieties.length === 2 && (
                  <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleHybridize}
                  >
                    交配する
                  </button>
                )}
              </DropZone>
            </div>
          </div>
        </div>

        {chartData && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">品種特性比較</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <Bar data={chartData} />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default App; 