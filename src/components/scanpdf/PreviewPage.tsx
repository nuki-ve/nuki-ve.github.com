export default function PreviewPage({img, previewWidth, previewScale, aspectRatio}) {
  const widthScaled = previewWidth * previewScale

  const pageStyle = {
    width: `${widthScaled}px`,
    aspectRatio: aspectRatio,
  }
  
  const availableHeight = widthScaled / aspectRatio
  
  let imgWidth = widthScaled
  let imgHeight = widthScaled / aspectRatio
  
  if (imgHeight > availableHeight) {
    imgHeight = availableHeight;
    imgWidth = availableHeight * aspectRatio;
  }
  
  const style = {
    width: `${imgWidth}px`,
    height: `${imgHeight}px`,
  }
  
  return (
    <article className="page" style={pageStyle}>
      <img src={img} style={style} alt=""/>
    </article>
  )
}
