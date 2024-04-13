import { types } from "./actionTypes"
import { auth, db } from "../services/firebase";
// import { startLoading, finishLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        // firebase authentication
        auth.signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                db.collection('users').doc(user.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        let userRole = doc.data().role
                        dispatch( login( user.uid, user.displayName, userRole ) );
                    }else{
                        console.log("Do not exits")
                    }
                }).catch(e => {
                    console.error("Error getting user document: ", e)
                });
            }).catch(e => {
                console.error("Error getting user:", e)
            });
    }
}

export const startRegisterEmailPassword = (email, password, name, role='Sales') => {
    return (dispatch) => {
        // firebase authentication
        auth.createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {
                // save user name to firestore
                await user.updateProfile({displayName: name});
                // save user data to firestore
                saveUserData(user.uid, name, email, role);
            })
            .catch(e => {
                console.error("Error creating user: ", e)
            });
    }
}

export const saveUserData = (id, username, email, role, src=" ") => {
    const userRef = db.collection('users').doc(id);
    userRef.set({
        id,
        username,
        email,
        role,
        src
    })
    .catch(e => {
        console.error("Error saving user in db: ", e);
    });
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
