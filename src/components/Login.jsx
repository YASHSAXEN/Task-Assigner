import React, { useContext, useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { authcontext } from '../store/ContextProvider';

const Login = () => {

  const { register, reset, handleSubmit, formState :{ errors }, watch} = useForm();
  const [showPass, setShowPass] = useState(false);
  const passwatch = watch('password');
  const context_value = useContext(authcontext)

  function onFormSubmit(data){
    context_value.changeSessionOnLogin(data)
    reset({username:'',password:''});
  }

  function isShowOrNot(){
    setShowPass(!showPass);
  }

  return (
    <div className="main-container-login">
        <h1 className='login-form-heading'>Login Form</h1>
        <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
        {!context_value.valid && <p className='error'>Invalid Credentials</p>}
            {errors.username && <p className='error'>{errors.username.message}</p>}
            <input type="text" placeholder='Enter Username' className='login-fields' autoComplete='off' {...register('username',{required:'This field is required',minLength:{value:8,message:'Username must be of minimum 8 characters'},pattern:{value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'Username must contain @ int it and always ends with .com'}})}/>
            {errors.password && <p className='error'>{errors.password.message}</p>}
            <div className='password-container'>
              {!showPass ? 
                <>
                  <input type="password" placeholder='Enter Password' className='login-fields' {...register('password',{required:'This field is required',minLength:{value:8,message:'Password must be of minimum 8 characters'}})}/><IoEyeSharp className='open-eye' onClick={()=> isShowOrNot()}/>
                </>
                :
                <>
                  <input type="text" value={passwatch} placeholder='Enter Password' className='login-fields' {...register('password',{required:'This field is required',minLength:{value:8,message:'Password must be of minimum 8 characters'}})}/><FaEyeSlash className='open-eye' onClick={()=> isShowOrNot()}/>
                </>
              }
            </div>
            <button className='login-fields btn'>Submit</button>
        </form>
    </div>
  )
}

export default Login