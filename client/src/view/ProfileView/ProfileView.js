import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RoutingPath from '../../routes/RoutingPath';
import BackendAPIService from '../../shared/api/service/BackendAPIService';
import AppLayout from '../../components/AppLayout/AppLayout';
import styles from './ProfileView.module.css';

export const ProfileView = () => {
  const auth = useSelector((state) => state.auth);
  const [itemAPIResponse, setItemAPIResponse] = useState([]);
  const [likedItemAPIResponse, setLikedItemAPIResponse] = useState([]);
  const [thisItemIsNoLongerLiked, setThisItemIsNoLongerLiked] = useState();

  useEffect(() => {
    if (auth.data) {
      showMyItems();
      showItemsILiked();
    }
  }, [auth.data, thisItemIsNoLongerLiked]);

  const showMyItems = async () => {
    try {
      const itemsResponse = await BackendAPIService.getItemsByUser(
        auth.data._id
      );
      setItemAPIResponse(itemsResponse.data);
    } catch (error) {
      console.log('errormessage: ', error);
    }
  };

  const showItemsILiked = async () => {
    try {
      const itemsResponse = await BackendAPIService.getLikedItemsByUser(
        auth.data._id
      );
      setLikedItemAPIResponse(itemsResponse.data);
    } catch (error) {
      console.log('errormessage: ', error);
    }
  };

  const removeItemsILiked = async (item) => {
    setThisItemIsNoLongerLiked(item);
    try {
      await BackendAPIService.updateUserLikedItem({
        update_item_id: item._id,
        user_id: auth.data._id,
      });
    } catch (error) {
      console.log('errormessage: ', error);
    }
  };

  return (
    <AppLayout>
      {auth.data && (
        <header className={styles.profileHeader}>
          <img
            className={styles.profileImage}
            src={auth.data.image}
            width={96}
            height={96}
            alt={auth.data.displayName}
            title={auth.data.displayName}
          />
          <h2 className={styles.profileName}>{auth.data.displayName}</h2>
          <a href="/api/logout">Logga ut</a>
        </header>
      )}
      <section className={styles.section}>
        <h3 id="matches">Matchningar</h3>
        <ul className={styles.matchList}>
          <li>
            <div className={styles.matchCards}>
              <div className={styles.itemCard}>
                <img
                  className={styles.itemImage}
                  src="http://res.cloudinary.com/novve/image/upload/v1622972863/demo/gr3e8zojofsrwvmubgev.jpg"
                  width={256}
                  height={256}
                  alt="Boll"
                />
                <h4 className={styles.itemName}>Boll</h4>
              </div>
              <div className={styles.itemCard}>
                <img
                  className={styles.itemImage}
                  src="http://res.cloudinary.com/novve/image/upload/v1622102467/demo/ac3mkffz2ncgwzbldfq4.jpg"
                  width={256}
                  height={256}
                  alt="Lysrör"
                />
                <h4 className={styles.itemName}>Lysrör</h4>
              </div>
            </div>
            <div>
              <strong>Bobo</strong> vill byta med dig!
            </div>
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3 id="items">Tillagda objekt</h3>
        {itemAPIResponse.length ? (
          <ul className={styles.itemList}>
            {itemAPIResponse.map((item, index) => (
              <li className={styles.itemCard} key={item._id}>
                <img
                  className={styles.itemImage}
                  src={item.url}
                  width={192}
                  height={192}
                  alt={item.name}
                />
                <h4 className={styles.itemName}>{item.name}</h4>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
      <section className={styles.section}>
        <h3 id="likes">Gillade objekt</h3>
        {likedItemAPIResponse.length ? (
          <ul className={styles.itemList}>
            {likedItemAPIResponse.map((item, index) => (
              <li className={styles.itemCard} key={item._id}>
                <img
                  className={styles.itemImage}
                  src={item.url}
                  width={192}
                  height={192}
                  alt={item.name}
                />
                <h4 className={styles.itemName}>{item.name}</h4>
                <button onClick={() => removeItemsILiked(item)}>Ta bort</button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </AppLayout>
  );
};

export default ProfileView;
