"use client"
/* eslint-disable @next/next/no-img-element */
import React, {ReactNode, useEffect, useState} from 'react'
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
    elementsToShowOnDevice?: WindowDimensions[],
    autplay?: boolean,
    autplayInterval?: number,
    stopOnHover?: boolean
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

        ],
        autplay = false,
        autplayInterval = 5000,
        stopOnHover = true
    } = props
    const getDimensionPropeties = (deviceName: Devices)=> elementsToShowOnDevice.find((data)=>data.device===deviceName)
  
    const [activeIndex, setActiveIndex] = useState(0)
    const [innerAutoPlay, setInnerAutoPlay] = useState(false)
    const [elementsToShow, setElementsToShow] = React.useState<number>(getDimensionPropeties('desktop')?.elements!)

    const clickPossible = Math.floor(children.length/elementsToShow);
    const elementWidth = `${100/elementsToShow}%`;

    const handleResize = () => {
        if (window.innerWidth < getDimensionPropeties('phone')?.width!) {
            setElementsToShow(getDimensionPropeties('phone')?.elements!)
        }else if (window.innerWidth < getDimensionPropeties('tablets')?.width!) {
            setElementsToShow(getDimensionPropeties('tablets')?.elements!)
        }else {
            setElementsToShow(getDimensionPropeties('desktop')?.elements!)
        }
    }

  useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
 }, [])
 

  const handleScroll = (index: number)=>{
    let carousel: HTMLElement|null= document.getElementById(`caursel${index*elementsToShow}`)
    carousel?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'})
  }

  const handleAutoplay = async () =>{

        let t1  = await setTimeout(() => {
            if(activeIndex<clickPossible){
                setActiveIndex(activeIndex+1);
                handleScroll(activeIndex+1);
            }else{
                setActiveIndex(0);
                handleScroll(0);
            }
            if(!stopOnHover){
                setInnerAutoPlay(!innerAutoPlay)
            }
        }, autplayInterval);

        return () => {
            clearTimeout(t1)
        }
  }

    useEffect(() => {
        console.time('time1')
        let interval:NodeJS.Timeout;
        if(autplay){
            interval = setTimeout(handleAutoplay, autplayInterval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [innerAutoPlay])


  return (
    <div className='relative' 
    onMouseOver={() => {setInnerAutoPlay(true)}}>
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
    <div className="buttons-container w-full flex gap-3 absolute top-1/2 left-0 translate-x-0 translate-y-1/2 text-black">
        {activeIndex>0&&<button className="button w-auto absolute left-2 top-0" onClick={
            () => {
                if(activeIndex>0){
                    setActiveIndex(activeIndex-1);
                    handleScroll(activeIndex-1)
                }                
            }
        }><CarouselButton icon={<ChevronLeft/>}/></button>}
        {activeIndex<clickPossible&&<button className="button w-auto absolute right-2 top-0" onClick={
            () => {
                if(activeIndex<clickPossible){
                    setActiveIndex(activeIndex+1);
                    handleScroll(activeIndex+1);
                }
            }
        }
        ><CarouselButton icon={<ChevronRight/>}/></button>}
    </div>
    </div>
  )
}
