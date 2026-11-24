import { useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

export default function Draggable() {
  const [size, setSize] = useState({ width: 200, height: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  const startDrag = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = containerRef.current?.offsetWidth ?? size.width
    const startHeight = containerRef.current?.offsetHeight ?? size.height

    const onMove = (ev: MouseEvent) => {
      setSize({
        width: startWidth + ev.clientX - startX,
        height: startHeight + ev.clientY - startY,
      })
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="child"
        style={{ width: size.width, height: size.height, position: 'relative', border: '1px solid #999' }}
      >
        <p>Tst</p>
        <div
          data-testid="resize-handle"
          onMouseDown={startDrag}
          style={{ position: 'absolute', right: 0, bottom: 0, width: 10, height: 10, cursor: 'nwse-resize', background: '#999' }}
        />
      </div>
    </div>
  )
}
