/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { CiChat2 } from "react-icons/ci";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { axiosInstance } from "../lib/axios.js";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.data) {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong during registration"
      );
    } finally {
      setLoading(false);
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
            Create Account
          </CardTitle>
          <p className="text-sm text-center text-slate-400">
            Get started with your free account
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert
              variant="destructive"
              className="mb-4 text-red-400 border-red-900 bg-red-900/20"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute w-4 h-4 left-3 top-3 text-slate-500" />
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-9 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500"
                disabled={loading}
              />
            </div>
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-sm text-center">
            <span className="text-slate-300">Already have an account? </span>
            <Link to="/login" className="text-amber-500 hover:text-amber-400">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
