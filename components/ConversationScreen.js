import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, FlatList, Text } from 'react-native'
import axios from 'axios'

class ConversationScreen extends Component {
  constructor () {
    super()

    this.state = {
      conversation: {},
      messages: []
    }
  }
  componentDidMount () {
    const conversationId = this.props.navigation.state.params.conversationId

    AsyncStorage.getItem('loginToken').then(token => {
      axios.get(`https://still-shelf-13222.herokuapp.com/conversations/${conversationId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        this.setState({
          conversation: response.data
        })
      })

      axios.get(`https://still-shelf-13222.herokuapp.com/messages/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        this.setState({
          messages: response.data
        })
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.messages}
          renderItem={({item}) => (
            <View>
              <Text style={{fontWeight: 'bold'}}>{item.sender.firstName}{item.sender.lastName}</Text>
              <Text>{item.content}</Text>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default ConversationScreen
