import { useState, useEffect, createContext } from "react";
import api from "../api/axios";
export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  async function getAllFeedbacks() {
    setRefresh(true);
    try {
      const response = await api.get("/user/all/feedbacks");
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.log("error while fetching all feedbacks");
    } finally {
      setRefresh(false);
    }
  }
  const value = {
    user,
    setUser,
    email,
    setEmail,
    loading,
    setLoading,
    feedbacks,
    setFeedbacks,
    getAllFeedbacks,
    refresh,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/get-me");
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    getAllFeedbacks();
  }, []);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
