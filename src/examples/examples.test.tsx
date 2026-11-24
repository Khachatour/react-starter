import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DataFromApi from './DataFromApi'
import Welcome from './List'
import Text from './Text'
import Family from './Family'
import Draggable from './Draggable'

describe('DataFromApi', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('shows Loading then Finished Loading after 3s', () => {
    render(<DataFromApi loading={true} />)
    expect(screen.getByText(/^Loading/)).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByText('Finished Loading')).toBeInTheDocument()
  })
})

describe('List', () => {
  it('adds, edits and deletes items', async () => {
    const user = userEvent.setup()
    render(<Welcome />)
    await user.type(screen.getByLabelText('New item'), 'apple{Enter}banana{Enter}')
    expect(screen.getByText('apple')).toBeInTheDocument()
    expect(screen.getByText('banana')).toBeInTheDocument()

    await user.click(screen.getAllByText('Edit')[0])
    const editor = screen.getByLabelText('Edit item 1')
    await user.type(editor, 'X')
    expect(editor).toHaveValue('appleX')
    await user.type(editor, '{Enter}')
    expect(screen.getByText('appleX')).toBeInTheDocument()

    await user.click(screen.getAllByText('Delete')[0])
    expect(screen.queryByText('appleX')).not.toBeInTheDocument()
    expect(screen.getByText('banana')).toBeInTheDocument()
  })
})

describe('Text', () => {
  it('edits on click and commits on Enter', async () => {
    const user = userEvent.setup()
    render(<Text />)
    await user.click(screen.getByText('TEST'))
    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Hello{Enter}')
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})

describe('Family', () => {
  it('shares input state between siblings', async () => {
    const user = userEvent.setup()
    render(<Family />)
    await user.type(screen.getByLabelText('brother'), 'hi')
    expect(screen.getByLabelText('sister')).toHaveValue('hi')
  })
})

describe('Draggable', () => {
  it('renders', () => {
    render(<Draggable />)
    expect(screen.getByText('Tst')).toBeInTheDocument()
  })
})
