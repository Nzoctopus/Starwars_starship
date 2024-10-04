import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css'; // Import Tailwind CSS
import CustomshipList from './ships/CustomshipList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SatelliteList from './satellites/SatelliteList';
import Starshiplist from './main_page/Starshiplist';
import DetailCustomshipPage from './ships/DetailCustomshipPage';
import DetailSatellitePage from './satellites/DetailSatellitePage';
import NavigationButtons from './NavigationButtons';


function App() {
    return (
        <div className='pb-20'>
            <Router>
                <NavigationButtons />
                <div className="justify-center flex md:flex-row flex-wrap gap-40 pb-20">
                    <Routes>
                        <Route path="/starships/list_custom_ship" element={<CustomshipList />} />
                        <Route path='/starships/detail_custom_ship/:id' element={<DetailCustomshipPage />} />
                        <Route path='/starships/detail_satellite/:id' element={<DetailSatellitePage />} /> 
                        <Route path="/starships/list_custom_satellites" element={<SatelliteList />} />
                        <Route path="/starships/main_list" element={<Starshiplist />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}


// Render the App component in a specific DOM element
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
