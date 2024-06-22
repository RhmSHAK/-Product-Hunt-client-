


import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import UseAxiosPublic from "../Hook/UseAxiosPublic";
//import app from "../firebase/firebase.config";



 
export const  AuthContext = createContext();
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();

 
const AuthProviders = ({children}) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = UseAxiosPublic();

    const createUser = ( email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = ( email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    //update user profile
    const updateUserProfile=(name,image,email)=>{
        return updateProfile(auth.currentUser, {
           displayName: name,
            photoURL: image,
            email:email
         })
       }

       //forget
       



    const googleLogIn =()=>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    const GithubLogIn =()=>{
        setLoading(true);
        return signInWithPopup(auth,providerGithub);
    }


    const LogOut = ()=>{
        setUser(' ')
      setLoading(true);
      return signOut(auth);
   } 


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser =>{
           
            setUser(currentUser);
            console.log('user', currentUser);
            if(currentUser){
                // get token and store client
                const userInfo = {email: currentUser.email};
                //console.log(userInfo);
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                 //console.log(res.data);
                 if(res.data.token){
                     localStorage.setItem('access-token', res.data.token);
                 }
                })

    }
    else{
     // TODO: remove token (if token stored in the client in the side: local storage caching , in memory)
     localStorage.removeItem('access_token');
    }
            setLoading(false);

            

         
    }
    );
        return () =>{
            return unsubscribe();
        }
    }, [axiosPublic])
    
    const authInfo = {
             user,
             loading,
             createUser,
             logIn,
             LogOut,
             googleLogIn,
             GithubLogIn,
             updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProviders;