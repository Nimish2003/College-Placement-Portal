import React from 'react'

const AboutPrincipal = () => {
  return (
    <>

    <div className="flex h-auto mt-7 w-full justify-around rounded-md
     ">
     
      <div className="flex-col w-1/2  ml-2 bg-slate-100  text-lg pl-3 justify-items-end ">
          <h1 className='  text-2xl font-semibold  text-blue-400' >Principal's Message</h1>
          {/* underline */}
          <br />
      <p className=' text-3xl  text-slate-600 '>
      RGIT continues to be ranked as the top university of the country and among the best in the world. IIT Bombay attracts the brightest students...
      </p>
      <br />
      <h1 className=''>DR. Sanjay Bokade</h1>
      </div>
      <img src='https://static.wixstatic.com/media/b20cba_85dad3ea7b1e4ca19bcef2e4f4279ce9~mv2.jpg/v1/crop/x_0,y_2,w_1576,h_1358/fill/w_628,h_543,al_c,q_80,usm_4.00_1.00_0.00,enc_auto/REG_8021_edited.jpg' className="flex w-1/3 bg-black object-cover"></img>


    </div>
</>
  )
}

export default AboutPrincipal
