"use client";
import { FormEvent } from "react"
import   {useFormValidate} from "./hooks/useInputValidate"
export default function Home() {
  const {inputChange, data, errors, formRef, isFormValid} = useFormValidate({
    initialValues:  {
      anotherName: '',
      number: 0,
      email: ''
    },
    validate: {
      anotherName: {
        required: 'Another name is required',
        customValidation: (value) =>{
            const errors = [];
            if(value.length>10){
                errors.push('Another name is too long')
            }
            if(value.includes('a')){
              errors.push('Another name is too short')
            }
            return errors;
        },
      },
    },
    initialTouched: "all"
  });
  
  const handleSubmit = (e: FormEvent)=>{
    e.preventDefault();
    if(!isFormValid){
      alert('Form is valid')
    }else alert("for has errors")
  }
  
  return (
    <div className="container p-7">
      <h1>Form Validate</h1>
        <form className="flex flex-col gap-2" action="" onSubmit={handleSubmit} ref={formRef}>
    
          <input type="text" required name="anotherName" value={data.anotherName} id="" onChange={inputChange}/>
          <p>{errors?.anotherName?.touched && errors?.anotherName.errors.join(' . ')}</p>
          <input type="number" name="number" required min={10} value={data.number} max={20} onChange={inputChange}/>
          <p>{errors?.number?.touched && errors?.number.errors.join('\n')}</p>
          <input type="email" name="email" required min={10} max={20} value={data.email} onChange={inputChange}/>
          <p>{errors?.email?.touched && errors?.email.errors.join('\n')}</p>
          <input type="email" name="emaild" required={false} min={10} max={20} value={data.dadadada} onChange={inputChange}/>
          <p>{errors?.emaild?.touched && errors?.emaild.errors.join('\n')}</p>
          <select name="select" defaultValue={""} onChange={inputChange} required>
            <option value="" disabled>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <p>{errors?.select?.touched && errors?.select.errors.join('\n')}</p>
          <button type="submit" className="block bg-blue-400 py-3 disabled:bg-red-50" disabled={!isFormValid}>Save Data</button>
        </form>
        {JSON.stringify(errors)}
    </div>
  )
}





