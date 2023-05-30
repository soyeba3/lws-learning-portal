import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../../../features/auth/authApi";
import logo from "/assets/image/learningportal.svg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminLogin, { isLoading, isError, isSuccess }] =
    useAdminLoginMutation();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.auth) || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin({ email, password });
  };

  

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Admin Account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {isError && (
            <div style={{ color: "red", textAlign: "center" }}>
              There was an Error Occured
            </div>
          )}
          {message && (
            <div style={{ color: "red", textAlign: "center" }}>{message}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
