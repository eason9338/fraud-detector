import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import TabStyles from "../styles/TabStyles";

const MessagesScreen = () => {
    return ( 
        <SafeAreaView style={TabStyles.screen}>
            <View style={TabStyles.container}>
                <Text style={TabStyles.title}>通訊對話</Text>
            </View>
        </SafeAreaView>
     );
}
 
export default MessagesScreen;