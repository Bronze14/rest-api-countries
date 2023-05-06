import React from 'react'
import Flags from './Flags.jsx'
import { useState, useEffect } from 'react';
import data from '../data.json'
import '../Styles/Home.scss'
import { useSelector } from "react-redux"




function Home() {
    const [dataFlag, setDataFlag] = useState(null);
    const [selectedRegion, setSelectedRegion] = React.useState(null);
    const [searchValue, setSearchValue] = useState('');
    const {dark} = useSelector ((state) => state.cart)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setDataFlag(data);
    }, []);
  
    if (!dataFlag) {
        return (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '5em',
            color: dark ? 'black' : 'white'
          }}>
            Loading...
          </div>
        )
    }
    function handleChange(){
        setVisible(item=>!item)
    }
    function handleRegionSelect(region) {
        setSelectedRegion(region);
    }
    const filteredCountries = data.filter(country =>
        country.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      
    const handleSearchChange = e => {
        setSearchValue(e.target.value);
    }
    
    return (
        <div className='Home--Container' style={dark ? {backgroundColor:'white'} : null}>
            <section className='tool--Search'>
                <div className='search--Input' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    <input 
                    
                    type="text"
                    style={dark ? {backgroundColor:'white',color:'#848484'} : null}
                    placeholder="Search for a country..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    />
                </div>

                <div className='filter--Btn' >
                        <button  className="menu-btn" onClick={handleChange} style={dark ? {backgroundColor:'white'} : null}>
                            <h4 style={dark ? {color:'black'} : null}>
                                
                                Filter by Region
                            </h4>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </button>
                        { visible ? (
                            <div class="menu-bar" style={dark ? {backgroundColor:'white'} : null}>
                                <button class="menu-item" onClick={() => {
                                    handleRegionSelect('');
                                    setSelectedRegion(null);
                                    
                                    }} style={dark ? {color:'black'} : null}>World</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Africa')} style={dark ? {color:'black'} : null}>Africa</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Americas')} style={dark ? {color:'black'} : null}>America</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Asia')} style={dark ? {color:'black'} : null}>Asia</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Europe')} style={dark ? {color:'black'} : null}>Europe</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Oceania')} style={dark ? {color:'black'} : null}>Oceania</button>
                            </div>

                        ) : null }
                </div>
            </section>
            <div className='flags--Container'>
                {filteredCountries.map((country, index) => {
                if (selectedRegion === null || selectedRegion === country.region) {
                    return (
                    <Flags
                        key={country.alpha3Code}
                        id={country.alpha3Code}
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                        flag={country.flags.png}
                    />
                    );
                } else {
                return null;
          }
        })}
      </div>
    </div>
    )
}

export default Home