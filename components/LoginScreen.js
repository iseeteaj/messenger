import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native'
import axios from 'axios'
class LoginScreen extends Component {
  constructor () {
    super()

    this.state = {
      mobileNumber: '',
      password: '',
      loading: false
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin () {
    this.setState({loading: true})

    const { navigate } = this.props.navigation
    const { mobileNumber, password} = this.state

    axios.post('https://still-shelf-13222.herokuapp.com/login',{
      mobileNumber,
      password
    }).then(response => {
      this.setState({loading: false})

      AsyncStorage.setItem('loginToken',response.data.token).then(() => {
        navigate('Home')
      }).catch(error => console.log(error))
    }).catch(error => {
      this.setState({loading: false})
      console.log(error)
    })
  }

  render () {
    if (this.state.loading){
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>

        <Text style={styles.label}>Mobile Number </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({mobileNumber: text})}
        />

        <Text style={styles.label}>Password </Text>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
        />

        <Button title='Log in'onPress={this.handleLogin}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 50,
    textAlign: 'center'
  },
  label: {
    marginTop: 10,
    marginBottom: 10
  },
  Input:{
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20
  }
})

export default LoginScreen
