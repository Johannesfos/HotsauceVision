import React, { FC } from 'react'
import { useUser } from '../../utils/auth/useUser'
import { ImageModel } from '../../logic/models/image_model'
import { ImageTile } from './image_tile'

type Props = {
  images: ImageModel[]
  openImage: (image: ImageModel) => void
  deleteImageById: (imageID: string) => void
}

export const ImageGallery: FC<Props> = ({
  images,
  openImage,
  deleteImageById,
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
            openImage={openImage}
            deleteImageById={deleteImageById}
          />
        ))}
      </div>

      <style jsx>{``}</style>
    </>
  )
}
