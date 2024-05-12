import { useState, useEffect } from 'react'

const useAccountDetails = (accountNumber) => {
  const [accountDetails, setAccountDetails] = useState(null)
  useEffect(() => {
    fetch('/api/account/' + accountNumber)
      .then((res) => res.json())
      .then((data) => setAccountDetails(data))
  }, [accountNumber])

  return accountDetails
}

export default useAccountDetails