"use server"
import { getUserToken } from "@/lib/auth"


export async function addToCart(productId: string) {
    const token = await getUserToken();
    if (!token) {
        throw new Error('You must log in to add to your cart')
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,
        {
            method: 'POST',
            body: JSON.stringify({ productId: productId }),
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        }

    )
    const data = await response.json();
    return data
}

export async function getLoggedUserCart() {
    const token = await getUserToken();
    if (!token) {
        throw new Error('You must log in to add to your cart')
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,
        {
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        }

    )
    const data = await response.json();
    return data
}
// Delete Item
export async function RemoveFromCart(productId: string) {
    const token = await getUserToken();
    if (!token) {
        throw new Error('You must log in to add to your cart')
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
            method: 'DELETE',
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        }

    )
    const data = await response.json();
    return data
}
// Update Product
export async function UpdateCartProduct(productId: string , newCount:number ) {
    const token = await getUserToken();
    if (!token) {
        throw new Error('You must log in to add to your cart')
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
            method: 'PUT',
            body: JSON.stringify({ count: newCount }),
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        }

    )
    const data = await response.json();
    return data
}

export async function ClearUserCart() {
    const token = await getUserToken();
    if (!token) {
        throw new Error('You must log in to add to your cart')
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,
        {
            method: 'DELETE',
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        }

    )
    const data = await response.json();
    return data
}

export async function CheckOutUser(formData : unknown , cartId:string ) {
    const token = await getUserToken();
    if (!token) {
        throw new Error('You must log in to add to your cart')
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            method: 'POST',
            body:JSON.stringify(formData),
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        }

    )
    const data = await response.json();
    return data
}
