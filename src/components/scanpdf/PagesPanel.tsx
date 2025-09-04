import { clamp } from "@/utils"

type Props = {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export default function PagesPanel({images, setImages}:Props) {
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const moveImage = (index, steps) => {
    setImages(prev => {
      const next = structuredClone(prev)
      const img = next.splice(index, 1)[0]
      const newIndex = clamp(index+steps, 0, prev.length-1)

      next.splice(newIndex, 0, img)

      return next
    })
  }

  return (
    <>
      {images.map((image, i) => 
        <article className="item" key={i}>
          <img src={image} alt="img"/>
          <button onClick={() => removeImage(i)}>X</button>
          <button onClick={() => moveImage(i, -1)}>⬆</button>
          <button onClick={() => moveImage(i, 1)}>⬇</button>
        </article>
      )}
    </>
  )
}