import {
  useContext,
  createContext,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

// Tipos para o usuário e resposta da API
type User = {
  id: string;
  name: string;
  email: string;
};

type LoginResponse = {
  accessToken: string;
  data?: {
    user?: User;
  };
};

type LoginData = {
  email: string;
  password: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loginAction: (data: LoginData) => Promise<void>;
  registerAction: (data: LoginData) => Promise<void>; 
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("site") || null
  );
  const navigate = useNavigate();

  const handleAuthSuccess = (res: LoginResponse) => {
    if (!res.accessToken) {
      throw new Error("Authentication token not received");
    }

    setUser(res.data?.user || null);
    setToken(res.accessToken);
    localStorage.setItem("site", res.accessToken);

    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/home";
    localStorage.removeItem("redirectAfterLogin");
    navigate(redirectPath);
  };

  const loginAction = async (data: LoginData): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const res: LoginResponse = await response.json();
      handleAuthSuccess(res);

    } catch (err) {
      console.error("Login error:", err);
      localStorage.removeItem("site");
      setToken(null);
      throw err;
    }
  };

  const registerAction = async (data: LoginData): Promise<void> => {
  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    await loginAction(data);

  } catch (err) {
    console.error("Registration error:", err);
    localStorage.removeItem("site");
    setToken(null);
    throw err;
  }
};

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loginAction,
        registerAction, 
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};