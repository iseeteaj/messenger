import { StackNavigator } from 'react-navigation'
import HomeScreen from './components/HomeScreen'
import NewConversationScreen from './components/NewConversationScreen'

export default StackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: RegisterScreen },
  NewConversation: { screen: NewConversationScreen }
})
