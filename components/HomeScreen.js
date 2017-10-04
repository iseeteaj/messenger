import React, { Component } from 'react'
import {View, Text, Button, StyleSheet, AsyncStorage} from 'react-native'
import axios from 'axios'

class HomeScreen extends Component {
  constructor () {
    super()

    this.state = {
      loggedIn: false,
      conversations: []
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('loginToken').then((token) => {
      if (!token) {
        return
      }

      axios.get('https://still-shelf-13222.herokuapp.com/conversations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response =>{
        if (response.staus !== 401) {
          this.setState({
            loggedIn: true,
            conversations: response.data
          })
        }
      }).catch(error => console.log(error))
    })
  }

  render () {
    const {navigate} = this.props.navigation

    if (this.state.loggedIn) {
      return (
        <View style={styles.container}>
          <Text>Conversations will go here</Text>
          <Button title="New Conversation" onPress={() => navigate('NewConversation')} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heroText}>
                    Welcome to Messenger
        </Text>
        <Button title='Login' onPress={() => navigate('Login')} />
        <Button title='Register' onPress={() => navigate('Register')} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 50
  }
})

HomeScreen.navigationOptions = {
  title: 'Messenger'
}

export default HomeScreen
