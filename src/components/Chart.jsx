import { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types'; // Import PropTypes

const Chart = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const tooltipRef = useRef(null);

  const data = [
    { name: 'Cửa hàng - MO', value: 1100, stockValue: '1232984218406' },
    { name: 'Hàng chuyển đi - MO', value: 0, stockValue: '0' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div ref={tooltipRef} className="bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm text-gray-700">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-pink-300 mr-2"></span>
            <strong>{label}</strong>
          </div>
          <p>{payload[0].payload.stockValue}</p>
          <p>Giá trị tồn</p>
        </div>
      );
    }

    return null;
  };
   // Khai báo kiểu dữ liệu cho props của CustomTooltip
   CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        payload: PropTypes.shape({
          stockValue: PropTypes.string.isRequired, 
          // ... các thuộc tính khác của payload 
        }).isRequired,
      })
    ),
    label: PropTypes.string,
  };

  const handleBarHover = (data, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (activeIndex !== null && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      if (tooltipRect.right > windowWidth) {
        tooltipRef.current.style.left = `${windowWidth - tooltipRect.width - 10}px`;
      }
    }
  }, [activeIndex]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Warehouse wise Stock Value
        </h2>
        {/* Buttons */}
      </div>
      <p className="text-sm text-gray-500">
        Đã đồng bộ hóa lần cuối 22 phút trước
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Legend />
          <Bar dataKey="value" fill="#FF6384" onMouseOver={handleBarHover} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;