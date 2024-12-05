"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAuth } from "@/hooks/useAuth";
import { signIn } from "next-auth/react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login, register, isLoading, error, validationErrors } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "login") {
      await login(email, password);
    } else {
      await register(email, password, confirmPassword);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f0f9f6]">
      {/* Logo and Welcome Section */}
      <div className="flex flex-col items-center pt-8 px-4">
        <div className="w-32 h-32 relative mb-4">
          <Image
            src="/dmmmsu.png"
            alt="DMMMSU Logo"
            width={128}
            height={128}
            className="rounded-full"
          />
        </div>
        <div className="text-center space-y-2">
          <div className="text-emerald-500 text-lg">Welcome to DMMMSU</div>
          <h1 className="text-emerald-600 text-4xl font-bold leading-tight">
            Don Mariano Marcos
            <br />
            Memorial
            <br />
            State University
          </h1>
        </div>

        {/* Main Content */}
        <div className="mt-12 text-center px-4 max-w-2xl mx-auto">
          <p className="text-gray-600 text-xl leading-relaxed">
            Embark on your academic journey with our
            <br />
            Online College Admission Test Application
            <br />
            and Course Recommender
          </p>

          {/* Action Buttons */}
          <div className="mt-12 space-y-4 w-full max-w-sm mx-auto">
            <button
              onClick={() => {
                setAuthMode("register");
                setIsOpen(true);
              }}
              className="w-full py-4 px-6 bg-emerald-600 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <svg
                className="w-6 h-6 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="relative z-10">Apply Now</span>
            </button>
            <button className="w-full py-4 px-6 bg-emerald-600 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <svg
                className="w-6 h-6 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="relative z-10">View Announcements</span>
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-8 w-full shadow-xl">
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {authMode === "login" ? "Welcome Back" : "Create Account"}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full rounded-lg border ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 focus:border-emerald-500 focus:ring-emerald-500 transition-colors`}
                  placeholder="Enter your email"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full rounded-lg border ${
                    validationErrors.password ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 focus:border-emerald-500 focus:ring-emerald-500 transition-colors`}
                  placeholder="Enter your password"
                />
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
                )}
              </div>

              {authMode === "register" && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block w-full rounded-lg border ${
                      validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 focus:border-emerald-500 focus:ring-emerald-500 transition-colors`}
                    placeholder="Confirm your password"
                  />
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors relative"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  authMode === "login" ? "Sign In" : "Create Account"
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() =>
                  setAuthMode(authMode === "login" ? "register" : "login")
                }
                className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
              >
                {authMode === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
