"use client"
export default function Hydration() {
  if(typeof window==="undefined")
    return (
      <div>Hydration Server</div>
    )
  return (
    <div>Hydration Client</div>
  )
}
