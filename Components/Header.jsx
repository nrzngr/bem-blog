import { assets } from '@/Assets/assets'
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Header = () => {

  const [email,setEmail] = useState("");

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("email",email);
    const response = await axios.post('/api/email',formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    }
    else{
      toast.error("Error")
    }
  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href="https://bem-blog.vercel.app/"><Image src={assets.logo} width={60} alt='' className='w-[120px] sm:w-auto'/></Link>
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Berita Acara Terbaru</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Berita Acara Terbaru berisi rangkuman lengkap dari hasil pertemuan atau kegiatan terkini.</p>
      </div>
    </div>
  )
}

export default Header
