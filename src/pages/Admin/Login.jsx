import axios from 'axios';
import datinglogo from '../../assets/datinglogo.png';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import { isLoggedin } from '../../atoms/loginatom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    password: '',
    mobile: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://13.235.72.216/auth/login-admin',
        {
          password: formData.password,
          mobile_number: formData.mobile,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('API Response:', response.data);
  
      if (response.data.token) {
        // const expiryTime = Date.now() + 1 * 24 * 60 * 60 * 1000;
        // const tokenData = {
        //   token: response.data.token,
        //   expiry: expiryTime,
        // };
  
        window.sessionStorage.setItem('token', response.data.token);
        toast.success('Succesfully Logged in ✅');
        setTimeout(() => {
          navigate('/admin/users');
        }, 1000);
      } else {
        toast.error(`${response.data.message} ❌`)
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      toast.error(`Could not Login`)
      console.error('Error during login:', error.response?.data || error.message);
    }
  };
  
  
    return (
      <section className="absolute flex flex-col w-[100vw] h-screen justify-center">
        <Toaster position='top-center' toastOptions={{success:{ duration:1000}}}/>
        <div className="flex flex-col items-center w-[90%] lg:w-[50%] justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-800">
            <img className="w-10 h-10" src={datinglogo} alt="logo" />
            Famly.in
          </a>
          <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                Admin Login
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-800">Mobile</label>
                  <input
                    type="mobile"
                    id = "mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg block w-full p-2.5"
                    placeholder="1230XXXXXX"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-100"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-600">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-orange-400 py-2 rounded-lg hover:bg-orange-300">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default LoginForm;
