import React, { useState } from 'react'
import  {useForm}  from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import {Logo, Input, Button} from './index'
import { login } from '../store/authSlice'
import { toast, ToastContainer } from 'react-toastify'

function Signup() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit,formState: { errors }} = useForm()

    const create = async(data)=>{
    
      
        setError("")
        try {
          console.log(data);
          
            const userData = await authService.createAccount(data)
            console.log(userData);
            
            if(userData){ 
             const userData =  await authService.getCurrentUser()
             console.log(userData);
             
            if(userData) dispatch(login(userData));
            navigate("/")
            console.log(userData);
            
         }
        } catch (error) {
          throw error
        }
    }
  return (
    <div className="flex items-center justify-center">
      <ToastContainer/>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                      <Input
                      label="Fullname"
                      placeholder="Enter your Fullname"
                      type="text"
                      {...register("name",{ required: "Name is required" })}
                      />
                      {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                      <Input
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                      {...register("email",{
                        required: "Email is required",
                        validate:{
                            matchPatern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        }

                      })}
                      />
                      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                      <Input
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      {...register("password",{
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters long"
                        }
                      })}
                      />
                      {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                      <Button type='submit' className='w-full'>Create Account</Button>
                    </div>
                </form>
                </div>
                </div>
  )
}

export default Signup;
