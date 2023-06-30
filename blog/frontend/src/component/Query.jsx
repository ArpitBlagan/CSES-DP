import React from 'react'

const Query = () => {
  return (
    <div className='h-screen flex flex-col justify-center align-middle bg-gray-700'>
        <div className='flex flex-col justify-center align-middle' >
            <div className='text-white bg-gray-900 pl-10 pr-10 pt-5 pb-5'>
                <div className='text-lg text-center font-bold'>Ask question</div>
                <form>
                    <div>
                        <div className='font-semibold text-lg'>Title</div>
                        <input className='w-full rounded p-3 text-black' required placeholder="Enter the title"/>
                    </div>
                    <div>
                    <div className='font-semibold text-lg'>Description</div>
                    <input required className='w-full rounded p-10 text-black' placeholder="Enter the title"/>
                    </div> 
                    <div className='flex justify-center mt-6'>
                    <button className='text-center text-bold bg-blue-600 hover:bg-blue-800 pt-3 pb-3 pl-10 pr-10 rounded '>Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Query