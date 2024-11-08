import { collection, doc, DocumentData, getDoc, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "../firebase";
import { CartItem, useShoppingCart } from "../shared/context/ShoppingCartContext";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

const collUserRef = collection(db, "users");

export async function saveUserToDB(user: User, cartItems: CartItem[], setCartItems: Dispatch<SetStateAction<CartItem[]>>) {
    const docRef = doc(collUserRef, user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const userDB = docSnap.data()
        const updatedCart = mergeCart(userDB, cartItems);
        setCartItems(updatedCart)
        await updateDoc(docRef, {
            lastSignIn: user.metadata.lastSignInTime,
            cart: updatedCart
        })
    } else {
        createNewUser(user.uid, user.email!, user.metadata.creationTime!, user.metadata.lastSignInTime!, cartItems)
    }
}

export async function syncCartToDB(user: User, cartItems: CartItem[]) {
    const docRef = doc(collUserRef, user.uid);
    await updateDoc(docRef, {
        cart: cartItems
    })
}

export function createNewUser(uid: string, email: string, createTime: string, lastSignIn: string, cart: CartItem[]) {
    return setDoc(doc(collUserRef, uid), {
        uid,
        email,
        createTime,
        lastSignIn,
        cart
    });
}

export function mergeCart(user: DocumentData, cart: CartItem[]) {
    let newCart = [...user.cart] as CartItem[]
    console.log('DB cart: ', newCart);
    console.log('LS cart: ', cart);
    cart.forEach(i => {
        if (newCart.find(item => item.id === i.id && item.color === i.color && item.size === i.size)) {
            newCart = newCart.map(y => {
                if (y.id === i.id && y.color === i.color && y.size === i.size) {
                    return { ...y, quantity: y.quantity + i.quantity }
                } else {
                    return y
                }
            })
        } else {
            newCart.push(i)
        }
    })
    console.log('merged carT: ', newCart);

    return newCart
}
