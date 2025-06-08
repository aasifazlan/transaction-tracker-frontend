 
import Register from './Register';
import Transactions from './Transactions';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen text-center bg-gray-50">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-blue-700">
        💸 SaaS Finance Manager
      </h1>

      <p className="mb-6 text-gray-600 max-w-md md:max-w-lg lg:max-w-xl text-sm md:text-base">
        Track your credits and debits effortlessly. View transaction history, analyze your spending, and stay in control.
      </p>

      <div className="w-full max-w-md">
        {user ? <Transactions /> : <Register />}
      </div>
    </div>
  );
};

export default Home;
