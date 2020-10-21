import React, { useRef } from 'react'
import { useMustAuthenticate } from '../utils/auth/useUser'
import { ImageService } from '../logic/image_service'
import {
  categoryToString,
  categoryList,
  Category,
} from '../utils/category_util'
import { useUploadImage } from './useUploadImage'

export const DashboardPage = () => {
  useMustAuthenticate()
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
    inputFile,
  } = useUploadImage()

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

  return (
    <>
      <div className="select-file-wrapper">
        <div hidden={status !== 'success'}>Yaaay! you are a gay</div>
        <div hidden={status !== 'error'}>Yaaay! you are eror</div>
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
        <div hidden={status !== 'loading'}>
          LOADING!!!.......:!!!!!!"jlijadsøfas
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
