import React from 'react'
import data from './data.json';
import Tree from './components/Tree.jsx';
import Container from '@mui/material/Container';


import View from './components/View.jsx';
import Grid from '@mui/material/Grid';


export default function App(props) {
  
    console.log(data);
    return (
        <>
        <Grid container >
            <Grid item xs={6} sm={5} md={4}><Tree data={data}/></Grid>
            <Grid item xs={6} sm={7} md={8}><View data={data}/></Grid>
        
        </Grid>
        </>
    )
}
