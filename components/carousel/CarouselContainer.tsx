"use client"
/* eslint-disable @next/next/no-img-element */
import React, {ReactNode, useEffect} from 'react'
import CarouselButton from './NavigationButton'
import { ChevronLeft, ChevronRight } from '../icons'

type Devices = 'phone'|'tablets'|'desktop'
export interface WindowDimensions{
    device: Devices,
    width: number
    elements?: number,
}
export interface CarouselContainerProps {
    children: ReactNode[],
    elementsToShowOnDevice?: WindowDimensions[]
}

export default function CarouselContainer(props: CarouselContainerProps) {
    const {
        children,
        elementsToShowOnDevice = [
            {
                device: 'phone',
                width: 768,
                elements: 1
            },
            {
                device: 'tablets',
                width: 1024,
                elements: 2
            },
            {
                device: 'desktop',
                width: 7680,
                elements: 3
            }

        ]
    } = props
    const getDimensionPropeties = (deviceName: Devices)=> elementsToShowOnDevice.find((data)=>data.device===deviceName)
  
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [elementsToShow, setElementsToShow] = React.useState<number>(getDimensionPropeties('desktop')?.elements!)

  const clickPossible = Math.floor(children.length/elementsToShow);
  const elementWidth = `${100/elementsToShow}%`;

  React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < getDimensionPropeties('phone')?.width!) {
                setElementsToShow(getDimensionPropeties('phone')?.elements!)
            }else if (window.innerWidth < getDimensionPropeties('tablets')?.width!) {
                setElementsToShow(getDimensionPropeties('tablets')?.elements!)
            }else {
                setElementsToShow(getDimensionPropeties('desktop')?.elements!)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
 }, [])

  useEffect(()=> {
    let carousel: HTMLElement|null= document.getElementById(`caursel${activeIndex*elementsToShow}`)
    carousel?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'})
  }, [activeIndex, elementsToShow])


  return (
    <div className='relative'>
        <div className='w-full flex flex-row overflow-x-auto scrollbar-hide space-x-3'>
        {children.map((child, index) => {
                return (
                    <div 
                    id={index%elementsToShow===0?`caursel${index}`
                        :`caursel${Math.floor(index/elementsToShow)*elementsToShow}-${index}`} 
                    key={index}
                    style={{
                        width: elementWidth
                    }}
                    className={`flex-shrink-0 `}>
                        {child}
                    </div>
                )
            })
        }
    </div>
    <div className="buttons-container w-full flex gap-3 absolute top-1/2 left-0 translate-x-0 translate-y-1/2">
        {activeIndex>0&&<button className="button w-auto absolute left-2 top-0" onClick={
            () => {
                if(activeIndex>0){
                    setActiveIndex(activeIndex-1)
                }                
            }
        }><CarouselButton icon={<ChevronLeft/>}/></button>}
        {activeIndex<clickPossible&&<button className="button w-auto absolute right-2 top-0" onClick={
            () => {
                if(activeIndex<clickPossible){
                    setActiveIndex(activeIndex+1)
                }
            }
        }
        ><CarouselButton icon={<ChevronRight/>}/></button>}
    </div>
    </div>
  )
}
