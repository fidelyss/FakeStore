import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../Components/button";
import { Navbar } from "../Components/navbar";
import { Card } from "../Components/card";
import type { Product } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, CircleUserRound } from "lucide-react";
import { CartSidebar } from "../Components/CartSidebar";

export function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { products } = useProducts();
  const { cartItems, addToCart, removeFromCart } = useCart(); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const product: Product | undefined = location.state?.product;

  if (!product) {
    navigate("/home");
    return null;
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleRemoveFromCart = () => {
    for (let i = 0; i < quantity; i++) {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar>
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/home')}>FAKESTORE</h1>
        <div className="relative">
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[10px] text-white">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/LoginOurRegister")}>
              <CircleUserRound />
            </Button>
            <Button onClick={toggleCart}>
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </Navbar>

      {isCartOpen && <CartSidebar />}

      {/* Product Section */}
      <section className="flex flex-col md:flex-row p-8 gap-8">
        <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 object-contain"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-red-600 mt-1">★★★★☆ ({product.rating.count})</p>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-red-600 mt-4">
            ${product.price}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-1 hover:bg-gray-100"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-1 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              size="sm"
              className="bg-gray-200 text-black hover:bg-gray-300"
              onClick={handleRemoveFromCart}
            >
              Remove
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-12 px-8">
        <h3 className="text-center font-bold text-xl mb-6">You May Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-items-center">
          {relatedProducts.map((related) => (
            <Card
              key={related.id}
              variant="neutral"
              size="sm"
              className="flex flex-col items-center text-center"
            >
              <img
                src={related.image}
                alt={related.title}
                className="h-24 object-contain mb-3"
              />
              <p className="font-medium">{related.title}</p>
              <span className="text-black font-bold">${related.price}</span>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="neutral"
                  size="sm"
                  onClick={() => navigate("/ProductPage", { state: { product: related } })}
                >
                  Show
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => addToCart(related)}
                >
                  Add
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}