import ChatScreen from '../screen/ChatScreen';
import MessagesScreen from '../screen/MessagesScreen';
import NewsScreen from '../screen/NewsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === '聊天對話') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              } else if (route.name === '新聞') {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
              } else if (route.name === '通訊對話') {
                iconName = focused ? 'mail' : 'mail-outline';
              }
    
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              paddingBottom: 5,
              height: 55,
            },
            headerShown: false,
            headerStyle: {
              backgroundColor: '#F8F8F8',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name="聊天對話" component={ChatScreen} />
          <Tab.Screen name="新聞" component={NewsScreen} />
          <Tab.Screen name="通訊對話" component={MessagesScreen} />
        </Tab.Navigator>
      );}
 
export default TabNavigator;