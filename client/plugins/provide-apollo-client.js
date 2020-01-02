import { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:5000'
})
export default function({ app }) {
  app.setup = () => {
    provide(DefaultApolloClient, apolloClient)
  }
}