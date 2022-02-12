
import axios from 'axios';
import React,{useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";



function FileUpload(props) {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",
                formData
            );
            console.log(res);
            alert(fileName)
            //-----------------------
            let bemenet={
                bevitel1: props.komment,
                bevitel2:fileName
                
              }
          
              
              function custom_sort(a,b){
                return new Date(a.lastUpdated).getTime()-new Date(b.lastUpdated).getTime();
              }
            
              alert("Sikeres felvitel!")
              fetch('http://localhost:8080/elmenyfelvitel', {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: {"Content-type": "application/json; charset=UTF-8"}
                } )
                .then((response) => response.text())
                .then((szoveg) => {
          
                  alert(szoveg)
              
                })
                .catch((error) =>{
                  console.error(error);
                });
          
            //----------------------

        } catch (ex) {
            console.log(ex);
        }
    };

        return (
            <div className="App">
                <input type="file" onChange={saveFile} />
                <button 
                 onClick={uploadFile}>Upload</button>
            </div>
        );
}

export default FileUpload;