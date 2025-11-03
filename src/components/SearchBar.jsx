import React, {useState} from 'react'

function SearchBar() {
    
    const[searchTerm , setSearchTerm] = useState("");

    const handleInputChange = (e)=>{
        setSearchTerm(e.target.value);
    }

    const handleSearch = (e)=>{
        e.preventDefault();

        if(searchTerm.trim() === ''){
          console.log("search bar is empty.")
        }
    }

  return (
    <form onSubmit={handleSearch}>
        <input 
        type="text"
        placeholder='Enter search city...'
        value={searchTerm}
        onChange={handleInputChange}
        />
        <button type = "submit">
            Search
        </button>

    </form>
  )
}

export default SearchBar