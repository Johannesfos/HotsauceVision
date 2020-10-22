import { Reducer, useReducer } from 'react'
import { Category } from '../utils/category_util'

type State = {
  inputFile: File | null
  description?: string
  category?: Category
  status: 'init' | 'valid' | 'loading' | 'success' | 'error'
  error?: string
}

type Action =
  | {
      type: 'changeDescription'
      payload: string
    }
  | {
      type: 'changeCategory'
      payload: Category
    }
  | {
      type: 'changeImageFile'
      payload: File | null
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
    inputFile: null,
  }
  const isReadytoSubmit = (state: State) => {
    if (state.description && state.category && state.inputFile) return true
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
      case 'success':
        return {
          ...prevState,
          status: 'success',
          description: '',
          inputFile: null,
          category: undefined,
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

  const setImageFile = (newImageFile: File | null) => {
    dispatch({ type: 'changeImageFile', payload: newImageFile })
  }

  const setCategory = (newCategory: Category) => {
    dispatch({ type: 'changeCategory', payload: newCategory })
  }
  const setLoading = () => {
    dispatch({ type: 'onLoading' })
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
    description: state.description,
    category: state.category,
    status: state.status,
    inputFile: state.inputFile,
  }
}
