import { useState } from 'react'

interface FamilyInputProps {
  label: string
  inputValue: string
  onInputChange: (value: string) => void
}

export function FamilyInput({ label, inputValue, onInputChange }: FamilyInputProps) {
  return (
    <input aria-label={label} value={inputValue} onChange={(e) => onInputChange(e.target.value)} />
  )
}

export default function Family() {
  const [inputValue, setInputValue] = useState('')
  return (
    <div>
      <FamilyInput label="brother" inputValue={inputValue} onInputChange={setInputValue} />
      <FamilyInput label="sister" inputValue={inputValue} onInputChange={setInputValue} />
    </div>
  )
}
