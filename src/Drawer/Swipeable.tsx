import React, { useEffect, useState } from "react"
import { useSwipeable } from "react-swipeable"

const config = {
  delta: 1, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: true, // track mouse input
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
}

type Props = {
  setHeight: React.Dispatch<React.SetStateAction<number>>
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  contentRef?: React.RefObject<HTMLDivElement>
  height: number
}

export const Swipeable: React.FC<Props> = ({
  height,
  setHeight,
  setOpen,
  contentRef,
}) => {
  const [vh, setVh] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  useEffect(() => {
    function handleResize() {
      setVh(window.innerHeight)
    }

    //sets the first height
    if (contentRef?.current && !isSwiping) {
      setHeight(contentRef.current.scrollHeight + 68)
    }

    // set initial value
    handleResize()

    // add event listener for window resize
    window.addEventListener("resize", handleResize)

    // remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const [prevDeltaY, setPrevDeltaY] = React.useState(0)
  const [isFirstSwipe, setIsFirstSwipe] = useState(true)
  const [isInSameHeight, setIsInSameHeight] = useState(false)

  // eu com certeza demorei dms nesse codigo, mas basicamente, ele pega a altura do componente e diminui ou aumenta de acordo com o movimento do mouse
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setIsSwiping(true)
      setHeight(height - eventData.deltaY + prevDeltaY)
      setPrevDeltaY(eventData.deltaY)
    },
    onSwiped: (eventData) => {
      setIsSwiping(false)
      if (eventData.dir === "Down") {
        let defH = contentRef?.current?.getBoundingClientRect()?.height
        const defHNow = contentRef?.current?.scrollHeight
        if (!defH) return

        // if the previous swipe was in the same height, you can close it because this is the second swipe down, or if it is the first swipe
        if (isInSameHeight || isFirstSwipe) {
          //wiggle room - is the space that the user has to swipe down to close the drawer
          setHeight(5)

          if (eventData.deltaY > 70) {
            setTimeout(() => {
              setOpen?.(false)
            }, 438 /* random time that I tested and felt good */)
          }
          return
        }

        // checks if the drawer is in the same height as the content, this will happen when the drawer was up and was first swiped down
        if (defHNow === defH) {
          setIsInSameHeight(true)
        } else {
          setIsInSameHeight(false)
        }

        // adding the padding and border values to the height
        defH += 68
        // if it was not on the same height, it will set the height to the default height
        setHeight(defH)
      }

      if (eventData.dir === "Up") {
        setIsFirstSwipe(false)
        setIsInSameHeight(false)
        setHeight(vh - 10)
      }
    },
    ...config,
  })

  return (
    <div
      {...handlers}
      className="flex h-9 cursor-grab items-center justify-center p-4 "
    >
      <div className="h-1 w-8 rounded-full bg-gray-25"></div>
    </div>
  )
}
