const TOKEN_KEY = 'jwt';

export const signIn = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isSignIn = () => {
    // if (localStorage.getItem(TOKEN_KEY)) {
    //     return true;
    // }
    // return false;
    return true;
}