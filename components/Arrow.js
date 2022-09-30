import React, {useEffect, useState} from 'react'


function Arrow() {

    const [isVisible, setisVisible] = useState(true)
    let timeout = null;

    useEffect(() => {
      window.addEventListener("scroll", listenToScroll
      );
    
      return () => {
        window.removeEventListener("scroll",listenToScroll
        )
      }
    }, [])
    
    const listenToScroll = () => {
        setisVisible(false)
        clearTimeout(timeout);
        timeout = setTimeout(()=> {
            setisVisible(true)
        }, 200)
    }

    

  return (
    <>
    <div className={isVisible ? "transition-opacity duration-300  opacity-100" : "transition-opacity duration-300 opacity-0"}>
        <div id="wrapper">
            <div id="wrapper-inner">
                <div id="scroll-down">
                    <span className="arrow-down">
                    </span>
                    <span id="scroll-title">
                    </span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Arrow