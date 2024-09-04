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
import { disableScroll, enableScroll } from "../../utils/toogleScroll";

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
    displayLogin: () => void
    displayCreateAcc: () => void
    hideLogin: () => void
    showLogin: boolean,
    showCreateAcc: boolean
}

const userAuthContext = createContext({} as UserAuthContext);

export function UserAuthContextProvider({ children }: UserAuthContextProps) {
    const [user, setUser] = useState<User | null>(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showCreateAcc, setShowCreateAcc] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (curUser) => {
            curUser != null ? setUser({ ...curUser }) : setUser(null);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const displayLogin = () => {
        setShowLogin(true)
        setShowCreateAcc(false)
        disableScroll()
    }

    const displayCreateAcc = () => {
        setShowLogin(true)
        setShowCreateAcc(true)
        disableScroll()
    }

    const hideLogin = () => {
        setShowLogin(false)
        enableScroll()
    }

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


    return <userAuthContext.Provider value={{ showLogin, showCreateAcc, displayLogin, displayCreateAcc, hideLogin, signUp, signInWithEmail, signInWithGoogle, resetPassword, changePassword, signOut, user }}>
        {children}
    </userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext)
}