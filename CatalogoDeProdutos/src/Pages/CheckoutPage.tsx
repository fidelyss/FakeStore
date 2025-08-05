import { Navbar } from "../Components/navbar";
import { Input } from "../Components/input";
import { Button } from "../Components/button";
import { useState } from "react";
import { useCart } from "../contexts/CartContext"; 
import {useNavigate } from "react-router-dom";

export function CheckoutPage() {
  const [shipping, setShipping] = useState(10);
  const { cartItems } = useCart(); 
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shipping;

  return (
    <div className="bg-white min-h-screen">
      <Navbar>
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/home')}>FAKESTORE</h1>
      </Navbar>

      <div className="flex flex-col md:flex-row p-8 gap-8">
        {/* Left: Order Summary */}
        <div className="md:w-1/2 border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Pay FakeStore</h2>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.title} (Qty {item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))
            )}
            <div className="flex justify-between border-t pt-2">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total due</span>
              <span>${total}</span>
            </div>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="md:w-1/2 border rounded-lg p-6 bg-gray-50 space-y-4">
          <Input placeholder="Email" type="email" />

          <div>
            <p className="font-medium mb-1">Shipping method</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value={10}
                  checked={shipping === 10}
                  onChange={() => setShipping(10)}
                />
                USPS First Class Package International ($10.00)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value={20}
                  checked={shipping === 20}
                  onChange={() => setShipping(20)}
                />
                DHL express worldwide ($20.00)
              </label>
            </div>
          </div>

          <div>
            <p className="font-medium mb-1">Card information</p>
            <Input placeholder="1234 1234 1234 1234" />
            <div className="flex gap-2 mt-2">
              <Input placeholder="MM / YY" />
              <Input placeholder="CVC" />
            </div>
          </div>

          <Input placeholder="Name on card" />

          <div>
            <p className="font-medium mb-1">Billing address</p>
            <select className="w-full border rounded-lg p-2 mb-2">
              <option>Croatia</option>
              <option>Brazil</option>
              <option>USA</option>
            </select>
            <Input placeholder="Address line 1" />
            <Input placeholder="Address line 2" />
            <div className="flex gap-2 mt-2">
              <Input placeholder="Postal code" />
              <Input placeholder="City" />
            </div>
          </div>

          <Button variant="primary" size="default" className="w-full mt-4" onClick={() => navigate('/ThankYouPage')}>
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
}