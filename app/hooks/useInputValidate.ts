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
    customErrorMessages?: {
        [key: string]: {
            [key: string]: string
        }
    },
}

export function useFormValidate(props?: FormValidateProps){
    const [data, setdata] = useState<FormData>(props?.initialValues||{})
    const [errors, seterrors] = useState<FormErrors>({})
    const formRef = useRef<HTMLFormElement>(null)
    
    const inputChange = (event: ChangeEvent<HTMLInputElement>)=>{
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

        if(type === 'email' && required){
            const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            if(!email.test(value)){
                errors.push("this field must be a valid email")
            }
        }

        if(required && !Boolean(value)){
            if(props?.customErrorMessages?.[name!]?.required){
                errors.push(props?.customErrorMessages?.[name!]?.required)
            }else errors.push("this field is required")
        }

        if(minLength && value && value?.length < minLength){
            if(props?.customErrorMessages?.[name!]?.maxLength){
                errors.push(props?.customErrorMessages?.[name!]?.maxLength)
            }else errors.push(`this field must be at least ${minLength} characters`)
        }

        if(maxLength && value && value?.length > maxLength){
            if(props?.customErrorMessages?.[name!]?.maxLength){
                errors.push(props?.customErrorMessages?.[name!]?.maxLength)
            }else errors.push(`this field must be at most ${maxLength} chatacters`)
        }

        if(min && value && Number(value)<min){
            if(props?.customErrorMessages?.[name!]?.min){
                errors.push(props?.customErrorMessages?.[name!]?.min)
            }else errors.push(`this field must be at least ${min}`)
        }
        
        if(max && value && Number(value)>max){
            if(props?.customErrorMessages?.[name!]?.max){
                errors.push(props?.customErrorMessages?.[name!]?.max)
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

    useEffect(()=>{
      if(formRef.current){
        formRef.current.noValidate = true;
        const inputs = formRef.current.querySelectorAll('input');
        const newErrors: FormErrors = {};
        inputs.forEach(input=>{
            const {name, value, attributes} = input;
            newErrors[name] = {
                errors: findInputErrors(attributes, value),
                touched: false
            }
        })
        seterrors(newErrors);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return {
        inputChange,
        errors,
        formRef,
        data
    }
}

