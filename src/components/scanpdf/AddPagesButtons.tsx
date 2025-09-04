import { useRef } from "react"

type Props = {
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export default function AddPagesButton({setImages}:Props) {
  const imgInputRef = useRef<HTMLInputElement>(null)

  const handleAddPages = () => {
    imgInputRef.current.click()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImages: string[] = [] // Images readed as url
    const target = event.target // the input:file element

    for (const file of target.files) {
      if (!file || !file.type.startsWith('image/')) return
      
      const reader = new FileReader()
      reader.onload = (e) => {
        newImages.push(e.target?.result as string) // Push the image as url

        // * When all the images where pushed...
        if (newImages.length === target.files.length) {
          setImages(prev => [...prev, ...newImages]) // change the state
          target.value = '' // resets the input:file
        }
      }
      reader.readAsDataURL(file) // reads the file
    }
  }

  return (
    <>
      <input 
        ref={imgInputRef} 
        type="file" 
        accept=".jpg, .jpeg, .png" 
        multiple 
        onChange={handleFileUpload}
        capture
        hidden 
      />
      <button onClick={handleAddPages}>Add pages</button>
    </>
  )
}