// styles/TabStyles.js
import { StyleSheet } from 'react-native';

const TabStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9F9F9', // iOS 風格的背景色
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TabStyles;