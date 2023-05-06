import React from 'react'
import { useParams } from 'react-router-dom';
import data from '../data.json'
import '../styles/FlagsSite.scss'
import { Link, useLocation, useLoaderData, defer, Await } from "react-router-dom"
import { useSelector } from "react-redux"


function FlagsSite({ match }) {

  const {id} = useParams()
  const location = useLocation()
  const loaderData = useLoaderData()
  const [borderNames, setBorderNames] = React.useState([])
  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  const country = data.find((c) => c.alpha3Code === id);
  const {dark} = useSelector ((state) => state.cart)


  const names = country.languages.map(lang => lang.name);
  const currencies = country.currencies.map(country => country.name)
  React.useEffect(() => {
    if (country.borders !== undefined) {
      const names = country.borders.map(border => {
        const borderCountry = data.find(c => c.alpha3Code === border);
        return borderCountry ? borderCountry.name : '';
      });
      setBorderNames(names);
    } else {
      setBorderNames([]);
    }
  }, [country.borders, data]);
  return (
    <div className='Flags--Site--Container' style={dark ? {backgroundColor:'white',color:'black'} : null}>
        <Link style={dark ? {backgroundColor:'white',color:'black'} : null}
            to={`..${search}`}
            relative="path"
            className="back-button"
            >&larr; <span >Back</span>
        </Link>
        <div className='flags--Site'>




            <img src={country.flag}/>
            <div className='body--flags--Site'>
                <h2>{country.name}</h2>
                <div>
                    <section>
                        <span>
                            <h5 style={dark ? {color:'black'} : null}>Native Name: </h5>
                            <h6 style={dark ? {color:'black'} : null}>{country.nativeName}</h6>
                        </span>
                        <span>
                            <h5 style={dark ? {color:'black'} : null}>Population:</h5>
                            <h6 style={dark ? {color:'black'} : null}>{country.population}</h6>
                        </span>
                        <span>
                            <h5 style={dark ? {color:'black'} : null}>Region:</h5>
                            <h6 style={dark ? {color:'black'} : null}>{country.region}</h6>
                        </span>
                        <span>
                            <h5 style={dark ? {color:'black'} : null}>Sub Region:</h5>
                            <h6 style={dark ? {color:'black'} : null}>{country.subregion}</h6>
                        </span>
                        <span>
                            <h5 style={dark ? {color:'black'} : null}>Capital:</h5>
                            <h6 style={dark ? {color:'black'} : null}>{country.capital}</h6>
                        </span>
                    </section>
                    <section >
                        <span>
                            <h5 style={dark ? {color:'black'} : null}>Top Level Domain:</h5>
                            <h6 style={dark ? {color:'black'} : null}>{country.topLevelDomain}</h6>
                        </span>
                        <span>
                            <h5 style={dark ? {color:'black'} : null}>Currencies:</h5>
                            <h6 style={dark ? {color:'black'} : null}>{currencies}</h6>
                        </span>
                        <span>
                            <h5 style={dark ? {color:'black'} : null}>Languages:</h5>
                            <h6 style={dark ? {color:'black'} : null}>{names}</h6>
                        </span>
                    </section>
                </div>
                {borderNames.length > 0 && (
                <section className='border--Bar' style={dark ? {color:'black'} : null}>
                    Borders: {borderNames.map((borderName) => (
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