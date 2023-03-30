"use client"
import CustomCursor from "@/components/cursor/CustomCursor";

export default function CustomCursors() {
  return (
    <div className=''>
        <h1>Custom Cursors</h1>
        <div className="">
          <CustomCursor cursorComponent={
            <div className="relative">
              <div className="relative top-4 -left-5">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4_95)">
<path d="M8.75418 20L5.62291 4.04092L20 11.9182L12.9181 13.9727L8.75418 20Z" fill="black"/>
<path d="M8.75418 20L5.62291 4.04092L20 11.9182L12.9181 13.9727L8.75418 20Z" stroke="white"/>
</g>
<defs>
<filter id="filter0_d_4_95" x="2.92493" y="2.09064" width="20.3718" height="22.1734" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_95"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_95" result="shape"/>
</filter>
</defs>
</svg>

              </div>
              <div className="bg-yellow-500 w-fit p-1 rounded-full px-3 relative">
              <span>Cursor</span>
            </div>
            </div>
            
          }>
            <div className="flex">
              <button className="bg-blue-600 py-10 px-20" onClick={()=>{
                alert("Hi there")
              }}>Hi there</button>
              <p onClick={()=>{
                alert("Hi there")
              }} className="bg-red-700 h-fit">
                Lorem LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
              </p>
            </div>
          </CustomCursor>
        </div>
    </div>
  )
}
