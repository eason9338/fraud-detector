import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authStorage } from '../utils/auth';
import { theme } from '../styles/theme';
import WorkoutCalendarTab from './WorkoutCalendarTab';
import WorkoutPlansTab from './WorkoutPlansTab';

const ProfilePage = ({navigation}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState('calendar');

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const token = await authStorage.getToken();
            const userDataString = await authStorage.getUser();

            if(token && userDataString) {
                setIsLoggedIn(true);
                console.log(userDataString);
                setUserData(userDataString);
            } else {
                setIsLoggedIn(false);
                setUserData(null);
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('@auth_token');
            await AsyncStorage.removeItem('@user_data');
            setIsLoggedIn(false);
            setUserData(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const renderLoginContent = () => {
        return (
            <View style={styles.capsule}>
                <Image
                    source={require('../assets/default-avatar.jpg')}
                    style={styles.avatar}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.textLink}>Log In</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderProfileContent = () => {
        return(
            <>
                <View style={styles.headerContainer}>
                    <View style={styles.capsule}>
                        <View style={styles.capsuleContentLeft}>
                            <Image
                                source={require('../assets/default-avatar.jpg')}
                                style={styles.avatar}
                            />
                            <Text style={styles.text}>
                                歡迎回來, {userData?.name}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.textLink}>登出</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={styles.mainContent}>
                    <View style={styles.tabBar}>
                        <TouchableOpacity 
                            style={[styles.tab, activeTab === 'calendar' && styles.activeTab]}
                            onPress={() => setActiveTab('calendar')}
                        >
                            <Text style={styles.tabText}>運動日記</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.tab, activeTab === 'plans' && styles.activeTab]}
                            onPress={() => setActiveTab('plans')}
                        >
                            <Text style={styles.tabText}>健身計畫</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {activeTab === 'calendar' ? <WorkoutCalendarTab /> : <WorkoutPlansTab />}
                </View>
            </>
        );
    };
    
    // 在 ProfilePage 的 return 部分：
    return (
        <SafeAreaView style={styles.pageContainer}>
            {isLoggedIn ? renderProfileContent() : renderLoginContent()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,  // 佔滿整個螢幕
    },
    mainContent: {
    flex: 1,  // 自動填充剩餘空間
    },
    // Base containers
    baseContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    pageContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerContainer: {
        padding: 16,
        backgroundColor: '#fff',
        height: 90,
    },

    // Capsule styles
    capsule: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        marginBottom: 10,
        gap: 10,
    },
    capsuleContentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },

    // Tab styles
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.borderBottom,
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // Typography
    text: {
        fontSize: theme.fontSize.small,
    },
    textLink: {
        fontSize: theme.fontSize.small,
        color: theme.colors.primary,
        fontWeight: '600',
    },
});

export default ProfilePage;