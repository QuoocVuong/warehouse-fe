import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Chart from '../components/Chart';
import QuickAccess from '../components/QuickAccess';
import MastersAndReports from '../components/MastersAndReports';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
      <header className="bg-gray-100 p-4 sticky top-0 z-10">
        <Header />
      </header>

      <main className="flex flex-grow p-4 overflow-y-auto"> 
        <div className="flex gap-4 h-full sticky top-0 items-center"> {/* Thêm items-center */}
          {/* Sidebar */}
          <div className="w-[200px]">
            <SideBar className="bg-gray-200 p-4 rounded-md shadow-md sticky top-[4rem]" /> 
          </div>

          {/* Khu vực chính - Cuộn riêng */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-md">
                <Chart />
              </div>
              <div className="bg-white p-4 rounded-md shadow-md">
                <QuickAccess />
              </div>
              <div className="bg-white p-4 rounded-md shadow-md">
                <MastersAndReports />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-300 p-4 max-h-[150px] sticky bottom-[-150px] z-10">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;