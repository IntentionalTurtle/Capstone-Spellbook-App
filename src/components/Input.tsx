import { TextField } from '@mui/material'
import { forwardRef } from 'react'

interface InputType {
    name: string,
    placeholder: string
}

const Input = forwardRef(( props: InputType, ref) => { //'forwardRef pipes the data up to the parent (Contact Form) from a TextField'
  return (
    <TextField
        variant="outlined"
        margin="normal"
        inputRef={ref}
        fullWidth
        type='text'
        {...props}  //'spread operator'
    >
    </TextField>
  ) 
})

export default Input