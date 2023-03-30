"use client"

import { ReactNode, useEffect, useState } from "react"

interface CustomCursorProps{
    children: ReactNode,
    cursor?: string,
    cursorComponent?: ReactNode
}
export default function CustomCursor(props: CustomCursorProps) {
    const {
        children,
        cursorComponent,
        cursor
    } = props
    const [mousePositions, setMousePositions] = useState({x: 0,y: 0 })
    const [isHovered, setIsHovered] = useState(false);

  const handlePositionChange = (event: MouseEvent, containerRect: any)=>{
    const playButton = document.getElementById("customCursor")!;
	const mouseX = event.clientX - containerRect.left;
	const mouseY = event.clientY - containerRect.top;

	const buttonWidth = playButton.offsetWidth;
	const buttonHeight = playButton.offsetHeight;

	const buttonX = mouseX - buttonWidth / 2;
	const buttonY = mouseY - buttonHeight / 2;

	const maxButtonX = containerRect.width - buttonWidth;
	const maxButtonY = containerRect.height - buttonHeight;
    
    setMousePositions({
        x: Math.min(Math.max(buttonX, 0), maxButtonX),
        y: Math.min(Math.max(buttonY, 0), maxButtonY)
    })
  }  
  useEffect(()=>{
    // Main part of custom cursor
    const customCursorContainer = document.getElementById("video-container")!;

    
    customCursorContainer.addEventListener("mousemove", function (event: MouseEvent) {
        const containerRect = customCursorContainer.getBoundingClientRect();
        setIsHovered(true);
        handlePositionChange(event, containerRect)
    });

    customCursorContainer.addEventListener("mouseleave", function () {
        setIsHovered(false)
    });
return ()=>{
    customCursorContainer.removeEventListener("mousemove", function (event) {
        const containerRect = customCursorContainer.getBoundingClientRect();
        handlePositionChange(event, containerRect)
    });

    customCursorContainer.removeEventListener("mouseleave", function () {
    })
}
})
  return (
    <div>
        <div id="video-container" className="flex flex-col cursor-none justify-center items-center h-394 w-700 border-3 border-gray-900 rounded-lg relative max-w-full">
            {children}
        {
         <div id="customCursor" className={`${!isHovered ? 'invisible': 'absolute'} select-none pointer-events-none`}
         style={{
                top: mousePositions.y,
                left: mousePositions.x,
         }}>{cursorComponent}</div>
        }

    </div>
    </div>
  )
}
