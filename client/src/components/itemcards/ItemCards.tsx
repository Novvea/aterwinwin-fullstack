import styles from './ItemCards.module.css'
import { useState, useEffect, useContext } from 'react'
import TinderCard from 'react-tinder-card'
import BackendAPIService from '../../shared/api/service/BackendAPIService'
import { UserContext } from '../../shared/provider/UserProvider'
import { ReactComponent as LikeImage } from '../../shared/images/like.svg'
import { ReactComponent as DiscardImage } from '../../shared/images/discard.svg'

export const ItemCards = () => {
  const [items, setItems] = useState<any>([])
  const [authUserContext] = useContext(UserContext);

  const getAllItemsFromServer = async () => {
    const response = await BackendAPIService.getAllItems()
    setItems(response.data)
  }

  useEffect(() => {
    getAllItemsFromServer()
  }, [])


  const userLikedItem = async (item: any) => {
    try {
      await BackendAPIService.userLikedItem({ id: item._id, email: authUserContext.email })
    } catch (error) {
      console.log('Error while trying to like item')
    }
  }

  const userDislikedItem = async (item: any) => {
    try {
      await BackendAPIService.userDislikedItem({ id: item._id, email: authUserContext.email })
    } catch (error) {
      console.log('Error while trying to dislike item')
    }
  }

  const handleSwipeCard = (item: any, direction: string) => {
    if (direction === 'right') {
      userLikedItem(item)
    }
    if (direction === 'left') {
      userDislikedItem(item)
    }
  }

  console.log('items', items)
  return (
    <div className={styles.itemCardWrapper}>
      {items.map((item: any) => (
        <TinderCard
          key={item._id}
          preventSwipe={["up", "down"]}
          onSwipe={(direction: string) => handleSwipeCard(item, direction)}
        >
          <div className={styles.itemCard}>
            <img className={styles.itemImage} src={item.url} width={512} height={512} alt='A random produkt taken from the API' />
            <h2 className={styles.itemTitle}>{item.name}</h2>
            <div className={styles.itemSubtitle}>5km bort • {item.category}</div>
            <button className={styles.button} onClick={() => userDislikedItem(item)}>
              <LikeImage />
            </button>
            <button className={styles.button} onClick={() => userLikedItem(item)}>
              <DiscardImage />
            </button>
          </div>

        </TinderCard>
      ))}


      {/*       <h1>Produkt av typen blabla med id {indexContext}</h1>
      
      <div className='decisionButtonWrapper'>
        <button onClick={() => addCountOnButtonClick()}>Nej tack!</button>
        <button onClick={() => likeAndAddCountOnButtonClick()}>Mer än bara gillar, vill absolut ha!!!!</button>
        <button onClick={() => likeAndAddCountOnButtonClick()}> Gillar't </button>
      </div> */}
    </div>
  )
}
