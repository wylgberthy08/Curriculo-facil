'use client'

import { useRef, useEffect, useState } from 'react'

interface ScaledPreviewWrapperProps {
  children: React.ReactNode
  naturalWidth?: number // largura original do conteúdo (A4 = ~794px)
}

export function ScaledPreviewWrapper({ children, naturalWidth = 794 }: ScaledPreviewWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const newScale = containerWidth / naturalWidth
        setScale(Math.min(newScale, 1)) // nunca escala acima de 100%
      }
    }

    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [naturalWidth])

  return (
    <div ref={containerRef} className="w-full">
      <div
        style={{
          width: naturalWidth,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
         
        }}
      >
        {children}
      </div>
    </div>
  )
}
