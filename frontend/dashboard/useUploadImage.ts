import { Reducer, useReducer } from 'react'
import { Category } from '../utils/category_util'

type State = {
  inputFile: File | ''
  description: string
  category: Category | null
  status: 'init' | 'valid' | 'loading' | 'success' | 'error'
  error?: string
  author: string
}

type Action =
  | {
      type: 'changeDescription'
      payload: string
    }
  | {
      type: 'changeCategory'
      payload: Category | null
    }
  | {
      type: 'changeImageFile'
      payload: File | ''
    }
  | {
      type: 'changeAuthor'
      payload: string
    }
  | {
      type: 'success'
    }
  | {
      type: 'error'
    }
  | {
      type: 'onLoading'
    }
  | {
      type: 'init'
    }
export const useUploadImage = () => {
  const initialState: State = {
    status: 'init',
    inputFile: '',
    author: '',
    category: null,
    description: '',
  }
  const isReadytoSubmit = (state: State) => {
    console.log(state)
    if (state.description && state.category && state.inputFile && state.author)
      return true
    else return false
  }

  const reducer: Reducer<State, Action> = (prevState, action) => {
    let newState: State
    switch (action.type) {
      case 'changeDescription':
        newState = { ...prevState, description: action.payload }
        return {
          ...newState,
          status: isReadytoSubmit(newState) ? 'valid' : 'init',
        }
      case 'changeCategory':
        newState = { ...prevState, category: action.payload }
        return {
          ...newState,
          status: isReadytoSubmit(newState) ? 'valid' : 'init',
        }
      case 'changeImageFile':
        newState = { ...prevState, inputFile: action.payload }
        return {
          ...newState,
          status: isReadytoSubmit(newState) ? 'valid' : 'init',
        }
      case 'onLoading':
        return {
          ...prevState,
          status: 'loading',
        }
      case 'changeAuthor':
        newState = { ...prevState, author: action.payload }
        return {
          ...newState,
          status: isReadytoSubmit(newState) ? 'valid' : 'init',
        }
      case 'success':
        return {
          ...prevState,
          status: 'success',
          description: '',
          inputFile: '',
          author: '',
          category: null,
        }
      case 'error':
        return {
          ...prevState,
          status: 'error',
        }
      case 'init':
        return {
          ...prevState,
          status: 'init',
        }

      default:
        return prevState
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const setDescription = (newDescription: string) => {
    dispatch({ type: 'changeDescription', payload: newDescription })
  }

  const setImageFile = (newImageFile: File | '') => {
    console.log(newImageFile)
    dispatch({ type: 'changeImageFile', payload: newImageFile })
  }

  const setCategory = (newCategory: Category | null) => {
    dispatch({ type: 'changeCategory', payload: newCategory })
  }
  const setLoading = () => {
    dispatch({ type: 'onLoading' })
  }
  const setAuthor = (newAuthor: string) => {
    dispatch({ type: 'changeAuthor', payload: newAuthor })
  }
  const setSuccess = () => {
    dispatch({ type: 'success' })
  }
  const setError = () => {
    dispatch({ type: 'error' })
  }
  const setInit = () => {
    dispatch({ type: 'init' })
  }

  return {
    setDescription,
    setCategory,
    setImageFile,
    setLoading,
    setSuccess,
    setError,
    setInit,
    setAuthor,
    description: state.description,
    category: state.category,
    status: state.status,
    inputFile: state.inputFile,
    author: state.author,
  }
}
