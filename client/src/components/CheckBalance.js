import styles from './styles.module.css'
import { useParams } from 'react-router-dom'
import useAccountDetails from '../hooks/useAccountDetails'

const CheckBalance = () => {
  const { accountNumber } = useParams()
  const accountDetails = useAccountDetails(accountNumber)

  if (!accountDetails) {
    return <main className={styles.main}>
      <a className={styles.button_link} href="/">Home</a>
      <p>Loading. . . . . </p>
    </main>
  }

  return (
    <main className={styles.main}>
      <a className={styles.button_link} href="/">Home</a>
      <p>The balance of {accountDetails.name} is ${accountDetails.amount}.</p>
    </main>
  )
}

export default CheckBalance