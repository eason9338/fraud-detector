import React, {useState} from 'react';
import { 
  View,
  Text, 
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { theme } from '../styles/theme';
import { config } from '../config';

const RegisterPage = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          'name': userName,
        }),
      });

      const data = await response.json();

      if(data.success){
        Alert.alert('註冊成功', '請重新登入');
        navigation.navigate('Login');
      } else {
        Alert.alert('錯誤', '註冊失敗');
      }
    } catch (error) {
      console.error('註冊失敗：', error);
      Alert.alert('錯誤', '註冊失敗');
    }
  }

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Join Us Now</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === 'userName' && styles.inputFocused
            ]}
            placeholder='Name'
            value={userName}
            onChangeText={setUserName}
            keyboardType='default'
            autoCapitalize='words'
            onFocus={() => setFocusedInput('userName')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === 'email' && styles.inputFocused
            ]}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === 'password' && styles.inputFocused
            ]}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize='none'
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleRegister()}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Container styles
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
  },
  card: {
    width: Math.min(400, Dimensions.get('window').width - 40),
    backgroundColor: theme.colors.cardBg,
    borderRadius: 16,
    padding: theme.spacing.xl,
    ...theme.shadows.small,
  },

  // Typography styles
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },

  // Form styles
  formGroup: {
    marginBottom: theme.spacing.large,
  },
  label: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.secondaryText,
    marginBottom: theme.spacing.small,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.medium,
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    backgroundColor: theme.colors.cardBg,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
  },

  // Button styles
  actionButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: theme.colors.cardBg,
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    marginLeft: theme.spacing.small,
  },
});

export default RegisterPage;