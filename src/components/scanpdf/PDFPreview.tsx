import { useState } from "react"
import PreviewOptions from "./PreviewOptions"
import type { PreviewOptionsObject } from "./types"
import PreviewPage from "./PreviewPage"

type Props = {
  selectedImages: string[]
}

export default function PDFPreview({selectedImages}:Props) {
  const [options, setOptions] = useState<PreviewOptionsObject>({
    previewScale: 1,
    aspectRatio: 0.706650831
  })

  return (
    <>
      <nav id="previewOptions">
        <PreviewOptions options={options} setOptions={setOptions} />
      </nav>
      <main id="preview">
        {selectedImages.map((img, i) => {
          return <PreviewPage
            img={img} 
            aspectRatio={options.aspectRatio}
            previewWidth={300}
            previewScale={options.previewScale}
            key={i}
          />
        })}
      </main>
    </>
  )
}