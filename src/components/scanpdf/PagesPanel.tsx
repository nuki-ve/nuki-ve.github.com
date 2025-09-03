import { useState } from "react"
import '@/styles/scanpdf/pagesPanel.less'
import PDFGenerator from "./PDFGenerator";

export default function PagesPanel() {
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    for (const file of event.target.files) {
      if (!file || !file.type.startsWith('image/')) return
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setSelectedImages(prev => [...prev, imageData])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <aside>
        <input type="file" accept=".jpg" multiple onChange={handleFileUpload} />
        {selectedImages.map((image, i) => 
          <div>
            <img src={image} alt="img"/>
            <button onClick={() => removeImage(i)}>X</button>
          </div>
        )}
      </aside>
      <PDFGenerator images={selectedImages}/>
    </>
  )
}