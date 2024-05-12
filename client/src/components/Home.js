import styles from './styles.module.css'
import { useState } from 'react'

const Home = () => {
  const [accountNumber, setAccountNumber] = useState('')
  const disabled = accountNumber === ''

  return (
    <main className={styles.main}>
      <p>What is your account number?</p>
      <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
      {!disabled ? (
        <><p>
          What would you like to do today?
        </p>
          <div className={styles.buttonGroup}>
            <a className={styles.button_link} href={`/withdrawal/${accountNumber}`}>Withdrawal</a>
            <a className={styles.button_link} href={`/deposit/${accountNumber}`}>Deposit</a>
            <a className={styles.button_link} href={`/check-balance/${accountNumber}`}>Check Balance</a>
          </div>
        </>) : null}
    </main>
  )
}

export default Home