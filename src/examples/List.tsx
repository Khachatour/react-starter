import { useState } from 'react'
import type { KeyboardEvent } from 'react'

export function FilterItem({ item }: { item: string }) {
  return (
    <div>
      <input value={item} onChange={() => undefined} />
    </div>
  )
}

interface ListItemProps {
  listItem: string[]
  onDelete: (index: number) => void
  onEdit: (index: number, value: string) => void
}

export function ListItem({ listItem, onDelete, onEdit }: ListItemProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  return (
    <div>
      {listItem.map((item, index) => (
        <li key={index}>
          {editingIndex === index ? (
            <input
              aria-label={`Edit item ${index + 1}`}
              value={item}
              onChange={(e) => onEdit(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setEditingIndex(null)
              }}
            />
          ) : (
            item
          )}
          <button onClick={() => onDelete(index)}>Delete</button>
          <button onClick={() => setEditingIndex(editingIndex === index ? null : index)}>
            Edit
          </button>
        </li>
      ))}
    </div>
  )
}

export default function Welcome() {
  const [items, setItems] = useState<string[]>([])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value
      e.currentTarget.value = ''
      setItems((prev) => [...prev, value])
    }
  }

  return (
    <div>
      <input aria-label="New item" onKeyDown={handleKeyDown} />
      <ListItem
        listItem={items}
        onDelete={(index) => setItems((prev) => prev.filter((_, i) => i !== index))}
        onEdit={(index, value) => setItems((prev) => prev.map((v, i) => (i === index ? value : v)))}
      />
    </div>
  )
}
