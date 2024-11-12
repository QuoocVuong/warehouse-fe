import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Header from '../components/Header';
import moment from 'moment';
import { callIdentityAPI } from '../api/auth';

const PersonalInfo = () => {
    const currentYear = moment().year();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [ setCalendarData] = useState(generateCalendarData(currentYear));
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [referenceDocType, setReferenceDocType] = useState("Reference Doctype");
    const typeDistributionData = [
          { label: 'Customer', value: 30, color: '#4338CA' },
          { label: 'Item', value: 65, color: '#3B82F6' },
          { label: 'Lead', value: 12, color: '#22D3EE' },
      ];
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const daysOfWeek = ["Mon", "Wed", "Fri"]; // Giảm số ngày trong tuần
  
  
  
    const totalValue = typeDistributionData.reduce((sum, item) => sum + item.value, 0);
    const calendarData = generateCalendarData(selectedYear);
      const getMonthIndex = (month) => months.indexOf(month);
  
 
  


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await callIdentityAPI('users/myInfor');
                setUserData(data.result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    function generateCalendarData(year) {
        const startOfYear = moment().year(year).startOf('year');
        const endOfYear = moment().year(year).endOf('year');
        const calendarData = [];
        let currentDay = startOfYear.clone();

        while (currentDay.isSameOrBefore(endOfYear)) {
            calendarData.push({
                date: currentDay.clone(),
                day: currentDay.date(),
                month: currentDay.format('MMM'),
                dayOfWeek: currentDay.format('ddd'),
                isCurrentDay: currentDay.isSame(moment(), 'day'),
            });
            currentDay.add(1, 'day');
        }
        return calendarData;
    }

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setSelectedYear(newYear);
        setCalendarData(generateCalendarData(newYear)); // Cập nhật calendarData
    };
    
  


    const userInfo = () => {
        if (loading) {
            return <p>Đang tải...</p>;
        } else if (error) {
            return <p>Lỗi: {error.message}</p>;
        } else if (userData) {
            return (
                <div className='mt-4'> {/*Thêm margin top */}
                    <p><span className="font-medium text-gray-700 mr-2">Tên đầy đủ : </span>{userData.username}</p>
                    <p><span className="font-medium text-gray-700 mr-2">Ngày Sinh:</span> {userData.dob}</p>
                    <p><span className="font-medium text-gray-700 mr-2">Tên:</span> {userData.firstName}</p>
                    <p><span className="font-medium text-gray-700 mr-2">Họ:</span> {userData.lastName}</p>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="mx-auto max-w-[1200px] ">
            <Header />
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Thông Tin Chi Tiết</h2>
                    <button className="text-blue-500 hover:underline text-base">Thay đổi người sử dụng</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 shadow-md">
                        <div className='flex flex-col space-y-4'>
                           <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-yellow-200 text-yellow-700 flex items-center justify-center mr-3">
                               ⚡️
                                </span>
                                <div>
                                    <span className="font-medium text-gray-700">Điểm năng lượng</span>
                                    <p className="text-2xl font-bold text-yellow-700">107</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-green-200 text-green-700 flex items-center justify-center mr-3">
                                ⭐
                                </span>
                                <div>
                                    <span className="font-medium text-gray-700">Điểm đánh giá</span>
                                    <p className="text-2xl font-bold text-green-700">0</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.07-7.07l.707.707m-2.828-9.9a5 5 0 107.07 7.07l.707-.707m-2.828 9.9h-1M3 12h.01" />
                                    </svg>
                                </span>
                                <div>
                                    <span className="font-medium text-gray-700">Rank</span>
                                    <p className="text-2xl font-bold text-blue-700">5</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center mr-3">
                                🗓️
                                </span>
                                <div>
                                    <span className="font-medium text-gray-700">Monthly Rank</span>
                                    <p className="text-2xl font-bold text-purple-700">3</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-medium text-gray-700 mb-2">Sửa hồ sơ</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>Thiết lập người dùng</li>
                                    <li>Bảng thành tích</li>
                                </ul>
                            </div>
                            {userInfo()}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-md font-bold">Overview</h3>
                            <div className="text-gray-500 text-sm flex items-center relative">
                            <select
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                            >
                                {Array.from({ length: 6 }, (_, i) => 2020 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                                ))}
                            </select>

                            <FaChevronDown className="text-xs text-gray-400 absolute right-2 pointer-events-none" />
                            </div>
                        </div>

                   

                    



                        {/* Type Distribution */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-md font-bold">Type Distribution</h3>
                                <div className="text-gray-500 text-sm flex items-center relative">
                                    <select value={referenceDocType} 
                                    onChange={(e) => setReferenceDocType(e.target.value)}
                                     className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8">
                                        <option value="Reference Doctype">Reference Doctype</option>
                                        {/* Add more options if needed */}
                                    </select>
                                    <FaChevronDown className="text-xs text-gray-400 absolute right-2 pointer-events-none" />
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden"> {/* Thêm overflow-hidden */}
                            {typeDistributionData.map((item, index) => (
                                <div
                                key={index}
                                className={`h-2.5 rounded-full`}
                                style={{ width: `${(item.value / totalValue) * 100}%`, backgroundColor: item.color ,display: 'inline-block' }} // Use inline-block and width
                                ></div>
                            ))}
                            </div>
                            {/* Labels */}
                            <div className="flex justify-between mt-1">
                            {typeDistributionData.map((item, index) => (
                                <div key={index} className="flex items-center">
                                <div
                                    className={`w-2 h-2 rounded-full mr-2`}
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className='text-xs text-gray-600'>{item.label}</span>
                                <span className="ml-2 text-xs text-gray-400">{item.value}</span>
                                </div>
                            ))}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;