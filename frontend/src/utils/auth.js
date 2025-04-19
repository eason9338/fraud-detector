import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

export const authStorage = {
    storeToken: async (token) => {
        try {
            await AsyncStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error('Error storing token: ', error);
        }
    },

    storeUser: async (userData) => {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error('Error storing user data: ', error);
        }
    },

    storeAuth: async (token, userData) => {
        try {
            await Promise.all([
                AsyncStorage.setItem(USER_KEY, JSON.stringify(userData)),
                AsyncStorage.setItem(TOKEN_KEY, token),
            ])
        }catch(error){
            console.error('Error storing user data: ', error);
        }
    },

    getToken: async () => {
        try {
            return await AsyncStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error getting token: ', error);
            return null;
        }
    },

    getUser: async () => {
        try {
            const userStr = await AsyncStorage.getItem(USER_KEY);
            // user: {
            //     id,
            //     email,
            //     name
            // }
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error getting user data: ', error);
            return null;
        }
    },

    removeUser: async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error('Error removing user data: ', error);
        }
    },

    clearAuth: async () => {
        try {
            await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
        } catch (error) {
            console.error('Error clearing auth data: ', error);
        }
    }
};