import { act, fireEvent, render, screen } from '@testing-library/react'
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

  it('cycles the Loading dots 0..3 and wraps to 1', () => {
    render(<DataFromApi loading={true} />)
    const dots = (n: number) => screen.getByText(`Loading${'.'.repeat(n)}`)
    expect(dots(0)).toBeInTheDocument()
    for (const n of [1, 2, 3, 1, 2]) {
      act(() => {
        vi.advanceTimersByTime(300)
      })
      expect(dots(n)).toBeInTheDocument()
    }
  })

  it('toggles back to Loading after 3s when loading=false', () => {
    render(<DataFromApi loading={false} />)
    expect(screen.getByText('Finished Loading')).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByText(/^Loading/)).toBeInTheDocument()
    expect(screen.queryByText('Finished Loading')).not.toBeInTheDocument()
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

  it('resizes on handle drag and stops after mouseup', () => {
    const widthSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(200)
    const heightSpy = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(50)
    try {
      render(<Draggable />)
      const box = screen.getByText('Tst').parentElement as HTMLElement
      fireEvent.mouseDown(screen.getByTestId('resize-handle'), { clientX: 100, clientY: 100 })
      fireEvent.mouseMove(document, { clientX: 130, clientY: 120 })
      expect(box).toHaveStyle({ width: '230px', height: '70px' })
      fireEvent.mouseUp(document)
      fireEvent.mouseMove(document, { clientX: 300, clientY: 300 })
      expect(box).toHaveStyle({ width: '230px', height: '70px' })
    } finally {
      widthSpy.mockRestore()
      heightSpy.mockRestore()
    }
  })
})
