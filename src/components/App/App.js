import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Studio from '../Studio/Studio';

const App = () => {
    return (
        <div className={container}>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Studio} />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;