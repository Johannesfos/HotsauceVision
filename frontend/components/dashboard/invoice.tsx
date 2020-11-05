import React, { useState } from 'react'
import { HSVInput } from '../common/HSVInput'

export const Invoice = () => {
  const [customer, setCustomer] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [workDescription, setWorkDescription] = useState<string>('')

  const onCustomerChange = (customer: string) => {
    setCustomer(customer)
  }

  const onAddressChange = (address: string) => {
    setAddress(address)
  }

  const onZipCodeChange = (zipCode: string) => {
    setZipCode(zipCode)
  }

  const onWorkDescriptionChange = (workDescription: string) => {
    setWorkDescription(workDescription)
  }

  //create invoice
  return (
    <div>
      <h1>Her kommer faktura generator</h1>
      <HSVInput
        label="Customer"
        placeholder="Company..."
        onChange={onCustomerChange}
        value={customer}
      />
      <HSVInput
        label="Address"
        placeholder="Address"
        onChange={onAddressChange}
        value={address}
      />
      <HSVInput
        label="Zip Code"
        placeholder="0175"
        onChange={onZipCodeChange}
        value={zipCode}
      />

      <HSVInput
        label="Work Decription"
        placeholder="What work did you do?...."
        onChange={onWorkDescriptionChange}
        value={workDescription}
        textarea={true}
      />
    </div>
  )
}
