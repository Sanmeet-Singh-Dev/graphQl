import logo from './logo.svg';
import './App.css';
import Title from 'antd/es/skeleton/Title';
import AddCar from './components/forms/AddCar';
import People from './components/lists/People';
import AddPerson from './components/forms/AddPeople';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter , Route , Routes }  from 'react-router-dom'
import PersonWithCars from './components/lists/PersonWithCars';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<div><Title /> <AddPerson /> <AddCar /> <People /></div>}></Route>
            <Route path='/people/:personId' element={ <PersonWithCars />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
