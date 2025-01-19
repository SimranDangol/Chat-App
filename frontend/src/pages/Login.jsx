/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { CiChat2 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { signInStart, signInSuccess, signInFailure } from "@/redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    dispatch(signInStart());
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      dispatch(signInSuccess(response.data));
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || "Login failed"));
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <Card className="w-full max-w-md bg-slate-950 border-slate-800">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <CiChat2 className="w-8 h-8 text-amber-600 " />
          </div>
          <CardTitle className="text-2xl font-semibold text-center text-slate-200">
            Sign In
          </CardTitle>
          <p className="text-sm text-center text-slate-400">
            Welcome back! Log in to your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute w-4 h-4 left-3 top-3 text-slate-500" />
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-9 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500"
                disabled={loading}
              />
            </div>
            <div className="relative">
              <Lock className="absolute w-4 h-4 left-3 top-3 text-slate-500" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pl-9 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500"
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute w-6 h-6 right-2 top-2 text-slate-500 hover:text-slate-400"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-amber-600 hover:bg-amber-700"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-sm text-center">
            <span className="text-slate-300">Don&apos;t have an account? </span>
            <Link
              to="/register"
              className="text-amber-500 hover:text-amber-400"
            >
              Create one
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
