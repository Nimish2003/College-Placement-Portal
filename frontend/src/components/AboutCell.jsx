import React from 'react'

const AboutCell = () => {
  return (
    <>

              <div className="flex h-auto mt-7 w-full justify-around rounded-md
               ">
                <img src='https://www.collegebatch.com/static/clg-gallery/rajiv-gandhi-institute-of-technology-mumbai-237641.jpg' className="flex w-1/3 bg-black object-cover"></img>
               
                <div className="flex-col w-1/2  ml-2 bg-slate-100 text-black text-lg pl-3 justify-items-end ">
                    <h1 className='  text-3xl font-semibold  text-blue-400 ' >About College</h1>
                    {/* underline */}
                    <br />
                <p>
                The Rajiv Gandhi Institute of Technology (RGIT) is an esteemed educational institution established with the aim of providing quality education in the field of technology, RGIT stands as a beacon of excellence in the realm of engineering education.
                As a leading institution in the field of technology education, RGIT continues to uphold its legacy of excellence, producing graduates who are not just competent professionals but also responsible citizens contributing positively to society. With its commitment to innovation, research, and academic integrity, RGIT remains a preferred choice for aspiring engineers and technocrats seeking to make a mark in the world of technology.
                </p>
                </div>


              </div>
    </>
  )
}

export default AboutCell
