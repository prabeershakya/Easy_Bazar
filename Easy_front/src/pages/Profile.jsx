import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { switchToSellerApi } from '../api/api';
import { getUserProfileApi } from '../api/api';

const Profile = () => {
  const [userRole, setUserRole] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  useEffect(() => {
    // const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  
 useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  const fetchUser = async () => {
    try {
      const response = await getUserProfileApi();
      
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      localStorage.removeItem('token');
    }
  };

  fetchUser();
}, []); 


  const handleSwitch = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to switch roles.');
    }

    if (user.role === 'seller') {
      toast.error('You are already a seller.');
      return;
    }

    if (user.role === 'admin') {
      toast.error('Admins cannot switch to seller role.');
      return;
    }

    const confirm = window.confirm(
      'Are you sure? This account will permanently be considered a seller account.'
    );
    if (!confirm) return;

    try {
      const res = await switchToSellerApi();
      // console.log(res);

      if (res?.data?.success === true) {
        toast.success(res.data.message || 'Switched to seller successfully');

        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          const decoded = jwtDecode(res.data.token);
          setUserRole(decoded.role);
        }

        navigate('/Home');
      } else {
        toast.success(res.data.message || 'Role updated to seller.');
        navigate('/Home');
      }
    } catch (err) {
      console.error('Switch error:', err);
      toast.error('Something went wrong.');
    }
  };

  if (!user || userRole === 'seller') return null;

  return (
    <div className="max-w-xl mx-auto mt-40 p-8 bg-white rounded-xl shadow-lg ">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">👤 Profile</h2>

      <div className="space-y-3 text-gray-700 text-lg">
        {/* <p>
          <strong>ID:</strong> {user?.id}
        </p> */}
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>

      <div className="mt-10 bg-orange-50 rounded-xl p-6 shadow-md text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Want to become a Seller?</h3>
        <p className="text-gray-600 mb-5">
          Start selling your products by switching to a Seller account.
        </p>
        <button
          onClick={handleSwitch}
          className="inline-block bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white font-semibold px-8 py-3 rounded-full transition duration-200 shadow-md"
        >
          Switch to Seller
        </button>
      </div>
    </div>
  );
};

export default Profile;
