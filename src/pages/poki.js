import { useEffect , useState} from "react"

const Poki = () => {
    const[offset, setOffset] = useState(0)
    const [data, setData] = useState([0])
    // const [prevBtnActive, setPrevBtnActive] = useState(null)

    const fetchPokemon = async (os) => {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${os}`

        try{
        const pokeApi = await fetch(url)
        const data = await pokeApiResponse.json()

        setData(data.results)

        }catch (error) {
            console.error("error fetching ", error)
        }

        // fetch(url)
        // .then(res => res.json())
        // .then(data => setData(data.results))
        // .catch(error => console.log("error fetching", error))
    }
    const handleNext = () =>{
        setOffset(prev => prev += 20)
    }
    const handlePrevious = () =>{
        setOffset(prev => prev += 20)
    }

    useEffect (() => {
        fetchPokemon(offset)
    }, [offset] )
    return(
        <div>
             <h2>Pokemon Characters</h2>
            <ul>
                {data.map((pokemon, index) => (
                <li
                        key={index}>{pokemon.name}  {/* this will display the names */}
                        {/*URL = {pokemon.url} {/* this will display the URL */}                 
                </li>
                ))}
            </ul>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}



export default Poki;