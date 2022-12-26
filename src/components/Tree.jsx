import React,{useState,useEffect} from 'react';
import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import Container from '@mui/material/Container';
import './Tree.css';
import { TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import {update} from '../redux/person';
// import data from '../data.json';
import PdfRender from './pdfRender.jsx';
import Search from './Search';
// data['children'][1]['children'].push({"id":"123","name":"lolqop","children":[]})




export default function Tree({data}) {

    const Selected_person = useSelector(state => state.person);
    
    const dispatch = useDispatch();

  
    
    const [Data,setData]=useState(data);
    const [seed,setSeed]=useState(15);
    const [Json,setJson]=useState();
    const [searchName,setSearchName]=useState("$");
   

    //Adds a children to the selected Person

    const addChild=(person,ID)=>{
        // console.log("i am at current id", person)
       if(person.id==ID){ 
        person['children'].push({"id":seed,"name":"new","children":[]});
       
        setSeed((prv)=>prv+1);
        
       }else{
        //else recur to find the right selected parent
        person['children'] && person['children'].map((dat)=>{
           { addChild(dat,ID);}
        })
       }
    }

    function download(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function onDownload(){
          download(JSON.stringify(data), "FamilyTree.json", "text/plain");
    }

    //Uploading JSON functionality.
    const upload=(e)=>{
        var fr = new FileReader();
        fr.onload = function(e) { 
            console.log(e);
              var result = JSON.parse(e.target.result);
              var formatted = JSON.stringify(result, null, 2);
              result.value = formatted;

              console.log(result);
              data=result;
             
              setSeed((prev)=>prev+1);
            }

        fr.readAsText(e.target.files.item(0));
        
    }

    //Recursive function to display the tree 
    const renderTree=(inst)=>(

        //onClicking on an individual it upadtes the selected state of a person in redux store.
         <TreeItem onClick={()=>dispatch(update({id:inst.id,name:inst.name,spouse:inst.spouse,location:inst.location,birth_year:inst.birth_year,present_address:inst.present_address}))}  
    
           className={(searchName && inst.name.includes(searchName)?"redLabel":"normalLabel")}
           key={inst.id} nodeId={inst.id} label={inst.name}>
            
            {Array.isArray(inst.children)? inst.children.map(
                (nod)=>
                
                renderTree(nod)
                
                ):null}
        </TreeItem>
    );
    
    return (
       
            <div className="TreeCon">
                <h2>Family Tree</h2>
                
                <Search setSearchName={setSearchName}/>
                
                <TreeView 
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                    height:300, flexGrow:1, overflowY: 'auto',
                    overflowX:'scroll',
                    '&::-webkit-scrollbar':{
                        width:1,
                    },
                    padding:"20px"
                }}
                >
               
                {renderTree(data)}
                {console.log(Selected_person.id)}

                </TreeView>
                
                <div className="ButtonContainer">
                <Button className="ButtonStyle" onClick={()=>addChild(data,Selected_person.id)}variant="contained">Add Family</Button>

                <Button className="ButtonStyle" onClick={()=>onDownload()}variant="contained">Export Json</Button>    

                <input id="upload" type="file" style={{display: 'none'}} onChange={upload}/> 
                <label htmlFor={'upload'}>
                <Button  className="ButtonStyle" disabled variant="contained">Import Json</Button>    
                </label>

                <PDFDownloadLink document={<PdfRender data={data}/>} fileName="somename.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : <Button className="ButtonStyle" variant="contained">Print Family Tree</Button>   
                }
                </PDFDownloadLink>
                </div>

            </div>
        
       
    )
}
