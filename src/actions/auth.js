import { types } from "./actionTypes"
import { auth, db } from "../services/firebase";
import { startLoading, finishLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        // loader on
        dispatch( startLoading() )
        // firebase authentication
        auth.signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName, "admin" ) );
                console.log("user: "+user);
                // loader off
                dispatch( finishLoading() );
            }).catch(e => {
                console.error("Error getting user:", e)
                dispatch( finishLoading() );
            });
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await auth.signOut();

        dispatch( logout() );
    }
}

export const login = (id, username, role) => {
    return({
        type: types.login,
        payload: {
            id,
            username,
            role,
        }
    })
}

export const logout = () => ({
    type: types.logout
})

