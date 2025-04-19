import React, {useState} from 'react';
import { 
  View,
  Text, 
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { authStorage } from '../utils/auth';
import { theme } from '../styles/theme';
import { config } from '../config';

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: '9338akira@gmail.com',
          password: '12345678'
          // email,
          // password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await authStorage.storeAuth(data.data.token, data.data.user);
        navigation.navigate('ProfileMain');
      } else {
        Alert.alert('錯誤', '登入失敗');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('錯誤', '登入失敗');
    }
  }

  const handleRegister = () => {
    console.log('navi to register');
    navigation.navigate('Register');
  }

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Login Page</Text>

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
          onPress={() => handleLogin()}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.rowCenter}>
          <Text style={styles.textSecondary}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.textLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  // Typography styles
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  textSecondary: {
    fontSize: theme.fontSize.small,
    color: theme.colors.secondaryText,
  },
  textLink: {
    fontSize: theme.fontSize.small,
    color: theme.colors.primary,
    fontWeight: '600',
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

export default LoginPage;