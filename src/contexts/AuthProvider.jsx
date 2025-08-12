import { useState } from "react";
import users from "../data/user.json"
import { AuthContext } from "./AuthContext";
import LocalStorageHook from "../components/Hooks/LocalStorageHook";


const AuthProvider = ({children}) => {
    // Using the hook to get the info from storage
    const [user, setUser] = LocalStorageHook("user", null);;
    const [error, setError] = useState(null);

    const login = (identityNumber, password) => {

        setError(null);
        // Check if data from form is in the user database
        const foundUser = users.find(u => u.identityNumber === identityNumber && u.password === password);

        // If the user is in the database then we are setting the user information to our user variable, otherwise we are setting the error
        if (foundUser){
            setUser({ identityNumber: foundUser.identityNumber, name: foundUser.name, email: foundUser.email, role: foundUser.role});
            setError(null)
            console.log("Login in successfully")
        } else {
            setUser(null);
            setError("Invalid Credentials")
        }
    }

    // Set everything back to null - therefore the user details is not assigned to the user variable anymore
    const logout = () => {
        setUser(null);
        setError(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{user, logout, login, error}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
