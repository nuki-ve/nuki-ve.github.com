type Props = {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export default function PagesPanel({images, setImages}:Props) {
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      {images.map((image, i) => 
        <article className="item" key={i}>
          <img src={image} alt="img"/>
          <button onClick={() => removeImage(i)}>X</button>
        </article>
      )}
    </>
  )
}