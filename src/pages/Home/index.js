import React, { useEffect, useState } from 'react'
import Form from "../../components/Form"
import * as M from '@mui/material'



import _ from "lodash"

import {getCep} from "../../actions/cep"



function Home() {
   const [ validate, setValidate ] = useState(false) 
   const [ campos, setCampos ] = useState({ 
       rua: "", 
       cep: "",
       bairro: "",
       cidade: "",
       estado: "",
    });

   const handleChange = (event) => {
       if (event.target.name === "cep") {
           const cepFormat = event.target.value.replace(/\D/g, "");
           handleCep(cepFormat)       
       }
        setCampos({ ...campos, [event.target.name]: event.target.value })
   };


   const handleCep = _.debounce(async (cepFormat) => {
       console.log(cepFormat)
       if (cepFormat.length === 8) {
           const cep = await getCep(cepFormat)
           const data = {
               ...cep.data,
               cidade: cep.data.localidade, 
               rua: cep.data.logradouro,
               estado: cep.data.uf
            }
            console.log(data)
            setCampos( data )
        
       } 
   }, 1000)

   useEffect(() => {
       console.log(campos)
   }, [campos])
   
   const onFormSubmit = () => {
       setValidate(true);
   }

    return (
        <div>
           <Form
                validate={validate}
                fields={campos} 
                handleChange={handleChange}
                onFormSubmit={ onFormSubmit }
            />
            
            <M.Grid container 
                direction="column" 
                alignItems="center" 
                justify="center">
            
                    <M.TextField 
                        id="standard-basic" 
                        label="Rua" variant="standard" 
                        value={ campos.rua}
                    />
        

                    <M.TextField 
                        id="standard-basic"     
                        label="Bairro" 
                        variant="standard" 
                        value={ campos.bairro} /> 
            

                    <M.TextField 
                        id="standard-basic" 
                        label="Cidade" variant="standard" 
                        value={ campos.cidade} /> 
        

                    <M.TextField 
                        id="standard-basic" 
                        label="Estado" 
                        variant="standard" 
                        value={ campos.estado} /> 
        
            </M.Grid>
     </div>
    );
}

export default Home