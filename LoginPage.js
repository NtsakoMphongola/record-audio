import { View, Text, TouchableOpacity,TextInput,StyleSheet,Alert  } from 'react-native'
import React, {useRef, useState} from 'react'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import  {firebaseConfig} from './config.js'; 
import firebase  from 'firebase/compat/app';


const LoginPage = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] =useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () =>{
    if (!phoneNumber.trim()) {
      alert('Please Enter Phone Number');
      return;
    }else{
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
    .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
    .then(setVerificationId);
    setPhoneNumber('');
    }
  };
  const confirmCode = () =>{
    const credential=firebase.auth.PhoneAuthProvider.credential( verificationId, code );
    firebase.auth().signInWithCredential(credential)
    .then(()=>{
      setCode('');
    })
    // .catch((error) => {
    //     alert("Error");
    // })

    if (!code.trim()) {
      alert('Please Enter Verification Code');
      return;
    } else {
      alert('Welcome');
    navigation.navigate('HomePage');
    }
  }

  return (
    <View style={styles.container}>
      < FirebaseRecaptchaVerifierModal ref= {recaptchaVerifier}firebaseConfig={firebaseConfig}
      />
      <View style={styles.container1}>
        <Text style={styles.otpText}> Login using OTP </Text>
        <TextInput placeholder='Enter Phone Number, Start With Country Code'
        onChangeText={setPhoneNumber} keyboardType='phone-pad' autoCompleteType='tel' style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
          <Text style={styles.buttonText}> Send Verification Code </Text>
        </TouchableOpacity>
        <TextInput placeholder='Confirm Code'onChangeText={setCode} keyboardType='number-pad' style={styles.textInput1}
        />
        <TouchableOpacity style={styles.sendCode}  onPress = {confirmCode}>
          <Text style={styles.buttonText1}> Confirm Verification Code </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddcdcd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    padding: 25,
    width: 450,
    borderRadius: 15,
    backgroundColor: 'gray',
    textAlign: 'center',
    justifyContent: 'center',
  },
  textInput: {
    padding: 20,
    paddingTop: 25,
    marginBottom: 25,
    margin: 5,
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  textInput1: {
    padding: 20,
    paddingTop: 25,
    marginBottom: 25,
    margin: 0,
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  sendVerification: {
    padding: 20, 
    paddingBottom: 15,
    borderBottomWidth: 5,
    borderRadius: 15,
    backgroundColor: '#bb9915',
  },
  sendCode: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ff5421',
  },
  buttonText: {
    fontSize: 24,
    paddingBottom: 10,
    marginBottom: 5,
  },
  buttonText1: {
    fontSize: 24,
    paddingBottom: 10,
  },
  otpText: {
    fontSize: 24,
    padding: 10,
    textTransform: 'uppercase',
  },
})