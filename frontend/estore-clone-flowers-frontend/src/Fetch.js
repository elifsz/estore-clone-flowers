import {useEffect, useState} from "react";

function Flowers() {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users') //burası backendden gelen API'ye göre değişecek şu an öylesine bir data koydum.
        .then((res) => res.json())
        .then((flowers) =>setFlowers(flowers));

    }, [])


    return <div> <h1>Users</h1>
    {
        flowers.map(flower => <div key={flower.id}>{flower.name}
         </div>)
    }
    
    
    </div>;
}

export default Flowers;