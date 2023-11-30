/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export default function useForm(submitHandler, initialValues) {
  const [values, setValue] = useState({ initialValues });
  
  useEffect(()=>{
      setValue(initialValues)
  },[initialValues]);


  const onChange = (e) => {
    // вземи стария статейт и направи нов стайт
    setValue((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(values);
  };
  return { values, onChange, onSubmit };
}
