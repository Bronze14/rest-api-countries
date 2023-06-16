import React, { useState, useEffect} from 'react';
import '../Styles/FlagsSite.scss';
import { json, useParams } from 'react-router-dom';
import { Link, useLocation, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";


function FlagsSite({ match }) {

  const {id} = useParams()
  const location = useLocation()
  const loaderData = useLoaderData()
  const [borderNames, setBorderNames] = React.useState([])
  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  const [country, setCountry] = useState(null)
  const {dark} = useSelector ((state) => state.cart)
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}?fields=name,population,region,subregion,capital,tld,currencies,languages,flags,borders,official`);
          const jsonData = await response.json();
          setCountry({
              name: jsonData.name.common,
              nameOfficial: jsonData.name.official,
              population: jsonData.population,
              region: jsonData.region,
              subregion: jsonData.subregion,
              capital: jsonData.capital[0],
              tld: jsonData.tld,
              currencies: Object.values(jsonData.currencies)[0].name,
              languages: Object.values(jsonData.languages),
              flags: jsonData.flags.png,
              borders: jsonData.borders,
          })
        } catch (error) {
          console.error('Błąd:', error);
        }
      };

      fetchData();
  }, []);
  console.log(country)

  if (!country) {
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


  
  const styleDark = dark ? { color: 'black' } : null;
  return (
    <div className='Flags--Site--Container' style={dark ? {backgroundColor:'white',color:'black'} : null}>
        <Link style={dark ? {backgroundColor:'white',color:'black'} : null}
            to={`..${search}`}
            relative="path"
            className="back-button"
            >&larr; <span >Back</span>
        </Link>
        <div className='flags--Site'>
          
            <img src={country.flags}/>
            <div className='body--flags--Site'>
                <h2>{country.nameOfficial}</h2>
                <div>
                    <section>
                      <span>
                        <h5 style={styleDark}>Native Name: </h5>
                        <h6 style={styleDark}>{country.name}</h6>
                      </span>
                      <span>
                        <h5 style={styleDark}>Population:</h5>
                        <h6 style={styleDark}>{country.population}</h6>
                      </span>
                      <span>
                        <h5 style={styleDark}>Region:</h5>
                        <h6 style={styleDark}>{country.region}</h6>
                      </span>
                      <span>
                        <h5 style={styleDark}>Sub Region:</h5>
                        <h6 style={styleDark}>{country.subregion}</h6>
                      </span>
                      <span>
                        <h5 style={styleDark}>Capital:</h5>
                        <h6 style={styleDark}>{country.capital}</h6>
                      </span>
                    </section>
                    <section >
                        <span>
                            <h5 style={styleDark}>Top Level Domain:</h5>
                            <h6 style={styleDark}>{country.tld}</h6>
                        </span>
                        <span>
                            <h5 style={styleDark}>Currencies:</h5>
                            <h6 style={styleDark}>{country.currencies}</h6>
                        </span>
                        <span>
                            <h5 style={styleDark}>Languages:</h5>
                            <h6 style={styleDark}>{Array.isArray(country.languages) ? country.languages.join(' ') : country.languages}</h6>

                        </span>
                    </section>
                </div>
                {country.borders.length > 0 && (
                <section className='border--Bar' style={dark ? {color:'black'} : null}>
                    Borders: {country.borders.map((borderName) => (
                    <div key={borderName} className="border-item" style={dark ? {backgroundColor:'white',color:'black'} : null}>
                        {borderName}
                    </div>
                    ))}
                </section>
                )}
            </div>
        </div>
    </div>
  )
}

export default FlagsSite