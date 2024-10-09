
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Chart from '../components/Chart';
import QuickAccess from '../components/QuickAccess';
import MastersAndReports from '../components/MastersAndReports';

function Home() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-8">
        <Header />
        <div className="grid grid-cols-1 gap-4 mt-8">
          <Chart />
          <QuickAccess />
          <MastersAndReports />
        </div>
      </main>
    </div>
  );
}

export default Home;