import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from './Api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPass() {
    const [password,setpassword]=useState("")
    const [confirmpassword,setconfirmpassword]=useState("")
    const [showPassword, setShowPassword] = useState(false);

    const {token}=useParams()
    const nav=useNavigate()
    const ResetPassword=async(e)=>{
        e.preventDefault()
        if (password !== confirmpassword) {
      alert("Passwords do not match")
      return
    }

        try{
            const res= await api.post(`/user/reset-password/${token}`,{password})
            alert(res.data.message)
            nav('/login')

        }catch(err){
            alert(err.response?.data?.message||"Invalid or expired link")

        }
       

    }
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-4xl font-bold text-white text-center mb-3">
          Reset Password
        </h2>

        <p className="text-center text-white/70 mb-8">
          Enter your new password below
        </p>

        <form onSubmit={ResetPassword} className="space-y-4">
            
        <div className='relative'>

          <input
            type={showPassword?'text':'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-4 pr-12 text-white placeholder:text-white/50 outline-none"
          />
          <button
          type='button'
          onClick={()=>setShowPassword(!showPassword)}
          className='absolute right-4 top-3 text-white/70 hover:text-white transition'
          >
            {showPassword? <FaEyeSlash/>:<FaEye/>}
          </button>
          
          </div>
          <div className='relative'>

          <input
            type={showPassword?'text':'password'}
            placeholder="Confirm New Password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            required
            className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-4 text-white placeholder:text-white/50 outline-none"
          />
          
          </div>

          <button
            type="submit"
            className="w-full bg-[#F8B400] text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300"
          >
            Reset Password
          </button>

        </form>

      </div>

    </section>
  )
}

export default ResetPass