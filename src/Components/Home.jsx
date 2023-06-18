import React from 'react'
import '../Styles/Home.scss'
import Flags from './Flags.jsx'
import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux"




function Home() {
    const [dataFlag, setDataFlag] = useState(null);
    const [selectedRegion, setSelectedRegion] = React.useState(null);
    const [searchValue, setSearchValue] = useState('');
    const {dark} = useSelector ((state) => state.cart);
    const [visible, setVisible] = useState(false);
    const cartRef = useRef(null);
    const avatarRef = useRef(null);
    const styleDark = dark ? { color: 'black' } : null;  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,capital,languages,cca3');
          const jsonData = await response.json();
          setDataFlag(jsonData);
          
        } catch (error) {
          console.error('Błąd:', error);
        }
      };

      fetchData();
  }, []);
  if(dataFlag) console.log(dataFlag)
  useEffect(() => {
        function handleClickOutside(event) {
          if (
            cartRef.current &&
            !cartRef.current.contains(event.target) &&
            !avatarRef.current.contains(event.target)
          ) {
            setVisible(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
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
    const filteredCountries = dataFlag.filter(country =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
      
    const handleSearchChange = e => {
        setSearchValue(e.target.value);
    }
    return (
        <div className='Home--Container' style={dark ? {backgroundColor:'white'} : null}>
            <section className='tool--Search'>
                <div className='search--Input' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    <input 
                    
                    type="text"
                    style={dark ? {backgroundColor:'white',color:'#848484'} : null}
                    placeholder="Search for a country..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    />
                </div>

                <div className='filter--Btn' ref={avatarRef}>
                        <button  className="menu-btn" onClick={handleChange} style={dark ? {backgroundColor:'white'} : null}>
                            <h4 style={dark ? {color:'black'} : null}>
                                
                                Filter by Region
                            </h4>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </button>
                        { visible ? (
                            <div class="menu-bar" ref={cartRef} style={dark ? {backgroundColor:'white'} : null}>
                                <button class="menu-item" onClick={() => {
                                    handleRegionSelect('');
                                    setSelectedRegion(null);
                                    
                                    }} style={dark ? {color:'black'} : null}>World</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Africa')} style={styleDark}>Africa</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Americas')} style={styleDark}>America</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Asia')} style={styleDark}>Asia</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Europe')} style={styleDark}>Europe</button>
                                <button class="menu-item" onClick={() => handleRegionSelect('Oceania')} style={styleDark}>Oceania</button>
                            </div>

                        ) : null }
                </div>
            </section>
            <div className='flags--Container'>  
              {filteredCountries
                .sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((country, index) => {
                  if (selectedRegion === null || selectedRegion === country.region) {
                    return (
                      <Flags
                        key={country.cca3}
                        id={country.cca3}
                        name={country.name.common}
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