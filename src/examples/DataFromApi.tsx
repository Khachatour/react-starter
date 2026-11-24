import { useEffect, useState } from 'react'

const style = { fontSize: '3em' }

export function Loading() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCounter((c) => (c >= 3 ? 1 : c + 1)), 300)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <p style={style}>
        <span>Loading{'.'.repeat(counter)}</span>
      </p>
    </div>
  )
}

export default function DataFromApi({ loading: initialLoading = true }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading)

  useEffect(() => {
    const id = setTimeout(() => setLoading((l) => !l), 3000)
    return () => clearTimeout(id)
  }, [])

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  return (
    <div>
      <span style={style}>Finished Loading</span>
    </div>
  )
}
