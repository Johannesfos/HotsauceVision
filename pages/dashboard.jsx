import React, { useRef, useState } from 'react'
import { useMustAuthenticate } from '../frontend/utils/auth/useUser'
import { ImageService } from '../frontend/logic/image_service'
import { categoryToString, categoryList } from '../frontend/utils/category_util'

const Dashboard = () => {
  const [imageToUpload, setImageToUpload] = useState()
  const [isFile, setIsFile] = useState()
  const { user } = useMustAuthenticate()
  const [description, setDescription] = useState()
  const [category, setCategory] = useState()

  const fileInputRef = useRef()

  const uploadFileHandler = (event) => {
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
    fileInputRef.current.click()
  }

  const submitImg = () => {
    //sending image to imageservice to handle upload to firebase
    const uploadMsg = ImageService.uploadImage(
      imageToUpload,
      category,
      description
    )

    console.log({ uploadMsg })
  }

  const descriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const categoryChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <>
      <div className="pageStyle">
        <h2>Management</h2>
        <div className="select-file-wrapper">
          <div className="file-input">
            <input
              ref={fileInputRef}
              type="file"
              onChange={uploadFileHandler}
            />
            <button onClick={onUploadFile}>Select file:</button>
            {isFile && '    SelectedFile: ' + imageToUpload.name}
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
