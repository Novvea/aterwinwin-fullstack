import styles from './MyProfileView.module.css'
import { useContext, useState, useEffect } from 'react'
import BackendAPIService from '../../../shared/api/service/BackendAPIService'
import { UserContext } from '../../../shared/provider/UserProvider'

export const MyProfileView = () => {

  const [myUploadedItems, setMyUploadedItems] = useState([])
  const [authUserContext, setAuthUserContext] = useContext(UserContext);

  const getMyItemsFromServerForDisplay = async (email: string) => {
    console.log('i send this to the server: ', email)
    try {
      const response = await BackendAPIService.getMyItemsFromServer(email)
      setMyUploadedItems(response.data)
      console.log('data just arriwwed from server', response.data)
    } catch (error) {
      console.log('i could not get the users items from the server')
    }
  }

  console.log('myUploadedItems: ', myUploadedItems)

  useEffect(() => {
    getMyItemsFromServerForDisplay(authUserContext.email)
  }, [])


  const displayUploadedItemsIfThereAreAny = () => {
    return myUploadedItems.length > 0
      ?
      <>
        <h2>Mina tillagda objekt:</h2>
        <ul className={styles.myProducts}>
          {myUploadedItems.map((item: any) => <li><img key={item._id} src={item.url} alt={item.name} /></li>)}
        </ul>
      </>
      :
      <h2>Du har ännu inte lagt upp något att byta bort</h2>
  }

  console.log('authUserContext: ', authUserContext)

  return (
    <div className="content">
      <img
        className={styles.profilePhoto}
        src={"https://thispersondoesnotexist.com/image"}
        alt={"Profilepicture"}
      />
      <h1>{authUserContext.firstname} {authUserContext.lastname}</h1>
      <p>Gick med xxx</p>
      <button className={styles.button} >Logga ut</button>
      <hr className={styles.hr} />
      <h2>Dina matchningar:</h2>
      <hr className={styles.hr} />
      {displayUploadedItemsIfThereAreAny()}

      <ul>
        <li>Lägg till info om användaren</li>
        <li>Visa upplagda föremål</li>
        <li>Visa gillade och supergillade föremål</li>
        <li>Visa önskelistan</li>
      </ul>
    </div>
  )
}