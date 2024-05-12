import styles from './styles.module.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAccountDetails from '../hooks/useAccountDetails'

const Transact = ({ type }) => {
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState(0)
  const { accountNumber } = useParams()
  const accountDetails = useAccountDetails(accountNumber)

  const transact = async () => {
    const results = await fetch(`/api/account/${accountNumber}/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
    const data = await results.json()
    setMessage(data.message)
  }

  if (!accountDetails) {
    return <main className={styles.main}>
      <a className={styles.button_link} href="/">Home</a>
      <p>Loading. . . . . </p>
    </main>
  }

  return (
    <main className={styles.main}>
      <a className={styles.button_link} href="/">Home</a>
      <p>How much do you want to {type === 'withdrawal' ? 'withdraw from' : 'deposit into'} {accountDetails.name}?</p>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button className={styles.button} onClick={transact}>Submit</button>
      <p>{message}</p>
    </main>


  )
}

export default Transact