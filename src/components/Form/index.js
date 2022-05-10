import React from "react";
import * as S from './styled'
import * as M from '@mui/material'

import InputMask from 'react-input-mask'

function Form({ validate, fields, handleChange }) {
    return (
        <S.Container>
            <header>
                <span>Lista de endereço - Brasil</span>
            </header>
            <M.Grid
                className="address"
                sx={{
                    "&.MuiTextField-root": { m: 1, width: "25ch" },
                }}
                container
        >
             <M.Grid item xs={12} sm={12} md={12} lg={12}>
               <InputMask
                 mask="99999-999"
                 value={fields.cep}
                 onChange={handleChange}
               >
                {(inputProps) => (
                 <M.TextField
                   {...inputProps}
                    error={validate && !fields.cep.replace(/\D/g, "").length}
                    variant="standard"

                    //margin="normal"
                    required
                    fullwidth
                    id="standard-multiline-flexible"
                    label="CEP"
                    name="cep"
                    helperText={ 
                        !fields.cep.replace(/\D/g, "").length && "Campo obrigatório" 
                    }
                    autoComplete="cep"
                 />
                )}
                </InputMask>         
             </M.Grid>            
            </M.Grid>  
        </S.Container> 


    )
}

export default Form