import React from 'react'
import TextField from '@mui/material/TextField';
import './Search.css';
export default function Search({setSearchName}) {
    

    return (
        <TextField onChange={(e)=>setSearchName(e.target.value)} className="searchBar" id="outlined-basic" label="Search Name" variant="outlined" />
    )
}
