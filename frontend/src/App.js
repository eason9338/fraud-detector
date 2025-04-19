import 'react-native-gesture-handler';  // 必須在最頂部導入
import React from 'react';
import AddWorkoutPage from './screens/AddWorkoutPage';
import AddWorkoutPlanPage from './screens/AddWorkoutPlanPage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileNavigator from './navigation/ProfileNavigator';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        //Navigator的一個屬性，決定整個Tab的風格設定
        screenOptions={({route}) => ({
          //定義screenOptions內全域的顏色屬性
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
        },
        
        //是一個定義在screenOptions內的屬性，決定圖標要顯示什麼
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'AddWorkout') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return iconName ? (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          ) : null;
        },
      })}
      >
        <Tab.Screen
          //紀錄頁面
          name="Profile"
          component={ProfileNavigator}
          options={{headerShown: false, title: '我的頁面'}}
        ></Tab.Screen>
        <Tab.Screen
          //登入註冊頁面、運動紀錄頁面
          name="AddWorkout"
          component={AddWorkoutPage}
          options={{title: '新增紀錄'}}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;