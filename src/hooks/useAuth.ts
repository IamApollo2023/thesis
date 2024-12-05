import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = (data: AuthData, isRegister: boolean): boolean => {
    const errors: ValidationErrors = {};

    // Email validation
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    // Confirm password validation for registration
    if (isRegister) {
      if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const login = async (email: string, password: string) => {
    if (!validateForm({ email, password }, false)) {
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return false;
      }

      router.push("/dashboard");
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError("An error occurred. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    if (!validateForm({ email, password, confirmPassword }, true)) {
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }

      // Automatically log in after successful registration
      return await login(email, password);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : "Registration failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    login,
    register,
    signOutUser,
    isLoading,
    error,
    validationErrors,
  };
}
