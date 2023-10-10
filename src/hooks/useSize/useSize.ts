import { useEffect, useState } from "react"

type Size = "sm" | "md" | "lg" | "xl" | "2xl"

export function useSize(): Size {
  const [size, setSize] = useState<Size>("sm")

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      if (width >= 1536) {
        setSize("2xl")
      } else if (width >= 1280) {
        setSize("xl")
      } else if (width >= 1024) {
        setSize("lg")
      } else if (width >= 768) {
        setSize("md")
      } else {
        setSize("sm")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}
