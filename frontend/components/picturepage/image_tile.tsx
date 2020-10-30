import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { ImageModel } from '../../logic/models/image_model'

type Props = {
  image: ImageModel
  isLoggedIn: boolean
  openImage: (image: ImageModel) => void
  deleteImageById: (imageID: string) => void
}

export const ImageTile: FC<Props> = ({
  image,
  isLoggedIn,
  openImage,
  deleteImageById,
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
            <FontAwesomeIcon icon={faTimes} size={'2x'} />
          </button>
        )}
        <img onClick={onImageClick} src={image.path} />
      </div>
      <style jsx>{`
        .delete {
          position: absolute;
          appearance: none;
          outline: 0;
          border: 0;
          background: orange;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          color: #fff;
          top: 20px;
          right: 20px;
          padding: 5px;
          background: red;
          opacity: 0.5;
          z-index: 999;
        }

        .delete :hover {
          cursor: pointer;
          opacity: 1;
        }

        .deleted-pic {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          z-index: 1001;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.7);
          color: white;
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
