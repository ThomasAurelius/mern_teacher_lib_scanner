import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';



const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        
      },
    },
  },
});


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})


function App() {
  return (
    <>
    <div className="app">
      <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
      
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      </ApolloProvider>
    </div>
    </>
  );
}

export default App;
