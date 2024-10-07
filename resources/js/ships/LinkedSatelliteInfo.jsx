import useLinkedSatelliteInfo from "./useLinkedSatelliteInfo";

export default function LinkedSatelliteInfo ({id}) {

    const {satellite, FetchError} = useLinkedSatelliteInfo({id});

    if (FetchError)
        return <h2 className="text-white font-bold">Linked Satellite deleted</h2>
    return (
        <div>
            <details>
                <summary className="hover:text-yellow-300 hover:text-xl cursor-pointer font-bold text-lg text-yellow-400 p-3">Linked Satellite</summary>
                <div className="flex flex-wrap gap-5 px-5">
                  <div className="text-white px-5">
                    <p>name : {satellite.name}</p>
                    <p>model : {satellite.model}</p>
                    <p>cost : {satellite.cost}</p>
                    <p>capacity : {satellite.capacity}</p>
                    <p>class : {satellite.class}</p>
                  </div>
                </div>
            </details>
        </div>
    )
}