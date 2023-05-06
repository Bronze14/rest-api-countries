import React from 'react'
import '../styles/Flags.scss'
import { NavLink  } from 'react-router-dom';
import { useSelector } from "react-redux"



function Flags(props) {
  const {dark} = useSelector ((state) => state.cart)

  return (
    
        <div className='flag--Cart' style={dark ? {backgroundColor:'white',color:'black'} : null}>
                <NavLink  to={`/${props.id}`} >
                    <img src={props.flag} />
                </NavLink>
                <section>
                    <p>{props.name}</p>
                    <span >
                        <h5 style={dark ? {color:'black'} : null}>Population: </h5>
                        <h6 style={dark ? {color:'black'} : null}>{props.population}</h6> 
                    </span>
                    <span>
                        <h5 style={dark ? {color:'black'} : null}>Region: </h5>
                        <h6 style={dark ? {color:'black'} : null}>{props.region}</h6>
                    </span>
                    <span>
                        <h5 style={dark ? {color:'black'} : null}>Capital: </h5>
                        <h6 style={dark ? {color:'black'} : null}>{props.capital}</h6> 
                    </span>
                </section>
                
        </div>
    
  )
}

export default Flags