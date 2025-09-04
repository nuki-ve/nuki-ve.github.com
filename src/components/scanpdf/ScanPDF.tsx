import { useState } from "react";
import PagesPanel from "./PagesPanel";
import AddPagesButton from "./AddPagesButtons";
import PDFPreview from "./PDFPreview";
import PDFGenerator from "./PDFGenerator";

export default function ScanPDF() {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  
  return (
    <>
      <aside>
        <section>
          <AddPagesButton setImages={setSelectedImages} />
        </section>
        <section id="panel">
          <PagesPanel images={selectedImages} setImages={setSelectedImages} />
        </section>
      </aside>
      <main id="previewMain">
        <header id="pdfOptions"><PDFGenerator images={selectedImages} /></header>
        <section id="previewWrapper">
          <PDFPreview selectedImages={selectedImages} />
        </section>
      </main>
    </>
  )
}