import { Link } from 'react-router-dom';
import React, { useState, useEffect ,useContext } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [id, setId] = useState();
  const [orders, setOrders] = useState([]);
  const [prevOrders, setPrevOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    let x
    axios
      .get('http://localhost:5000/getId')
      .then(function (response) {
        setId(response.data[0].userid);
       x = response.data[0].userid;
        axios
          .get(`http://localhost:5000/user/${x}`)
          .then(function (response) {
            setUser(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        axios
          .get(`http://localhost:5000/oldOrders/${x}`)
          .then(function (response) {
            setPrevOrders(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

          axios
          .get(`http://localhost:5000/getusercart/${x}`)
          .then(function (response) {
            setOrders(response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
     
  }, [id]);

  return (
    <>
      <div className="h-screen bg-gray-200 ">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 ms:1/3">
            {/* <!-- Left side content --> */}
            <div className="h-screen bg-gray-200   pt-8">
              <div>
                <div className="w-full ms-8 mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="border-b px-4 pb-6">
                    <div className="text-center my-4">
                      <img
                        className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
                        src="https://cdn-icons-png.flaticon.com/512/1165/1165821.png"
                        alt=""
                      />
                      {user.length !== 0 && (
                        <div className="py-2">
                          <h3 className="font-bold text-2xl mb-1">{user[0]?.username}</h3>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 px-2  justify-center ">
                      <div className="space-x-8 flex justify-center mt-32 md:mt-0 md:justify-center">
                        <Link
                          to="/EditProfile"
                          onClick={() => window.scrollTo(0, 0)}
                          className="text-white py-2 px-4 uppercase rounded bg-red-500 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Edit Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-4 w-full ">
                    <div className="flex gap-2 items-center text-gray-800r mb-4">
                      <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg">
                        {user.length !== 0 && (
                          <div className="border-t border-gray-200">
                            <dl>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {user[0]?.username}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {user[0]?.email}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500"> Password </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {"*".repeat(user[0]?.password.length)}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">phone number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {user[0]?.phone_number}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            {/* <!-- Right side content --> */}
            <div className="w-full max-w-md mx-auto mt-8">
              <div className="flex border-b border-gray-300">
                <button
                  className={`w-1/2 py-4 text-center font-medium text-gray-700 bg-gray-100 rounded-tl-lg focus:outline-none ${
                    activeTab === 'tab1' ? 'active:bg-gray-200' : ''
                  }`}
                  onClick={() => openTab('tab1')}
                >
                  User Cart
                </button>
                <button
                  className={`w-1/2 py-4 text-center font-medium text-gray-700 bg-gray-100 rounded-tr-lg focus:outline-none ${
                    activeTab === 'tab2' ? 'active:bg-gray-200' : ''
                  }`}
                  onClick={() => openTab('tab2')}
                >
                  Previous Orders
                </button>
              </div>
              <div id="tab1" className={`tabcontent p-4 ${activeTab === 'tab1' ? '' : 'hidden'}`}>
                <h2 className="text-lg font-bold text-gray-800">User Cart</h2>
                <div className="mt-2 text-gray-700  overflow-y-auto" style={{ height: "31rem" }}>
                  {orders && orders.length > 0 ? (
                    orders.map((order, index) => (
                      <p className="mt-2 text-gray-700" key={index}>
                        <div className="justify-between  rounded-lg bg-white p-6 shadow-md sm:flex">
                          <div>
                            <p className="font-bold">{order.name}</p>
                            <p className="mt-2 text-gray-600 text-sm">{order.description}</p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:ml-4">
                            <p className="font-bold text-gray-600">Quantity: {order.quantity}</p>
                          </div>
                        </div>
                      </p>
                    ))
                  ) : (
                    <p>No items in cart.</p>
                  )}
                </div>
              </div>
              <div id="tab2" className={`tabcontent p-4 ${activeTab === 'tab2' ? '' : 'hidden'}`}>
                <h2 className="text-lg font-bold text-gray-800">Previous Orders</h2>
                <div className="mt-2 text-gray-700  overflow-y-auto" style={{ height: "31rem" }}>
                  {prevOrders && prevOrders.length > 0 ? (
                    prevOrders.map((order, index) => (
                      <p className="mt-2 text-gray-700" key={index}>
                        <div className="justify-between  rounded-lg bg-white p-6 shadow-md sm:flex">
                          <div>
                            <p className="font-bold">{order.name}</p>
                            <p className="mt-2 text-gray-600 text-sm">{order.description}</p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:ml-4">
                            <p className="font-bold text-gray-600">Quantity: {order.count}</p>
                          </div>
                        </div>
                      </p>
                    ))
                  ) : (
                    <p>No previous orders.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
