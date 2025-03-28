import { useEffect, useState } from "react"

const Poki = () => {
    const [offset, setOffset] = useState(0)
    const [data, setData] = useState([0])
    const [profileUrl, setProfileUrl] = useState("")


    const fetchPokemon = async (os) => {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${os}`

        try {
            const pokeApiResponse = await fetch(url)
            const data = await pokeApiResponse.json()

            setData(data.results)
        } catch (error) {
            console.log("error fetching", error)
        }

    }
    const handleNext = () => {
        setOffset(prev => prev += 20)
    }
    const handlePrevious = () => {
        setOffset(prev => prev -= 20)
    }
    const handleProfileUrl = (url) => {
        setProfileUrl(url)
    }

    useEffect(() => {
        fetchPokemon(offset)
    }, [offset])
    return (
        <div>
            <div>
                <ul>
                    {data.map((val, key) => {
                        const { name, url } = val
                        return (
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
        fetchPokemonProfile()
   }, [profileUrl])
    return(
        <div>
            <h1>Pokemon Profile</h1>
            <h4>Name: {data.name}</h4>
            {console.log(data)}
            <ol>
                {data.moves?.map((moveObj, index) => (
                    <li key={index}>{moveObj.move.name}</li>
                ))}
            </ol>
            <img src={data.sprites?.back_default}/>
            <img src={data.sprites?.back_female}/>
            <img src={data.sprites?.back_shiny}/>
            <img src={data.sprites?.back_shiny_female}/>
            <img src={data.sprites?.front_default}/>
            <img src={data.sprites?.front_female}/>
            <img src={data.sprites?.front_shiny}/>
            <img src={data.sprites?.front_shiny_female}/>
        </div>
    )
}


export default Poki;


