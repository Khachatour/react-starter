import { useState } from 'react'

export default function Text() {
  const [show, setShow] = useState(false)
  const [content, setContent] = useState('TEST')

  if (show) {
    return (
      <div>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setShow(false)
          }}
        />
      </div>
    )
  }
  return (
    <div>
      <p
        onClick={(e) => {
          setContent(e.currentTarget.textContent ?? '')
          setShow(true)
        }}
      >
        {content}
      </p>
    </div>
  )
}
