import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import TabStyles from "../styles/TabStyles";

const ChatScreen = () => {
    return ( 
        <SafeAreaView style={TabStyles.screen}>
            <View style={TabStyles.container}>
            <Text style={TabStyles.title}>聊天對話</Text>
            </View>
        </SafeAreaView>
     );
}
 
export default ChatScreen;