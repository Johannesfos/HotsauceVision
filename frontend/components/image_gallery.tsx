import React, { FC } from 'react'
import { useUser } from '../utils/auth/useUser'
import { ImageModel } from '../logic/image_model'
import { ImageTile } from './image_tile'

type Props = {
  images: ImageModel[]
  deleteImageById: (id: string) => void
  openImage: (image: ImageModel) => void
  toBeDeleted: boolean
}

export const ImageGallery: FC<Props> = ({
  images,
  deleteImageById,
  openImage,
}) => {
  const user = useUser()
  const isSignedIn = user ? true : false

  return (
    <>
      <div>
        {images.map((image) => (
          <ImageTile
            image={image}
            key={image.id}
            isLoggedIn={isSignedIn}
            deleteImageById={deleteImageById}
            openImage={openImage}
          />
        ))}
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
        }

        .delete p:hover {
          cursor: pointer;
        }

        .image {
          position: relative;
          display: block;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .image img {
          width: 100% !important;
          height: auto !important;
          opacity: 0.85;

          transform: scale(1);
          transition: all 0.3s ease-in-out;
        }

        .image img:hover {
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>
    </>
  )
}
