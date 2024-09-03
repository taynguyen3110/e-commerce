import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updatePassword
} from 'firebase/auth'
import { auth } from "../../firebase";
import { notify } from "../../utils/notify";

type UserAuthContextProps = {
    children: React.ReactNode
}

type UserAuthContext = {
    signUp: (email: string, password: string) => Promise<UserCredential>,
    signInWithEmail: (email: string, password: string) => Promise<UserCredential>,
    signInWithGoogle: () => Promise<UserCredential>,
    resetPassword: (email: string) => Promise<void>,
    changePassword: (password: string) => Promise<void>,
    signOut: () => void,
    user: User | null
}

const userAuthContext = createContext({} as UserAuthContext);

export function UserAuthContextProvider({ children }: UserAuthContextProps) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (curUser) => {
            curUser != null ? setUser({...curUser}) : setUser(null);
        })
        return () => {
            unsubscribe();
        }
    }, [])


    function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signInWithEmail(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        //save result.user to firestore
        return result
    }

    function signOut() {
        notify("success", "Logged Out!")
        return auth.signOut()
    }

    function resetPassword(email: string) {
        return sendPasswordResetEmail(auth, email)
    }

    function changePassword(password: string) {
        return updatePassword(auth.currentUser!, password)
    }


    return <userAuthContext.Provider value={{ signUp, signInWithEmail, signInWithGoogle, resetPassword, changePassword, signOut, user }}>
        {children}
    </userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext)
}