import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css'; // Import Tailwind CSS
import Customship_list from './ships/Customship_list';
import AddCustomshipPage from './ships/AddCustomshipPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomSatellites_list from './satellites/Satellites_list';
import AddSatellitePage from './satellites/AddSatellitePage';
import Starshiplist from './main_page/Starshiplist';
import Modify_customship from './modify_item/Modify_customship';
import Modify_satellite from './modify_item/Modify_satellite';


function App() {
    return (
        <div className="justify-center flex md:flex-row flex-wrap gap-40 pb-20">
            <Router>
                <Routes>
                    <Route path="/starships/add_custom_ship" element={<AddCustomshipPage />} />
                    <Route path="/starships/list_custom_ship" element={<Customship_list />} />
                    <Route path="/starships/list_custom_satellites" element={<CustomSatellites_list />} />
                    <Route path="/starships/add_satellite" element={<AddSatellitePage />} />
                    <Route path="/starships/main_list" element={<Starshiplist />} />
                    <Route path="/starships/modify_customship" element={<Modify_customship />} />
                    <Route path="/starships/modify_satellite" element={<Modify_satellite />} />
                </Routes>
            </Router>
        </div>
    );
}


// Render the App component in a specific DOM element
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
