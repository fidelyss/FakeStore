import { Navbar } from "../Components/navbar";
import { Button } from "../Components/button";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";


export function ThankYouPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      const confetti = document.createElement("div");
      confetti.innerText = "🎉";
      confetti.style.position = "fixed";
      confetti.style.top = "-20px";
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.fontSize = "24px";
      confetti.style.animation = "fall 3s linear forwards";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      <Navbar>
        <h1 className="text-xl font-bold">PHANOX</h1>
      </Navbar>

      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-gray-100 border rounded-lg p-10 max-w-lg w-full relative z-10 flex flex-col justify-center">
          <p className="text-green-600 text-4xl mb-4">✅</p>
          <h2 className="text-2xl font-bold mb-2">Thank You For Your Purchase</h2>
          <p className="text-gray-600 mb-6">
            Check your email inbox for the receipt.
            <br />
            If you have any questions, please email{" "}
            <a href="mailto:drders@example.com" className="text-red-500">
              drders@example.com
            </a>
          </p>
          <Button className="cursor-pointer" variant="danger" size="sm" onClick={() => navigate("/home")}>CONTINUE SHOPPING</Button>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
