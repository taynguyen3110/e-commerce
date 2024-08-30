import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential
} from 'firebase/auth'
import { auth } from "../../firebase";

type UserAuthContextProps = {
    children: React.ReactNode
}

type UserAuthContext = {
    signUp: (email: string, password: string) => Promise<UserCredential>,
    login: (email: string, password: string) => Promise<UserCredential>,
    user: User | null
}

const userAuthContext = createContext({} as UserAuthContext);

export function UserAuthContextProvider({ children }: UserAuthContextProps) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (curUser) => {
            setUser(curUser);
        })
        return () => {
            unsubscribe();
        }
    }, [])


    function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // function signOut(email: string, password: string) {
    //     return signInWithEmailAndPassword(auth, email, password)
    // }


    return <userAuthContext.Provider value={{ signUp, login, user }}>
        {children}
    </userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext)
}