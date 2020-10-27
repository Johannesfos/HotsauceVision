import React, { useEffect, useState } from 'react'
import { ImageGallery } from '../frontend/components/picturepage/image_gallery'
import { ImageModel } from '../frontend/logic/models/image_model'
import { useUser } from '../frontend/utils/auth/useUser'
import { FilterBtn } from '../frontend/components/picturepage/filterbtn'
import { Category, categoryList } from '../frontend/utils/category_util'
import { ImageFullFrame } from '../frontend/components/picturepage/imageFullFrame'
import { GetStaticProps, NextPage } from 'next'
import { ImageService } from '../frontend/logic/services/image_service'

type Props = {
  initimages: ImageModel[]
}
//images component
const Images: NextPage<Props> = ({ initimages }) => {
  // state hvor vi lagrer bilder når de er ferdig hentet
  const [allImages, setAllImages] = useState<ImageModel[]>(initimages)
  const [images, setImages] = useState<ImageModel[]>(initimages)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [selectedImage, setSelectedImage] = useState<ImageModel | null>(null)
  const user = useUser()

  // Send til image tile, så imagetile kan si at et bilde er valgt
  const openImage = (image: ImageModel) => {
    setSelectedImage(image)
  }

  const closeFullFrameImage = () => {
    setSelectedImage(null)
  }

  const categoryChange = (newCategory: Category) => {
    if (newCategory === currentCategory) {
      setCurrentCategory(null)
    } else {
      setCurrentCategory(newCategory)
    }
  }

  const deleteImageById = async (id: string) => {
    const newImages = allImages.filter((img) => {
      return img.id !== id
    })

    const filteredImages = images.filter((img) => {
      return img.id !== id
    })

    setAllImages(newImages)
    setImages(filteredImages)

    if (user) {
      ImageService.deleteImage(id)
    } else {
      console.error('User not signed in!')
    }
  }

  useEffect(() => {
    if (currentCategory) {
      //filter bilder på kategori
      setImages(
        allImages.filter((item) => {
          return item.category === currentCategory
        })
      )
    } else {
      setImages(allImages)
    }
  }, [currentCategory])

  return (
    <>
      <div className="btnWrapper">
        {categoryList.map((category) => {
          return (
            <FilterBtn
              currentSelectedCategory={currentCategory}
              categoryChange={categoryChange}
              category={category}
              key={category}
            />
          )
        })}
      </div>
      <div className="wrapper">
        <div id="gallery">
          <ImageGallery
            images={images}
            openImage={openImage}
            deleteImageById={deleteImageById}
          />
        </div>
        <ImageFullFrame
          image={selectedImage}
          onCloseClick={closeFullFrameImage}
        />
      </div>
      <style jsx>{`
        .wrapper {
          padding-left: 70px;
          padding-right: 70px;
          display: flex;
          flex-wrap: wrap;
        }

        .btnWrapper {
          position: relative;
          margin-bottom: 10px;
          margin-top: 10px;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        #gallery {
          line-height: 0;
          column-count: 3;
          column-gap: 10px;
        }

        @media (max-width: 1200px) {
          #gallery {
            column-count: 2;
          }
        }

        @media (max-width: 1000px) {
          #gallery {
            column-count: 1;
          }
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const revalidateEveryXMinutes = 5
  const initimages = await ImageService.getAllImages()

  return { props: { initimages }, revalidate: 60 * revalidateEveryXMinutes }
}

export default Images
