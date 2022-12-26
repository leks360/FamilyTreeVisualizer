import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'colom',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

//recursuve component to print individial person
const PersonPrint=(person,spc)=>{

  return <Text>
  {spc}
  {"| "+person.name+"sad"+'\n'}
  
  {person['children'] && person['children'].map((child)=>
    PersonPrint(child,spc+spc)
  )}
  
  </Text>
}

//Renders the PDF page with heirachy of people in the family.
const MyDocument = (data) => (
  <>
  { console.log("this is imported",data.data)}
  <Document>
   
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* <Text>{JSON.stringify(data)}</Text> */}
        <Text>Faimily Tree</Text>
        {PersonPrint(data.data,"  ")}
        
      </View>
     
    </Page>
  </Document>
  </>
);
export default MyDocument;