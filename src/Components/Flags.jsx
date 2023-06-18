import React from 'react';
import '../Styles/Flags.scss';

import { NavLink  } from 'react-router-dom';
import { useSelector } from "react-redux";



function Flags(props) {
  const {dark} = useSelector ((state) => state.cart)
  const styleDark = dark ? { color: 'black' } : null;  
  return (
    
        <div className='flag--Cart' style={dark ? {backgroundColor:'white',color:'black'} : null}>
                <NavLink  to={`/${props.id}`} >
                    <img src={props.flag} />
                </NavLink>
                <section>
                    <p>{props.name}</p>
                    <span >
                        <h5 style={styleDark}>Population: </h5>
                        <h6 style={styleDark}>{props.population}</h6> 
                    </span>
                    <span>
                        <h5 style={styleDark}>Region: </h5>
                        <h6 style={styleDark}>{props.region}</h6>
                    </span>
                    <span>
                        <h5 style={styleDark}>Capital: </h5>
                        <h6 style={styleDark}>{props.capital}</h6> 
                    </span>
                </section>
                
        </div>
    
  )
}

export default Flags