import { LeftBar } from "../Components";
import { Button } from "../Components";
import { Label } from "../Components";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const CartSidebar = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        navigate("/CheckoutPage", {
            state: { fromBuyButton: true }
        });
    };

    return (
        <LeftBar className="fixed top-0 left-0 z-50 h-screen w-1/3 flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold mb-4">🛒 Carrinho</h2>

            {cartItems.length === 0 ? (
                <p className="text-zinc-400">Seu carrinho está vazio.</p>
            ) : (
                <>
                    {/* Lista com scroll */}
                    <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="border-b border-zinc-700 pb-4">
                                <Label className="text-lg">{item.title}</Label>
                                <p className="text-sm text-zinc-400 mb-2">${item.price.toFixed(2)}</p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="neutral"
                                        size="sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        −
                                    </Button>
                                    <span className="text-white font-bold">{item.quantity}</span>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => addToCart(item)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resumo fixo no rodapé */}
                    <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-700 p-4 shadow-md">
                        <Label className="text-lg">summary</Label>
                        <p className="text-sm text-zinc-400">Total de itens: {totalQuantity}</p>
                        <p className="text-base font-bold text-white mb-4">
                            all price: ${totalPrice.toFixed(2)}
                        </p>
                        <Button
                            variant="primary"
                            size="default"
                            className="w-full text-base"
                            onClick={handleCheckout}
                        >
                            buy
                        </Button>
                    </div>
                </>
            )}
        </LeftBar>
    );
};