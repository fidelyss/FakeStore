import { Card, Button } from '../Components';
import { Navbar, CartSidebar } from '../Components';
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, CircleUserRound } from 'lucide-react';
import { useState } from 'react';

export const Home = () => {
    const { products, loading, error } = useProducts();
    const featuredProduct = products[4];
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    return (
        <div className="min-h-screen bg-white">
            <Navbar>
                <h1 className="text-xl font-bold">FAKESTORE</h1>
                <div className="relative">
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[10px] text-white">
                        {cartItems.length}
                    </span>
                    <div className='flex gap-3'>
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

            {/* Hero Section */}
            <section className="flex flex-col lg:flex-row items-center justify-between bg-gray-100 mx-4 mt-6 p-6 rounded-lg gap-6">
                <div className="flex-1 text-center lg:text-left">
                    <p className="text-gray-500">Premium Accessories</p>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        {featuredProduct?.title || "Carregando..."}
                        <span className="block text-gray-300 text-5xl md:text-6xl">
                            {featuredProduct?.category || ""}
                        </span>
                    </h2>
                    <Button variant="danger" size="sm" className="mt-6 cursor-pointer" onClick={() => {
                        addToCart(featuredProduct); 
                        navigate('/CheckoutPage'); 
                    }}
                    >
                        Shop Now
                    </Button>
                </div>
                <div className="flex-1 flex justify-center">
                    {featuredProduct ? (
                        <img
                            src={featuredProduct.image}
                            alt={featuredProduct.title}
                            className="w-60 md:w-80 object-contain"
                        />
                    ) : (
                        <p>Carregando imagem...</p>
                    )}
                </div>
                <div className="w-full lg:w-1/3 text-gray-500">
                    <h3 className="font-bold text-gray-700 mb-1 text-xl">Description</h3>
                    <p className="text-base md:text-lg">
                        {featuredProduct?.description || "Carregando descrição..."}
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="mt-12 px-4">
                <h2 className="text-center text-2xl font-bold">Best Sellers</h2>
                <p className="text-center text-gray-400 text-sm mb-6">
                    Elegance chosen by our customers
                </p>

                {loading && <p className="text-center">Carregando produtos...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            variant="neutral"
                            size="lg"
                            className="flex flex-col items-center text-center"
                        >
                            <img src={product.image} alt={product.title} className="h-24 object-contain mb-3" />
                            <p className="font-medium">{product.title}</p>
                            <span className="text-black font-bold">${product.price}</span>
                            <div className='flex justify-between w-full py-3'>
                                <Button
                                    variant='neutral'
                                    size='sm'
                                    className='text-xl cursor-pointer'
                                    onClick={() => navigate('/ProductPage', { state: { product } })}
                                >
                                    show
                                </Button>
                                <Button
                                    variant='danger'
                                    size='sm'
                                    className='text-xl cursor-pointer'
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};