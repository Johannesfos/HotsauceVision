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
            background: black;
            color: white;
            border-right: solid black 1px;
            padding: 5px 10px;
            width: 120px;
            opacity: 0.5;
          }

          .filterBtn:hover {
            opacity: 1;
            background: rgba(241, 90, 36, 0.5);
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
            background: rgba(241, 90, 36, 0.8);
            opacity: 1;
          }
        `}
      </style>
    </>
  )
}
