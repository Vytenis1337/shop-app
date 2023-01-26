import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Home } from './pages/home/Home';
import { Store } from './pages/store/Store';
import { Contacts } from './pages/contacts/Contacts';
import { StoreProvider } from './context/StoreProvider';
import { Cart } from './components/navbar/Cart';

function App() {
  return (
    <div>
      <StoreProvider>
        <BrowserRouter>
          <Navbar />
          <Cart />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/contacts' element={<Contacts />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
