import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top right shape */}
      <View style={styles.topRightShape} />

      {/* Logo */}
      <Image
        source={require('./assets/imz-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Bottom and corner images */}
      <Image
        source={require('./assets/down.png')}
        style={styles.bottomImage}
        resizeMode="contain"
      />
      <Image
        source={require('./assets/up.png')}
        style={styles.cornerImage}
        resizeMode="contain"
      />

      {/* Form box: Sign In to NEXT button */}
      <View style={styles.formBox}>
        {/* Heading */}
        <Text style={styles.heading}>Sign In</Text>

        {/* Email Input */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Forget Password */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forget Password ?</Text>
        </TouchableOpacity>

        {/* NEXT Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom left shape */}
      <View style={styles.bottomLeftShape} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
    transform: [{ translateY: -40 }],  // keeps whole content shifted up if you want
  },
  logo: {
    width: 190,
    height: 140,
    alignSelf: 'center',
    marginBottom: 10,
    transform: [{ translateY: -90 }],  // shift logo up
  },

  bottomImage: {
    width: 180,
    height: 200,
    position: 'absolute',
    bottom: -40,
    left: 0,
    marginLeft: -50,
    zIndex: 1,
  },

  cornerImage: {
    width: 120,
    height: 180,
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 0,
    zIndex: 10,
  },

  formBox: {
backgroundColor: '#f7f9fc',
    padding: 20,
    marginTop:-75,
    borderRadius: 12,
    // Shadows for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android shadow
    elevation: 3,
  },

  heading: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 14,
    color: '#000',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: '#000',
  },

  forgotText: {
    color: '#007bff',
    textAlign: 'right',
    marginBottom: 25,
    fontSize: 13,
  },

  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },

  // If you want to add shapes like topRightShape and bottomLeftShape, add them here
  topRightShape: {
    // your styles here if needed
  },

  bottomLeftShape: {
    // your styles here if needed
  },
});
