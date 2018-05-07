import Vue from 'vue'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { ApolloLink, concat, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import Config from '@/utils/config.json'

Vue.use(VueApollo)

const httpLink = new HttpLink({
  uri: Config.graphqlServer,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(Config.tokenName) || null
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return forward(operation);
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  },
  errorHandler (error) {
    console.log('Global apollo error handler')
    console.error(error)
  }
})

export default apolloProvider
