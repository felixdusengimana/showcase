"use client"
import React, { useEffect, useRef } from 'react'

export default function Pagescroll() {
    const rightScrollRef = useRef(null);
  const generateRandomBG = ()=>{
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

//   change mouse scroll to left and right on scroll up and down
useEffect(() => {
    document.getElementById('scroll-left')!.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            // Scroll down, so scroll left
            document.getElementById('scroll-left')!.scrollBy(100, 0);
        } else {
            // Scroll up, so scroll right
            document.getElementById('scroll-left')!.scrollBy(-100, 0);
        }
    });

  return () => {
    window.removeEventListener('wheel', function(event) {
      if (event.deltaY > 0) {
          // Scroll down, so scroll left
          document.getElementById('scroll-left')!.scrollBy(100, 0);
      } else {
          // Scroll up, so scroll right
          document.getElementById('scroll-left')!.scrollBy(-100, 0);
      }
  });
  }
}, [])

  return (
    <div ref={rightScrollRef} className='flex flex-row flex-nowrap overflow-auto' id='scroll-left'>
        {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className='h-screen w-screen shrink-0' style={{
                backgroundColor: generateRandomBG()
            }}>
                {i}
            </div>
        ))}
    </div>
  )
}
