import { ImageModel } from '../../frontend/logic/image_model'
import React, { FC } from 'react'
import { categoryToString } from '../utils/category_util'

type Props = {
  image: ImageModel | null
  onCloseClick: () => void
}

export const ImageFullFrame: FC<Props> = ({ image, onCloseClick }) => {
  const onImageClick = (event: any) => {
    event.stopPropagation()
    return false
  }

  if (!image) {
    return null
  } else {
    return (
      <>
        <div className="fullframe" onClick={onCloseClick}>
          <div className="image" onClick={onImageClick}>
            <img src={image.path} />
            <div className="description">
              {categoryToString(image.category) + ': ' + image.description}
            </div>
          </div>

          <button className="closeBtn" onClick={onCloseClick}>
            Close
          </button>
        </div>
        <style jsx>{`
          .fullframe {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 2000;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }

          .image {
            max-width: 40vw;
            border-radius: 10px;
            overflow: hidden;
          }

          .description {
            background: white;
            text-align: center;
            padding: 15px;
          }

          .image img {
            width: 100%;
            display: block;
          }

          .closeBtn {
            position: absolute;
            top: 20px;
            right: 20px;
          }
        `}</style>
      </>
    )
  }
}

// Svart bakgrunn
// Med et bilde i midten
// Description under
// Close knapp i top høyre hjørnet
