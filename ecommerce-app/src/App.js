import './App.css';
import { Routes, Route } from 'react-router-dom';
import Product from './product';
import Home from './home';

import 'normalize.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path=':productSlug' element={<Product />} />
            </Routes>
        </div>
    );
}

export default App;
