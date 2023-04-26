"use client";
import { FormEvent } from "react"
import   {useFormValidate} from "./hooks/useInputValidate"
export default function Home() {
  const {inputChange, data, errors, formRef} = useFormValidate({
    initialValues:  {
      anotherName: 'Hi there',
      number: 10,
      email: 'phelixdusengimana@gmail.com'
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
    }
  });
  
  const handleSubmit = (e: FormEvent)=>{
    e.preventDefault();
  }
  
  return (
    <div className="container p-7">
      <h1>Form Validate</h1>
        <form className="flex flex-col gap-2" action="" onSubmit={handleSubmit} ref={formRef}>
    
          <input type="text" required name="anotherName" value={data.anotherName} id="" onChange={inputChange}/>
          <input type="number" name="number" required min={10} value={data.number} max={20} onChange={inputChange}/>
          <input type="email" name="email" required min={10} max={20} value={data.email} onChange={inputChange}/>
          <input type="email" name="emaild" required min={10} max={20} value={data.dadadada} onChange={inputChange}/>
          <button type="submit" className="block">Save Data</button>
          {/* {JSON.stringify(data)} */}
          {JSON.stringify(errors)}
        </form>
    </div>
  )
}





