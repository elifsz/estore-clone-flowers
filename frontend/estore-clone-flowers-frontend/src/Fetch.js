import {useEffect, useState} from "react";

function Flowers() {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5008/api/Flower') //burası backendden gelen API'ye göre değişecek şu an öylesine bir data koydum.
        .then((res) => res.json())
        .then((flowers) =>setFlowers(flowers));

    }, [])


    return <div> <h1>Flowers</h1>
    {
        flowers.map(flower => <div key={flower.ID}>{flower.name} {flower.price}
         </div>)
    }
    
    
    </div>;
}

export default Flowers;