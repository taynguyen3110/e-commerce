export interface CartItem {
    id: string,
    color: string,
    size: string
    quantity: number,
}

export function getCart(): CartItem[] {
    let cartValue = localStorage.getItem('shopping-cart');
    if (cartValue !== null) {
        return JSON.parse(cartValue)
    } else {
        localStorage.setItem('shopping-cart', '[]')
        return []
    }
}

export function saveCart(cart: CartItem[]) {
    localStorage.setItem('shopping-cart', JSON.stringify(cart))
}

export function addToCart(id: string, color: string, size: string, quantity: number) {
    let cart = getCart();
    let existItem = cart.findIndex((i) => i.id === id && i.color === color && i.size === size);
    if (existItem >= 0) {
        cart[existItem].quantity += quantity
    } else {
        let item: CartItem = { id, color, size, quantity }
        cart.push(item)
    }
    saveCart(cart)
}

export function removeByOne(id: string, color: string, size: string) {
    let cart = getCart();
    let existItem = cart.findIndex((i) => i.id === id && i.color === color && i.size === size);
    if (existItem >= 0) {
        if (cart[existItem].quantity === 1) {
            cart.splice(existItem, 1)
        } else {
            cart[existItem].quantity -= 1
        }
    } else {

    }
    saveCart(cart)
}

export function removeFromCart(id: string, color: string, size: string) {
    let cart = getCart();
    let existItem = cart.findIndex((i) => i.id === id && i.color === color && i.size === size);
    if (existItem >= 0) {
        cart.splice(existItem, 1)
    } else {

    }
    saveCart(cart)
}

export function clearCart() {
    localStorage.removeItem('shopping-cart')
}