import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children, allowedRoles }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // ✅ Function to get user data
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ fixed string interpolation
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        console.log("User data fetched successfully:", res.data.data);
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log("Error while fetching user:", error);
    }
  };

  // ✅ On first load, fetch user if not already set
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      getUser();
    }
  }, [user]);

  // ✅ If token is not present
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  // ✅ If roles are specified but user doesn't match
  if (allowedRoles && user) {
    const roleMap = {
      admin: user.isAdmin,
      doctor: user.isDoctor,
      user: !user.isAdmin && !user.isDoctor,
    };
    const hasRole = allowedRoles.some((role) => roleMap[role]);
    if (!hasRole) {
      return <Navigate to="/" />;
    }
  }

  // ✅ Until user data is loaded, show nothing or loader
  if (!user) {
    return null; // or <Loader />
  }

  return children;
}
