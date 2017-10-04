import React, { Component } from 'react'
import {View, TextInput, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator} from 'react-native'
import axios from 'axios'

class RegisterScreen extends Component {
  constructor () {
    super()

    this.state = {
      mobileNumber: '',
      firstName: '',
      lastName: '',
      password: '',
      loading: false
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister () {
    this.setState({ loading: true })
    const { navigate } = this.props.navigation
    const { mobileNumber, firstName, lastName, password } = this.state

    axios.post('https://still-shelf-13222.herokuapp.com/register', {
      mobileNumber,
      firstName,
      lastName,
      password
    }).then(response => {
      this.setState({ loading: false })
      AsyncStorage.setItem('loginToken', response.data.token).then(() => {
        navigate('Home')
      }).catch(error => console.log(error))
    }).catch(error => {
      this.setState({ loading: false })
      console.log(error)
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ mobileNumber: text })}
        />

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ firstName: text })}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ lastName: text })}
         />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />

        <Button title="Create an Account" onPress={this.handleRegister} />
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
    marginBottom: 20
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20
  }
})

export default RegisterScreen
