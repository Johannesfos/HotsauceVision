import React, { FC } from 'react'
import { Category, categoryToString } from '../../utils/category_util'

type Props = {
  currentSelectedCategory?: Category | null
  categoryChange: (category: Category) => void
  category: Category
}

export const FilterBtn: FC<Props> = ({
  currentSelectedCategory,
  categoryChange,
  category,
}) => {
  return (
    <>
      <button
        className={
          currentSelectedCategory === category
            ? 'filterBtn active'
            : 'filterBtn'
        }
        onClick={() => categoryChange(category)}
      >
        {categoryToString(category)}
      </button>
      <style jsx>
        {`
          .filterBtn {
            appearance: none;
            outline: 0;
            border: 0;
            background: white;
            color: black;
            border-right: solid black 1px;
            padding: 5px 10px;
            width: 120px;
            opacity: 0.5;
          }

          .filterBtn:hover {
            opacity: 1;
            background: linear-gradient(#fff, #f4f4f4);
            cursor: pointer;
          }

          .filterBtn:nth-last-child(2) {
            border-right: 0;
          }
          .filterBtn:last-child {
            border-left: solid black 1px;
            border-right: 0;
          }

          .active {
            background: linear-gradient(#fff, #f4f4f4);
            opacity: 1;
            box-shadow: 0px 1px 0px 0px #f4f4f4;
          }
        `}
      </style>
    </>
  )
}