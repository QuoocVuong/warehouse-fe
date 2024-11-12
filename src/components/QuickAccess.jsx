import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { callGolangAPI } from '../api/auth';


const QuickAccess = () => {
  const accessItems = [
    // { title: 'Sản phẩm', color: 'green', link: '/products' },
    // { title: 'Yêu cầu nguyên liệu',color: 'yellow', link: '/materials-requests' },
    // { title: 'Chứng từ kho', info: '', link: '/warehouse-documents' }, // Added color: 'gray'
    // { title: 'Biên lai nhận hàng', color: 'yellow', link: '/goods-receipts' },
    // { title: 'Phiếu giao hàng', color: 'yellow', link: '/delivery-orders' },
    // { title: 'Số cái hàng tồn kho', info: '', link: '/stock-items' }, // Added color: 'gray'
    // { title: 'Số tồn kho', info: '', link: '/stock-quantities' }, // Added color: 'gray'
    // { title: 'Bảng Thông Tin Tổng Hợp', info: '', link: '/summary-reports' }, // Added color: 'gray'
  ];

  const [productCount, setProductCount] = useState(0);
  const [nhomHangCount, setNhomHangCount] = useState(0);

  useEffect(() => {
    const fetchData  = async () => {
      try {
         // Fetch số lượng sản phẩm
        const productResponse  = await callGolangAPI('products', {}, 'get'); // Lấy tất cả sản phẩm
        if (productResponse  && productResponse .data) {
          const availableProducts = productResponse .data.filter(product => product.status !== "deleted");
          setProductCount(availableProducts.length);
        }


          // Fetch số lượng nhóm hàng
          const nhomHangResponse = await callGolangAPI('itemgroups', {}, 'get'); // Không cần filter
          if (nhomHangResponse && nhomHangResponse.paging && nhomHangResponse.paging.total) {
            setNhomHangCount(nhomHangResponse.paging.total);
          }



        
      } catch (error) {
        console.error("Error fetching product count:", error);
        // Xử lý lỗi nếu cần (ví dụ: hiển thị thông báo lỗi, đặt giá trị mặc định cho productCount)
      }
    };

    fetchData();
  }, []);
   // Thêm sản phẩm vào accessItems sau khi đã fetch được productCount
   const updatedAccessItems = [
    ...accessItems,
    {
      title: 'Sản phẩm',info: `${productCount} Available`,color: 'green',link: '/products',
    },
    {
       title: 'Nhóm hàng', info: `${nhomHangCount} Available`, color: 'green', link: 'item-groups', 
    }, 
  ];



  return (
    <div className="bg-white p-4 rounded-lg"> {/* Added shadow-md */}
      <h2 className="text-lg font-bold mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-800 ">
        {updatedAccessItems.map((item, index) => (
          <Link
          key={index}
          to={item.link}
          className={`p-4 rounded-lg  transform hover:scale-105 transition duration-300 ease-in-out no-underline shadow-md flex items-center justify-between
            ${item.color === 'green' ? 'bg-[#F0F9F4] text-[#068C30] hover:shadow-green-200/50' : ''}
            ${item.color === 'yellow' ? 'bg-[#FFF9EC] text-[#B46300] hover:shadow-yellow-200/50' : ''}
            ${!item.color ? 'bg-gray-100 text-gray-800 hover:shadow-gray-200/50' : ''}
          `}
          style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1), 0px -2px 4px rgba(0, 0, 0, 0.1)" }} // Inline style for box-shadow
        >
           <h3 className="text-lg font-bold">{item.title}</h3> {/* Increased font size */}
          <div className="flex flex-col items-end text-green-800"> {/* Align info to the right */} {/* Added flex-col */}
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded-full leading-none
                ${item.color === 'green' ? 'bg-[#D2F2E0] text-[#068C30]' : ''}
                ${item.color === 'yellow' ? 'bg-[#FAF1DF] text-[#B46300]' : ''}
                ${item.color === 'gray' ? 'bg-gray-200 text-gray-700' : ''}
              `}
            >
              {/* Show a green dot if info is available */}
               {item.info ? <span className="text-green-500 mr-1 text-base font-bold">•</span> : null}
               {item.info || ""} {/* Display info or nothing */}
              {/* {item.info ? `• ${item.info}` : ''} */}
            </span>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;