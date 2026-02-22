'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Tag, Trash2 } from 'lucide-react';
import { ClearUserCart, getLoggedUserCart } from '@/_actions/cart.action';
import { CartDataI } from '@/interfaces/cart';
import CartItem from '@/components/cart/cart-item';
import { CartI } from './../../../interfaces/cart';
import { CartProductI } from './../../../interfaces/cart';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { CheckOut } from '@/components/cart/checkout';



export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);

  const [cartItems, setCartItems] = useState<CartProductI[] | []>([]);
  const [cart, setCart] = useState<CartI | null>(null);
  const [cartData, setCartData]=useState<CartDataI | null>(null);


  async function getUserCart() {
    try {
      const data: CartI = await getLoggedUserCart();
      console.log(data);
      setCartItems(data.data.products);
      setCart(data);
      setCartData(data.data)
    } catch (error) {
console.log(error); 

    }finally{
      setIsLoading(false);
    }


  }

  async function clearCart() {
    try {

      const response = await ClearUserCart();
      console.log(response);
      if (response.message == "success") {
        toast.success("Cart Cleared Successfully", { position: 'top-center' })
      }
      setCartItems([]);

    } catch (error) {
      console.log(error);
      toast.error("Failed To Clear Cart", { position: 'top-center' })

    }


  }

  useEffect(() => {
    getUserCart();
  }, [])

  const discount :number= Number(((cartData?.totalCartPrice ?? 0) *0.2).toFixed(2)) ;
  const total: number = (cartData?.totalCartPrice ?? 0) - (discount ?? 0);
  const subtotal:number = Number(cart?.data.products.reduce((accu, prod) => prod.count + accu, 0));

  if (isLoading) {
    return <>
      <div className='h-screen flex justify-center items-center '>
        <Spinner />
        ShopMart
      </div>
    </>
  }

    if(cartItems.length == 0){
      return <>
      <div className='h-screen justify-center items-center '>
  Cart is Empty , Go Shop Now <Link href={'/products'}>🛒</Link>
      </div>
      </>
    }





  // const [promoCode, setPromoCode] = useState('');

  // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const discount = Math.round((subtotal * 20) / 100);
  // const deliveryFee = 15;
  // const total = subtotal - discount + deliveryFee;

  // const updateQuantity = (id: string, change: number) => {
  //   setCartItems(items =>
  //     items.map(item =>
  //       item.id === id && item.quantity + change > 0
  //         ? { ...item, quantity: item.quantity + change }
  //         : item
  //     )
  //   );
  // };

  // const removeItem = (id: string) => {
  //   setCartItems(items => items.filter(item => item.id !== id));
  // };

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-bold">Cart</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black mb-8">YOUR CART</h1>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {
              cartItems.map((prod) => <React.Fragment key={prod.product._id}>
                <CartItem product={prod} setCartItems={setCartItems} />
              </React.Fragment>
              )
            }

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-4xl p-6 sticky top-4">

              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal :{subtotal} items</span>
                  <span className="font-bold">EGP{cartData?.totalCartPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Discount (-20%)</span>
                  <span className="font-bold text-red-500">-{discount}</span>
                </div>
                

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-bold text-green-500">Free Delivery</span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold">EGP{total}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Add promo code"
                    className="pl-10 h-12 bg-gray-100 border-0 rounded-full"
                  />
                </div>
                <Button className="h-12 px-6 bg-black hover:bg-gray-800 rounded-full">
                  Apply
                </Button>
              </div>

              {/* Checkout Button */}

              {cart && <CheckOut cartId={cart?.cartId}/>}

            </div>


          </div>


        </div>
        <Button onClick={clearCart} className='mt-4'>
          <Trash2 className="w-5 h-5" /> Clear Cart
        </Button>
      </div>
    </div>
  );
}