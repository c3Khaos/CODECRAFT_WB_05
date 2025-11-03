import React, {useState} from 'react'

function SearchBar({onCitySubmit}) {
    
    const[searchTerm , setSearchTerm] = useState("");

    const handleInputChange = (e)=>{
        setSearchTerm(e.target.value);
    }

    const handleSearch = (e)=>{
        e.preventDefault();

        const query = searchTerm.trim();
        if(query){
            onCitySubmit(query);
            setSearchTerm('');
        }
        
    }

  return (
    <form onSubmit={handleSearch}>
        <input 
        type="text"
        placeholder='Entercity name (e.g., Nairobi)'
        value={searchTerm}
        onChange={handleInputChange}
        
        />

        <button
        type = "submit"
        disabled={!searchTerm.trim()}
        >
           Check Weather
        </button>

    </form>
  )
}

export default SearchBar