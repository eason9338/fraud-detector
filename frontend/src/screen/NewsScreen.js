import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import TabStyles from '../styles/TabStyles';

const NewsScreen = () => {
    return ( 
        <SafeAreaView style={TabStyles.screen}>
            <View style={TabStyles.container}>
                <Text style={TabStyles.title}>新聞</Text>
            </View>
        </SafeAreaView>
    );
}
 
export default NewsScreen;