
import React, {  useState } from "react";
import { validPassword,validemail } from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../APICALLS/user";



function Register() {
  const [email,Setemail]=useState("")
  const [password,Setpassword]=useState("")
  const [error,Seterror]=useState("")
  const navigate=useNavigate()
  const [register,SetRegister]=useState(false)
  function handleEmailChange(e){
  Setemail(e.target.value)
  Seterror({...error,email:""})
  }
  function handlePasswordChange(e){
    Setpassword(e.target.value)
    Seterror({...error,password:""})
  }


  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validation logic
    const emailError = validemail(email);
    const passwordError = validPassword(password);

    const newErrors = {};
    if (emailError) {
      newErrors.email = emailError;
    }
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      Seterror(newErrors);
      return;
    }
      try {
        const response = await registerUser(e)
        console.log(response);
        navigate('/login')
    } catch (error) {
      if (error.response && error.response.status === 409) {
          // Email already exists
          Seterror({ email: 'Email already exists' });
      } else {
          console.error('Registration failed:', error.response ? error.response.data.error : error.message);
      }
    }
    

    // If validation passes, you can proceed with form submission
    // For now, let's just log the values
    console.log("Email:", email);
    console.log("Password:", password);
    SetRegister(true)
   
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pb-8 pt-12">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label htmlFor="username" className="text-gray-700 text-sm font-bold mr-2">
              UserName:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-gray-400 p-2 w-full"
            />
                       

          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="email" className="text-gray-700 text-sm font-bold mr-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              className="border border-gray-400 p-2 w-full"
            />
             {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="password" className="text-gray-700 text-sm font-bold mr-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
              className="border border-gray-400 p-2 w-full"
            />
                        {error.password && <span className="text-red-500 text-sm">{error.password}</span>}

          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >Register
            </button>
          </div>
          <div className="flex justify-center">
            <Link to="/login">  <button type="button" className="text-blue-500">Already Registered????</button> </Link>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
