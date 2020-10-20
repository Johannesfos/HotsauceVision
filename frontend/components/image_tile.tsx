import React, { FC } from 'react'
import { ImageModel } from '../logic/image_model'

type Props = {
  image: ImageModel
  isLoggedIn: boolean
  deleteImageById: (id: string) => void
  openImage: (image: ImageModel) => void
}

export const ImageTile: FC<Props> = ({
  image,
  isLoggedIn,
  deleteImageById,
  openImage,
}) => {
  const removeImage = () => {
    deleteImageById(image.id)
  }

  const onImageClick = () => {
    openImage(image)
  }

  return (
    <>
      <div className="image-tile">
        {isLoggedIn && (
          <button className="delete" onClick={removeImage}>
            X
          </button>
        )}
        <img onClick={onImageClick} src={image.path} />
      </div>
      <style jsx>{`
        .image_gallery {
        }

        .delete {
          position: absolute;
          line-height: 20px;
          border-radius: 2px;
          vertical-align: middle;
          color: #fff;
          top: 5px;
          left: 5px;
          height: 20px;
          width: 20px;
          border: red solid 2px;
          font: bold;
          background: red;
          opacity: 0.8;
          text-align: center;
          z-index: 999;
        }

        .delete p:hover {
          cursor: pointer;
        }

        .image-tile {
          position: relative;
          display: block;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .image-tile img {
          width: 100% !important;
          height: auto !important;
          opacity: 0.85;

          transform: scale(1);
          transition: all 0.3s ease-in-out;
        }

        .image-tile img:hover {
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>
    </>
  )
}
