import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', imageUrl: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const googleUser = JSON.parse(localStorage.getItem('googleUser'));
    const normalUser = JSON.parse(localStorage.getItem('normalUser'));

    if (googleUser) {
      setUser({ name: googleUser.name, imageUrl: googleUser.imageUrl });
    } else if (normalUser) {
      setUser({ name: normalUser.name });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('googleUser');
    localStorage.removeItem('normalUser');
    setUser({ name: '', imageUrl: '' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-md p-4 lg:h-screen">
        <h1 className="text-xl font-bold text-indigo-600 mb-6">HORIZON PRO</h1>
        <nav>
          <ul className="space-y-6">
            <li className="text-indigo-600 font-semibold">
              <a href="#" className="hover:text-indigo-800">Dashboard</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600">NFT Marketplace</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Tables</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Kanban</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Profile</a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 text-left w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome, {user.name || 'Guest'}</h2>
            <p className="text-sm text-gray-600">Explore the NFT Marketplace</p>
          </div>
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="p-2 w-full lg:w-64 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            {user.imageUrl && (
              <img
                src={user.imageUrl}
                alt="User"
                className="h-10 w-10 rounded-full border-2 border-indigo-600 shadow-md"
              />
            )}
            {user.name && (
              <div>
                <p className="font-bold text-gray-800">{user.name}</p>
                <p className="text-gray-500 text-sm">Logged in</p>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-indigo-600 text-white p-6 rounded-lg mb-6">
          <h3 className="text-3xl font-bold">Discover, collect, and sell extraordinary NFTs</h3>
          <p className="mt-2">Enter this creative world. Discover the latest NFTs or start creating your own!</p>
          <div className="mt-4 space-x-4">
            <button className="px-6 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-200">
              Discover now
            </button>
            <button className="px-6 py-2 border border-white font-medium rounded-md hover:bg-gray-200 hover:text-indigo-600">
              Watch video
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-gray-900 text-xl font-bold">$37.5K</h3>
            <p className="text-gray-500">Total Spent (this month)</p>
            <p className="text-green-600 font-bold mt-2">+2.4%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-gray-900 text-xl font-bold">Weekly Revenue</h3>
            <div className="mt-4 flex items-end space-x-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-4 bg-indigo-600 rounded-md hover:bg-indigo-700"
                  style={{ height: `${Math.random() * 100}px` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-gray-900 text-xl font-bold">Active Bids</h3>
            <p className="text-gray-500">3 active bids</p>
          </div>
        </section>

        {/* Trending NFTs */}
        <section className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Trending NFTs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Swipe Circles', 'Colorful Heaven', '3D Cubes Art'].map((title, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transform transition duration-300 hover:-translate-y-2"
              >
                <img
                  src={`https://via.placeholder.com/150?text=${title}`}
                  alt={title}
                  className="rounded-md object-cover"
                />
                <h4 className="mt-2 font-bold text-gray-800">{title}</h4>
                <p className="text-gray-500">By {['Peter Will', 'Mark Benjamin', 'Manny Gates'][index]}</p>
                <p className="mt-2 text-indigo-600 font-bold">Current Bid: {['2.30', '1.30', '6.58'][index]} ETH</p>
                <button className="mt-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">
                  Place Bid
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
