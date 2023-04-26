import { ChangeEvent, useEffect, useRef, useState } from "react";

export type FormData = {
    [key: string]: string|number|undefined
}

export type FormErrors = {
    [key: string]: {
        errors: string[],
        touched: boolean,
    }
}

interface FormValidateProps{
    initialValues?: FormData,
    validate?: {
        [key: string]: {
            [key: string]: any,
            customValidation?: (value: string)=>string[]
        }
    },
    initialTouched?: {
        [key: string]: boolean
    } | "all",
}

export function useFormValidate(props?: FormValidateProps){
    const [data, setdata] = useState<FormData>(props?.initialValues||{})
    const [errors, seterrors] = useState<FormErrors>({})
    const [isSubmitted, setisSubmitted] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    
    const inputChange = (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>)=>{
        const {name, value, attributes} = event.target;
        setdata({...data, [name]: value})
        seterrors({...errors, [name]: {
            errors: findInputErrors(attributes, value),
            touched: true
        }})
    }
    
    // const analysePattern = (pattern: string, value: string): string[]=>{
    // }
    const findInputErrors = (attributes: NamedNodeMap, value=''): string[]=>{
        const errors: string[] = []
        const type = attributes.getNamedItem('type')?.value;
        const name = attributes.getNamedItem('name')?.value;
        const required = Boolean(attributes.getNamedItem('required'));
        const minLength = Number(attributes.getNamedItem('minLength')?.value);
        const maxLength = Number(attributes.getNamedItem('maxLength')?.value);
        const min = Number(attributes.getNamedItem('min')?.value);
        const max = Number(attributes.getNamedItem('max')?.value);
        const pattern = attributes.getNamedItem('pattern')?.value;

        if(props?.validate?.[name!]?.customValidation){
            const customErrors = props?.validate?.[name!]?.customValidation?.(value);
            errors.push(...customErrors!)
        }

        if(type === 'email'){
            const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            let message = '';
            if(!email.test(value)){
                message = "this field must be a valid email"
            }

            if(required && message){
                errors.push(message)
            }else if(value.length>0 && message){
                errors.push(message)
            }
        }

        if(required && !Boolean(value)){
            if(props?.validate?.[name!]?.required){
                errors.push(props?.validate?.[name!]?.required)
            }else errors.push("this field is required")
        }

        if(minLength && value && value?.length < minLength){
            if(props?.validate?.[name!]?.maxLength){
                errors.push(props?.validate?.[name!]?.maxLength)
            }else errors.push(`this field must be at least ${minLength} characters`)
        }

        if(maxLength && value && value?.length > maxLength){
            if(props?.validate?.[name!]?.maxLength){
                errors.push(props?.validate?.[name!]?.maxLength)
            }else errors.push(`this field must be at most ${maxLength} chatacters`)
        }

        if(min && value && Number(value)<min){
            if(props?.validate?.[name!]?.min){
                errors.push(props?.validate?.[name!]?.min)
            }else errors.push(`this field must be at least ${min}`)
        }
        
        if(max && value && Number(value)>max){
            if(props?.validate?.[name!]?.max){
                errors.push(props?.validate?.[name!]?.max)
            }else errors.push(`this field must be at most ${min}`)
        }

        if(pattern && value){
            const regex = new RegExp(pattern);
            if(!regex.test(value)){
                errors.push(`this field must match the pattern ${pattern}`)
            }
        }

        return errors;
    }

    const setInitialErrors = (name:string, value: string, attributes: NamedNodeMap)=>{
        return {
            errors: findInputErrors(attributes, value),
            touched: isSubmitted? true: props?.initialTouched === "all" ? true :
            props?.initialTouched?.[name] ? true: false
        }
    }

    const formSubmit = ()=>{
        setisSubmitted(true);
    }

    useEffect(()=>{
        if(formRef.current){
        const currentForm = formRef.current;
        currentForm.noValidate = true;
        let inputs = currentForm.querySelectorAll('input');
        const select = currentForm.querySelectorAll('select');

        const newErrors: FormErrors = {};
        inputs.forEach(input=>{
            const {name, value, attributes} = input;
            newErrors[name] = setInitialErrors(name, value, attributes)
        })

        select.forEach(input=>{
            const {name, value, attributes} = input;
            newErrors[name] = setInitialErrors(name, value, attributes)
        })

        seterrors(newErrors);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSubmitted])

    const isFormValid = Object.keys(errors).every(key=>errors[key].errors.length === 0)

    return {
        inputChange,
        errors,
        formRef,
        data,
        isFormValid,
        formSubmit
    }
}

