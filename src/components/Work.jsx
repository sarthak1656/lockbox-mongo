import React from 'react'

const Work = () => {
  return (
    
      <div className="flex flex-col p-4 text-black gap-6 items-center">
<input
  className="rounded-full border border-orange-600 w-full p-4 py-1"
  type="text"
  name=""
  id=""
/>
<div className="flex  my-2 w-full gap-8">
  <input
    className="rounded-full border border-orange-600 w-full p-4 py-1"
    type="text"
  />
  <input
    className="rounded-full border border-orange-600 w-full p-4 py-1"
    type="text"
  />
</div>
<button className="flex justify-center font-semibold gap-4 items-center bg-orange-500 hover:bg-orange-400 rounded-full px-4 py-2 w-fit">
<lord-icon
  src="https://cdn.lordicon.com/jgnvfzqg.json"
  trigger="hover"
></lord-icon>
  Add Password
  </button>
</div>
    
  )
}

export default Work
