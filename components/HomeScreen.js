import React, { Component } from 'react'
import {View, Text, Button, StyleSheet, AsyncStorage, FlatList} from 'react-native'
import Conversation from './Conversation'
import axios from 'axios'

class HomeScreen extends Component {
  constructor () {
    super()

    this.state = {
      loggedIn: false,
      conversations: []
    }

    this.handleChooseConversation = this.handleChooseConversation.bind(this)
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
      }).then(response => {
        console.log(response)
        if (response.status !== 401) {
          this.setState({
            loggedIn: true,
            conversations: response.data
          })
        }
      }).catch(error => console.log(error))
    })
  }

  handleChooseConversation (conversationId){
    const {navigate} = this.props.navigation
    navigate('Conversation', {conversationId})
  }

  render () {
    const {navigate} = this.props.navigation

    if (this.state.loggedIn) {
      console.log(this.state)
      return (
        <View style={styles.container}>
          <Text>Conversations will go here</Text>
          <Button title='New Conversation' onPress={() => navigate('NewConversation')} />
          <FlatList
            data={this.state.conversations}
            renderItem={({item}) => <Conversation onChooseConversation={this.handleChooseConversation} {...item}/>}
            keyExtractor={(item) =>{
              console.log(item)
              return item._id }}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heroText}>
            Welcome to Messenger
        </Text>
        <Button title="Login" onPress={() => navigate('Login')}/>
        <Button title="Register" onPress={() => navigate('Register')}/>
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

