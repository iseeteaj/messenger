import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList, AsyncStorage } from 'react-native'
import Contact from './Contacts'
import axios from 'axios'

class NewConversationScreen extends Component {
  constructor () {
    super()

    this.state = {contacts: [],
      loading: false
    }

    this.handleChooseContact = this.handleChooseContact.bind(this)
  }

  componentDidMount () {
    AsyncStorage.getItem('loginToken').then(token => {
      axios.get('https://still-shelf-13222.herokuapp.com/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        this.setState({
          contacts: response.data
        })
      }).catch(error => console.log(error))
    })
  }

  handleChooseContact (recipientId) {
    this.setState({ loading: true })
    const { navigate } = this.props.navigation

    AsyncStorage.getItem('loginToken').then(token => {
      axios.post('https://still-shelf-13222.herokuapp.com/conversations', {
        recipientId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        this.setState({ loading: false })
        navigate('Home')
      }).catch(error => {
        this.setState({ loading: false })
        console.log(error)
      })
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
        <FlatList
          data={this.state.contacts}
          renderItem={({item}) => <Contact onChooseContact={this.handleChooseContact}{...item} />}
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

export default NewConversationScreen
