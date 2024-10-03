import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css'; // Import Tailwind CSS
import Customship_list from './ships/Customship_list';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomSatellites_list from './satellites/Satellites_list';
import Starshiplist from './main_page/Starshiplist';
import DetailCustomshipPage from './ships/DetailCustomshipPage';
import DetailSatellitePage from './satellites/DetailSatellitePage';


function App() {
    return (
        <div className="justify-center flex md:flex-row flex-wrap gap-40 pb-20">
            <Router>
                <Routes>
                    <Route path="/starships/list_custom_ship" element={<Customship_list />} />
                    <Route path='/starships/detail_custom_ship/:id' element={<DetailCustomshipPage />} />
                    <Route path='/starships/detail_satellite/:id' element={<DetailSatellitePage />} /> 
                    <Route path="/starships/list_custom_satellites" element={<CustomSatellites_list />} />
                    <Route path="/starships/main_list" element={<Starshiplist />} />
                </Routes>
            </Router>
        </div>
    );
}


// Render the App component in a specific DOM element
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
