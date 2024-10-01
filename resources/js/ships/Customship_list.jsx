import '../../css/app.css'; // Import Tailwind CSS
import React, { useEffect, useState } from "react";
import useCustomship from './useCustomship';
import ModifyCustomship from './ModifyCustomship.jsx'

const Customship_list = () => {
  
  const {data, fetchData, handleDelete} = useCustomship();
  const [isModifying, setModifying] = useState(false);

  const toggleModifying = () => {
    setModifying(isModifying ? false : true);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <div>
        <p className="mt-6 text-[2.5rem] leading-none sm:text-4xl tracking-tight font-bold text-yellow-500 py-5">Customship</p>
        <button onClick={toggleModifying} className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{isModifying ? 'Cancel Modification' : 'Modify'}</button>
      </div>
          {data.map((item, index) => (
            <details key={index}>
                <summary className="hover:text-yellow-300 hover:text-xl cursor-pointer font-bold text-lg text-yellow-400 p-3">{item.name}</summary>
                <div className='flex flex-wrap gap-5'>
                {
                isModifying ?
                <ModifyCustomship data={item} setModifying={setModifying} fetchData={fetchData}/>
                :
                <div className="flex flex-wrap gap-5">
                  <div className="text-white">
                      <p>model : {item.model}</p>
                      <p>manufacturer : {item.manufacturer}</p>
                      <p>cost : {item.cost}</p>
                      <p>length : {item.lenght}</p>
                      <p>max_atmo_speed : {item.max_atmo_speed}</p>
                      <p>crew : {item.crew}</p>
                      <p>passengers : {item.passengers}</p>
                      <p>cargo_capacity : {item.cargo_capacity}</p>
                      <p>consumables : {item.consumables}</p>
                      <p>hyperdrive_rating : {item.hyperdrive_rating}</p>
                      <p>mglt : {item.mglt}</p>
                      <p>starship_class : {item.starship_class}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                </div>
                }
                </div>
            </details>
          ))}
    </div>
  );
};

export default Customship_list;