import { useState } from "react"

export const useForm = (initialState = {}) => {

  const [values, setValues] = useState(initialState)

  const reset = (newState = initialState) =>{
    setValues(newState)
  }

  const handleInputChange = ({target}) =>{

    setValues({
      ...values,
      [target.name]: target.value  // Le asigna la propiedad el nombre en donde se escribe y el valor que se escribe
    });

  };
  
  return [values, handleInputChange, reset];
}