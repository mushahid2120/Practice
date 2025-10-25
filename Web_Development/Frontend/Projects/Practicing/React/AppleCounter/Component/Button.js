import React from 'react'

export default function Button({imgUrl,imgCaption,onClickFun}) {
  console.log(imgUrl)
  return (
    <div className="img-container" onClick={onClickFun}>
        <img src={imgUrl} alt={imgCaption} />
    </div>
  )
}
