import React from "react"
import '../styles/Header.scss'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { darkMode } from "../cart/cartSlice"  



export default function Header(prps) {
    const {dark} = useSelector ((state) => state.cart)
    const dispatch = useDispatch();
    return (
      <header className="primary-color" style={dark ? {backgroundColor:'white'} : null}>
        <Link className="site-logo" to="/" style={dark ? {color:'black'} : null}>
          Where in the World?
        </Link>
        <span >
          <svg onClick={() => {dispatch(darkMode())}}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            style={{cursor:'pointer'}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
          <h4  style={dark ? {color:'black',width:'100px'} : {width:'100px'}}>{dark ? 'Light' : 'Dark'} Mode</h4>
        </span>
      </header>
    );
  }