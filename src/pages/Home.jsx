import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Chart from '../components/Chart';
import QuickAccess from '../components/QuickAccess';
import MastersAndReports from '../components/MastersAndReports';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
      <header className="  sticky top-0 z-10">
        <Header />
      </header>

      <div className="flex-grow flex justify-center items-center"> {/* Bọc main và thêm flex-grow, justify-center, items-center */}
        <main className="flex  p-4 "> {/* Bỏ items-center từ main */}
          <div className="flex gap-4 h-full w-full items-center">
            {/* Sidebar - Sticky và top-0 */}
            <div className="w-[200px] sticky top-0"> 
              <SideBar className="bg-gray-200 p-4 rounded-md " /> 
            </div>

            {/* Khu vực chính */}
            <div className="flex-1 ">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md ">
                  <Chart />
                </div>
                <div className="bg-white p-4 rounded-md ">
                  <QuickAccess />
                </div>
                <div className="bg-white p-4 rounded-md ">
                  <MastersAndReports />
                </div>
              </div>
            </div>
            
          </div>
        </main>
      </div> {/* Kết thúc phần tử bọc main */}

      <footer className="sticky">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;