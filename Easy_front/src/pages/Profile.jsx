import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token){
      setError('Token not found. Please log in.');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
     
      try {
        const res = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 401 || res.status === 403) {
          setError("Not authorized. Please log in again.");
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err.message);
      } 
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="mt-26 p-50">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
