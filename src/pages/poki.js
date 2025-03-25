import { useEffect , useState} from "react"

const Poki = () => {
    const[offset, setOffset] = useState(0)
    const [data, setData] = useState([0])
    const [profileUrl, setProfileUrl] = useState ("")


    const fetchPokemon = async  (os) => {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${os}`

        try{
            const pokeApiResponse = await fetch(url)
            const data = await pokeApiResponse.json()

            setData(data.results)
        } catch(error){
            console.log("error fetching", error)
        }

    }
    const handleNext = () =>{
        setOffset(prev => prev += 20)
    }
    const handlePrevious = () =>{
        setOffset(prev => prev -= 20)
    }
    const handleProfileUrl = (url) => {
        setProfileUrl(url)
    }

    useEffect (() => {
        fetchPokemon(offset)
    }, [offset] )
    return(
        <div>
            <div>
                <ul>
                {data.map((val, key) => {
                    const {name, url} = val
                    return(
                        <button onClick={() => handleProfileUrl(url)} key={key}> 
                            {name} 
                        </button>
                    )
                })}
            </ul>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
        </div>
        <div>
            <PokemonCharacterProfile
             profileUrl={profileUrl}
            />
        </div>
    </div>
    );
}
const PokemonCharacterProfile = ({ profileUrl }) => {
    const fetchPokemonProfile = async () => {
        const response = await fetch(profileUrl)
        const data = await response.json()
        console.log(data)
    }
    useEffect(() => {
   }, [profileUrl])
    return(
        <div>
            <h1>Pokemon Profile</h1>
        </div>
    )
}


export default Poki;