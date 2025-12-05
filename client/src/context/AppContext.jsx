import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(false);

  // Ensure backendUrl has proper format with fallback
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://imagify-backend-oe0c.onrender.com/'
  
  console.log('Backend URL:', backendUrl); // Debug log

  const navigate = useNavigate()

  const loadCreditData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/user/credits`, {
        headers: {
          token: token, // Make sure token is being sent correctly
        },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      } else {
        toast.error(data.message);
        if (data.message.includes("Not Authorized")) {
          logout(); // Logout if token is invalid
        }
      }
    } catch (err) {
      console.error("Error loading credits:", err);
      toast.error(err.response?.data?.message || err.message);
      if (err.response?.status === 401) {
        logout();
      }
    }
  };

const generateImage = async (prompt) => {
  try {
    if (!token) {
      toast.error("Please login first");
      setShowLogin(true);
      return;
    }

    if (!prompt?.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    const { data } = await axios.post(
      `${backendUrl}api/image/generate-image`,
      { prompt: prompt.trim() },
      {
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      }
    );

    if (data.success) {
      await loadCreditData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      await loadCreditData();
      
      // Check credit balance in response data
      if (data.creditBalance === 0) {
        navigate('/buy');
      }
    }
  } catch (err) {
    console.error("Image generation error:", err);
    
    // Add credit balance check in catch block
    if (err.response?.data?.creditBalance === 0) {
      toast.error("No credits remaining!");
      navigate('/buy');
      return null;
    }
    
    toast.error(err.response?.data?.message || "Failed to generate image");
    if (err.response?.status === 401) {
      logout();
    }
    return null;
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };
  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
    generateImage
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
