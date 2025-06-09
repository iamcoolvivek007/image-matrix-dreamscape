
import { MatrixRain } from '../components/MatrixRain';
import { LinuxTaskbar } from '../components/LinuxTaskbar';
import { Dashboard } from '../components/Dashboard';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden scan-lines">
      {/* Background Image with enhanced transparency */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 grayscale contrast-125"
        style={{
          backgroundImage: `url('/lovable-uploads/ef4b6569-7747-4438-955a-5ef3b43914ee.png')`
        }}
      />
      
      {/* Matrix Rain Effect */}
      <MatrixRain />
      
      {/* Futuristic Dashboard */}
      <Dashboard />
      
      {/* Linux Taskbar */}
      <LinuxTaskbar />
    </div>
  );
};

export default Index;
