import { useState } from 'react'

interface InputProps {
  inputValue: string
  onInputChange: (value: string) => void
}

export function InputBrother({ inputValue, onInputChange }: InputProps) {
  return (
    <input aria-label="brother" value={inputValue} onChange={(e) => onInputChange(e.target.value)} />
  )
}

export function InputSister({ inputValue, onInputChange }: InputProps) {
  return (
    <input aria-label="sister" value={inputValue} onChange={(e) => onInputChange(e.target.value)} />
  )
}

export default function Family() {
  const [inputValue, setInputValue] = useState('')
  return (
    <div>
      <InputBrother inputValue={inputValue} onInputChange={setInputValue} />
      <InputSister inputValue={inputValue} onInputChange={setInputValue} />
    </div>
  )
}
