import React, { useRef, useState } from 'react'
import { ImageService } from '../frontend/logic/image_service'
import { categoryToString, categoryList } from '../frontend/utils/category_util'
import { useMustAuthenticate } from '../frontend/utils/auth/useUser'

const Dashboard = () => {
  useMustAuthenticate()

  const [imageToUpload, setImageToUpload] = useState<File | null>()
  const [isFile, setIsFile] = useState<boolean>()
  const [description, setDescription] = useState<string>()
  const [category, setCategory] = useState<string>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFileHandler = (event: any) => {
    const image = event.target.files[0]

    try {
      if (image.name.length > 2) {
        setImageToUpload(image)
        setIsFile(true)
      }
    } catch (error) {
      setImageToUpload(null)
      setIsFile(false)
    }
  }

  const onUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const submitImg = () => {
    if (imageToUpload && category && description) {
      //sending image to imageservice to handle upload to firebase
      const uploadMsg = ImageService.uploadImage(
        imageToUpload,
        category,
        description
      )

      console.log({ uploadMsg })
    } else {
      console.warn('Missing image, category or description')
    }
  }

  const descriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const categoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }

  return (
    <>
      <div className="select-file-wrapper">
        <div className="file-input">
          <input ref={fileInputRef} type="file" onChange={uploadFileHandler} />
          <button onClick={onUploadFile}>Select file:</button>
          {isFile && '    SelectedFile: ' + imageToUpload?.name}
        </div>
        <p>Name:</p>
        <input type="text" onChange={descriptionChange} />
        <p>Category:</p>
        <select
          defaultValue={''}
          name="category"
          id="category"
          onChange={categoryChange}
        >
          <option value="" disabled>
            Choose a category...
          </option>
          {categoryList.map((category) => (
            <option key={category} value={category}>
              {categoryToString(category)}
            </option>
          ))}
        </select>
        <button onClick={submitImg}>Upload</button>
      </div>
      <style jsx>{`
        input[type='file'] {
          display: none;
        }

        .pageStyle {
          margin-left: 50px;
        }

        .fileInput {
          width: 100px;
          height: 20px;
          border: solid red 1px;
          padding: 6px 12px;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default Dashboard
