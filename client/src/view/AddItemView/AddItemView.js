import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CloudinaryAPIService from '../../shared/api/service/CloudinaryAPIService';
import BackendAPIService from '../../shared/api/service/BackendAPIService';
import AppLayout from '../../components/AppLayout/AppLayout';
import RoutingPath from '../../routes/RoutingPath';
import styles from './AddItemView.module.css';

export const AddItemView = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const [addItemFormData, setAddItemFormData] = useState({
    name: '',
    category: '',
    position: '',
    url: '',
    interestedUsers: ['60c702833f26da0015f101a0'], //for DEMO-purpose only
    uninterestedUsers: [],
  });
  const [disabled, setDisabled] = useState(true);

  const handleChangeImageFile = async (event) => {
    if (event.target.files) {
      try {
        const response = await CloudinaryAPIService.uploadOrUpdateImage(
          event.target.files
        );
        setAddItemFormData({ ...addItemFormData, url: response.data.url });
        setDisabled(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addNewItem = async (event) => {
    event.preventDefault();

    if (addItemFormData) {
      try {
        await BackendAPIService.addItem({
          ...addItemFormData,
          _user: auth.data._id,
        });
        console.log('Item was added');
        history.push(RoutingPath.profileView);
      } catch (error) {
        console.log('errormessage: ', error);
      }
    } else {
      console.log('The item could not be added');
    }
  };

  return (
    <div className={styles.background}>
      <AppLayout>
        <h2>Lägg till objekt</h2>
        <form className={styles.form}>
          <div>
            <label htmlFor="image">Bild</label>
            <input
              className={styles.imageUpload}
              id="image"
              type="file"
              onChange={handleChangeImageFile}
            />
            {addItemFormData.url && (
              <img
                className={styles.imagePreview}
                src={addItemFormData.url}
                alt={addItemFormData.name}
              />
            )}
          </div>
          <div>
            <label htmlFor="name">Produktnamn</label>
            <input
              id="name"
              type="text"
              required
              onChange={(event) =>
                setAddItemFormData({
                  ...addItemFormData,
                  name: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="category">Kategori</label>
            <input
              id="category"
              type="text"
              required
              onChange={(event) =>
                setAddItemFormData({
                  ...addItemFormData,
                  category: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="position">Objektet kan hämtas från (ort)</label>
            {/* (i framtiden: lägg till att pricka position på karta, funkar det med a11y?) */}
            <input
              id="position"
              type="text"
              required
              onChange={(event) =>
                setAddItemFormData({
                  ...addItemFormData,
                  position: event.target.value,
                })
              }
            />
          </div>
          <button type="submit" disabled={disabled} onClick={addNewItem}>
            Spara
          </button>
        </form>
      </AppLayout>
    </div>
  );
};

export default AddItemView;
