import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

type LoginInput = {
  email: string;
  password: string;
};

export const LoginOurRegister = () => {
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const { loginAction, registerAction } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!input.email.trim() || !input.password.trim()) {
      setError("Please provide both email and password");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (input.password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);

      if (isRegistering) {
        await registerAction(input);
      } else {
        await loginAction(input);
      }

      const from = location.state?.from;
      const fromBuyButton = from?.state?.fromBuyButton;

      if (fromBuyButton) {
        navigate("/CheckoutPage");
      } else {
        navigate(from?.pathname || "/");
      }

    } catch (err: unknown) {
      console.error(`${isRegistering ? "Registration" : "Login"} failed:`, err);
      if (err instanceof Error) {
        setError(err.message || "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmitEvent}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isRegistering ? "Create your account" : "Sign in to your account"}
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={input.email}
            onChange={handleInputChange}
            aria-describedby="user-email"
            aria-invalid={!!error}
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
            aria-describedby="user-password"
            aria-invalid={!!error}
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading
            ? isRegistering
              ? "Creating account..."
              : "Signing in..."
            : isRegistering
            ? "Register"
            : "Sign In"}
        </button>

        <button
          type="button"
          onClick={toggleMode}
          disabled={isLoading}
          className="mt-4 w-full text-sm text-blue-600 hover:underline disabled:text-gray-400"
        >
          {isRegistering
            ? "Already have an account? Sign In"
            : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
};  