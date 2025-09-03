import jsPDF from "jspdf"
import { useEffect, useRef, useState } from "react"

type Props = {
  images: string[]
}

export default function PDFGenerator({images}:Props) {
  const embedRef = useRef<HTMLEmbedElement | null>(null)

  useEffect(() => {
    (async () => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      })

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const availableWidth = pageWidth - (margin * 2);
      const availableHeight = pageHeight - (margin * 2);

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // Add new page for subsequent images
        if (i > 0) {
          pdf.addPage();
        }

        // Create an image element to get dimensions
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = image;
        });

        // Calculate aspect ratio and dimensions
        const imgAspectRatio = img.width / img.height;
        let imgWidth = availableWidth;
        let imgHeight = availableWidth / imgAspectRatio;

        // If height exceeds available space, scale by height
        if (imgHeight > availableHeight) {
          imgHeight = availableHeight;
          imgWidth = availableHeight * imgAspectRatio;
        }

        // Center the image on the page
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        // Add image to PDF
        pdf.addImage(image, "JPG", x, y, imgWidth, imgHeight);
        
        // Add page number
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text(
          `Page ${i + 1} of ${images.length}`,
          pageWidth / 2,
          pageHeight - 5,
          { align: "center" }
        )
      }

      embedRef.current.src = pdf.output('datauristring') || null
    })()

  })

  return (
    <main>
      <embed 
        type="application/pdf" 
        width="100%" 
        height="600px"
        ref={embedRef}
      />
    </main>
  )
}