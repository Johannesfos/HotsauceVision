import React, { FC } from 'react'

type Props = {
  label: string
  value?: string
  placeholder?: string
  textarea?: boolean
  maxLength?: number
  onChange: (newValue: string) => void
}

export const HSVInput: FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  textarea,
  maxLength,
}) => {
  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(event.target.value)
  }
  return (
    <>
      <div>
        <span className="label">{label}</span>
        {textarea ? (
          <textarea
            className="textarea-field"
            placeholder={placeholder}
            value={value}
            onChange={onInputChange}
            maxLength={340}
          />
        ) : (
          <input
            type="text"
            maxLength={maxLength}
            className="input-field"
            placeholder={placeholder}
            value={value}
            onChange={onInputChange}
          />
        )}
      </div>
      <style jsx>{`
        .input-field {
          appearance: none;
          border: 0;
          outline: 0;
          background: rgba(255, 255, 255);
          height: 30px;
          width: 60%;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          transition: border 0.3s;
          margin-bottom: 10px;
          padding: 5px;
          box-sizing: border-box;
        }

        .input-field:focus,
        .input-field:hover {
          border: 1px solid rgba(0, 0, 120, 0.7);
        }

        .textarea-field {
          appearance: none;
          padding: 5px;
          border: 0;
          outline: 0;
          background: rgba(255, 255, 255);
          height: 100px;
          width: 60%;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: border 0.3s;
          resize: none;
          margin-bottom: 10px;
          display: block;
          box-sizing: border-box;
        }
        .label {
          display: block;
          width: 100px;
          font-weight: 500;
        }

        .textarea-field:focus,
        .textarea-field:hover {
          border: 1px solid rgba(0, 0, 120, 0.7);
        }
      `}</style>
    </>
  )
}
