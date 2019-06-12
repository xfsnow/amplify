import React from 'react';
import {Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Auth from '@aws-amplify/auth';
// configuration
import awsconfig from './aws-exports';
// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);


export default class App extends React.Component {
  state = {
    username:'',
    password:'',
    phone_number:'',
    email:'',
    confirmationCode:''
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  signUp() {
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
      phone_number: this.state.phone_number,
      email: this.state.email, 
      }
      })
      .then(() => console.log('successful sign up!'))
      .catch(err => console.log('error sign up: ', err));
  } 
  confirmSignUp() {
    Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
    .then(() => console.log('successful confirm sign up!'))
    .catch(err => console.log('error confirm sign up: ', err));
  }
  
  
  render() {
    return (
  <View style={styles.container}>
        <TextInput
onChangeText={value => this.onChangeText('username', value)}
          style={styles.input}
          placeholder='Username'
        />
        <TextInput
onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password'
        />
        <TextInput
onChangeText={value => this.onChangeText('phone_number', value)}
          style={styles.input}
          placeholder='Phone Number'
        />
        <TextInput
onChangeText={value => this.onChangeText('email', value)}
          style={styles.input}
          placeholder='Email'
        />
        <Button title="Sign Up"
         onPress={this.signUp.bind(this)}
         />

        <TextInput
onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='Confirmation Code'
        />
        <Button title="Confirm Sign Up" 
         onPress={this.confirmSignUp.bind(this)}
        />
      </View>
  );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 200
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
