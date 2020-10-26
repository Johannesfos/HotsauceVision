import React, { useRef } from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {
  categoryToString,
  categoryList,
  Category,
} from '../utils/category_util'
import { ImageService } from '../logic/services/image_service'
import { useMustAuthenticate } from '../utils/auth/useUser'
import { useUploadImage } from './useUploadImage'

export const ImageUploader = () => {
  const {
    description,
    status,
    category,
    setDescription,
    setCategory,
    setImageFile,
    setLoading,
    setError,
    setSuccess,
    setInit,
    inputFile,
  } = useUploadImage()
  const isAuth = useMustAuthenticate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFileHandler = (event: any) => {
    const image = event.target.files[0]

    try {
      if (image.name.length > 2) {
        setImageFile(image)
      }
    } catch (error) {
      setImageFile(null)
    }
  }

  const onUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const submitImg = async () => {
    //sjekk om status er valid
    if (status === 'valid') {
      setLoading()

      const didSucceed = await ImageService.uploadImage(
        //@ts-ignore
        inputFile,
        category,
        description
      )

      if (!didSucceed) {
        setError()
      } else {
        setSuccess()
      }
    }
  }

  const descriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }
  const categoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value as Category
    setCategory(newCategory)
  }

  const notificationClick = () => {
    setInit()
  }

  if (!isAuth) {
    return null
  }

  return (
    <div>
      <div className="select-file-wrapper">
        <div hidden={status !== 'success'}>
          <div className="notification">
            <h1>Notification</h1>
            <p>Upload Successed!</p>
            <p>It will show in maximum 10 Minutes </p>
            <button className="acknBtn" onClick={notificationClick}>
              Ok
            </button>
          </div>
        </div>
        <div hidden={status !== 'error'}>
          <div className="notification">
            <h1>Notification</h1>
            <p>Some error occured!</p>
            <p>Try again!</p>
            <button className="acknBtn" onClick={notificationClick}>
              Ok
            </button>
          </div>
        </div>
        <div className="file-input">
          <input ref={fileInputRef} type="file" onChange={uploadFileHandler} />
          <button onClick={onUploadFile}>Select file:</button>
        </div>
        <p>Name:</p>
        <input type="text" value={description} onChange={descriptionChange} />
        <p>Category:</p>
        <select
          defaultValue={''}
          value={category}
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
        <button disabled={status !== 'valid'} onClick={submitImg}>
          Upload
        </button>
        <div className="loaderBox">
          <Loader
            visible={status == 'loading'}
            type="Circles"
            color="FF9A4A"
            secondaryColor="FF603D"
            height={70}
            width={70}
            timeout={0}
          />
        </div>
      </div>
      <style jsx>{`
        input[type='file'] {
          display: none;
        }

        .notification {
          position: fixed;
          color: white;
          background: rgba(12, 10, 120, 0.8);
          display: flex;
          border: 1px solid black;
          flex-direction: column;
          padding: 15px;
          bottom: 0;
          right: 50px;
          z-index: 2000;
          transform: opacity(1);
          transition: all 1s ease-in;
        }

        .pageStyle {
          margin-left: 50px;
        }

        .acknBtn {
          outline: 0;
          appearance: none;
          border: 0;
          cursor: pointer;
          width: 100px;
          padding: 10px;
          background: rgba(12, 10, 200);
          opacity: 0.5;
          color: white;
        }

        .acknBtn :hover {
          opacity: 1;
        }

        .loaderBox {
          position: fixed;
          top: 50%;
          left: 50%;
          margin-top: -35;
          margin-left: -35;
        }

        .fileInput {
          width: 100px;
          height: 20px;
          border: solid red 1px;
          padding: 6px 12px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
