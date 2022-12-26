import React,{useState} from 'react'
import Container from '@mui/material/Container';
import './View.css';
import { useSelector, useDispatch } from 'react-redux'

import {update} from '../redux/person';
import Button from '@mui/material/Button';

 
export default function View({data}) {
    
    const person = useSelector(state => state.person);
    const dispatch = useDispatch();
   
    const [name,setName]=useState("");
    const [spouse,setSpouse]=useState("");
    const [location,setLocation]=useState("");
    const [birth_year,setBirth]=useState("");
    const [address,setAddress]=useState("");


    const addChild=(person,ID)=>{
         console.log("i am at current id", person)
       if(person.id==ID){ 
        // person['children'].push({"id":seed,"name":"new","children":[]});
        person.name=name;
        person.spouse=spouse;
        person.birth_year=birth_year;
        person.location=location;
        person.present_address=address;
        dispatch(update({id:ID,name:person.name,spouse:person.spouse,location:person.location,birth_year:person.birth_year,present_address:person.present_address}));
       }else{
        //else recur to find the right selected parent
        person['children'] && person['children'].map((dat)=>{
           { addChild(dat,ID);}
        })
       }
    }  
    return (
        <div className="ViewCon">
            <h2>Family Details</h2>
            <hr></hr>
            <table>
                <tr>
                    <td>Name</td>
                    {person.name!="new"?<td>: {person.name}</td>:<input onChange={(e)=>setName(e.target.value)}type="text" placeholder='Type Name'></input>}
                </tr>
                <tr>
                    <td>Spouse</td>
                    {person.name!="new"?<td>: {person.spouse}</td>:<input onChange={(e)=>setSpouse(e.target.value)}type="text" placeholder='Type Spouse'></input>}
                </tr>
                <tr>
                    <td>Location</td>
                    {person.name!="new"?<td>: {person.location}</td>:<input onChange={(e)=>setLocation(e.target.value)}type="text" placeholder='Type Location'></input>}
                </tr>
                <tr>
                    <td>Birth Year</td>
                    {person.name!="new"?<td>: {person.birth_year}</td>:<input onChange={(e)=>setBirth(e.target.value)}type="text" placeholder='Type BirthYear'></input>}
                </tr>
                <tr>
                    <td>Present Address</td>
                    {person.name!="new"?<td>: {person.present_address}</td>:<input onChange={(e)=>setAddress(e.target.value)}type="text" placeholder='Type Address'></input>}
                </tr>
            </table>

            {person.name=="new" && <Button onClick={(e)=>addChild(data,person.id)} variant="contained">Submit</Button>}
        </div>
    )
}
