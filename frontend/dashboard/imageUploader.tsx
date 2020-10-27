import React, { useRef } from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {
  categoryToString,
  categoryList,
  Category,
} from '../utils/category_util'
import { ImageService } from '../logic/services/image_service'
import { useUploadImage } from './useUploadImage'
import { HSVInput } from '../components/common/HSVInput'
import { Button, DropdownProps } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { HSVNotification } from '../components/common/HSVNotification'

export const ImageUploader = () => {
  const {
    description,
    status,
    category,
    author,
    setAuthor,
    setDescription,
    setCategory,
    setImageFile,
    setLoading,
    setError,
    setSuccess,
    setInit,
    inputFile,
  } = useUploadImage()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFileHandler = (event: any) => {
    const image = event.target.files[0]
    try {
      if (image) {
        setImageFile(image)
      }
    } catch (error) {
      setImageFile('')
      console.log({ image })
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
        description,
        author
      )

      if (!didSucceed) {
        setError()
      } else {
        setSuccess()
      }
    }
  }

  const categoryChange = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    const newCategory = value as Category
    setCategory(newCategory)
  }

  const notificationClick = () => {
    setInit()
  }

  console.log({ category, inputFile })
  return (
    <div>
      <div className="select-file-wrapper">
        <h1>Image Uploader</h1>
        <div hidden={status !== 'success'}>
          <HSVNotification
            btnText="Ok"
            header="Upload Succeded!"
            onClick={notificationClick}
            message="Image will be shown in 10 minutes!"
          />
        </div>
        <div hidden={status !== 'error'}>
          <HSVNotification
            btnText="Try Again!"
            header="Something went wrong"
            onClick={notificationClick}
            message="Try again later, or contact IT-support,"
          />
        </div>

        <div>
          <input ref={fileInputRef} type="file" onChange={uploadFileHandler} />
          <Button onClick={onUploadFile}>Select file:</Button>
          <span>
            {inputFile !== '' ? '  Selected File: ' + inputFile.name : ''}
          </span>
        </div>
        <br />

        <HSVInput
          label="Description"
          value={description}
          onChange={setDescription}
        />
        <HSVInput label="Photograph by" value={author} onChange={setAuthor} />
        <div>
          <p>Category:</p>
          <Dropdown
            onChange={categoryChange}
            placeholder="Choose category..."
            value={category}
            selection
            options={categoryList.map((category) => {
              return {
                key: category,
                text: categoryToString(category),
                value: category,
              }
            })}
          ></Dropdown>
        </div>
        <br />

        <Button primary disabled={status !== 'valid'} onClick={submitImg}>
          Upload
        </Button>
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
