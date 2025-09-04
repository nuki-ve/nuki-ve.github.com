import { clamp } from "@/utils"
import type { PreviewOptionsObject } from "./types"

type Props = {
  options: PreviewOptionsObject
  setOptions: React.Dispatch<React.SetStateAction<PreviewOptionsObject>>
}

export default function PreviewOptions({options, setOptions}:Props) {
  const zoom = (amount) => {
    setOptions(prev => {
      const next = structuredClone(prev)
      next.previewScale = clamp(next.previewScale + amount, 0.25, 2.05)
      return next
    })
  }

  const resetZoom = () => {
    setOptions(prev => {
      const next = structuredClone(prev)
      next.previewScale = 1
      return next
    })
  }

  return (
    <>
      <div>
        <span>Pag: 1/5</span>
      </div>
      <div id="scaler">
        <button onClick={() => zoom(-0.15)}>-</button>
        <span onClick={() => resetZoom()} id="scalePercent">
          {`${Math.round(options.previewScale * 100)}%`}
        </span>
        <button onClick={() => zoom(0.15)}>+</button>
      </div>

      <div></div>
    </>
  )
}