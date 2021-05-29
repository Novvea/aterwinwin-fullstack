import { useState } from 'react';
import { useSelector } from 'react-redux';
import CloudinaryAPIService from '../shared/api/service/CloudinaryAPIService';
import BackendAPIService from '../shared/api/service/BackendAPIService';
import AppLayout from '../components/AppLayout/AppLayout';

export const AddItemView = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const [addItemFormData, setAddItemFormData] = useState({
    name: '',
    category: '',
    position: '',
    url: '',
    interestedUsers: [],
    uninterestedUsers: [],
  });

  const handleChangeImageFile = async (event) => {
    if (event.target.files) {
      try {
        const response = await CloudinaryAPIService.uploadOrUpdateImage(
          event.target.files
        );
        setAddItemFormData({ ...addItemFormData, url: response.data.url });
        console.log('response.data :', response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log('addItemFormData: ', addItemFormData);

  const addNewItem = async () => {
    if (addItemFormData) {
      console.log('we should have an owner with _id: ', addItemFormData._user);
      try {
        await BackendAPIService.addItem({
          ...addItemFormData,
          _user: auth._id,
        });
        console.log('Item was added');
        //console.log('data: ', addItemFormData);
      } catch (error) {
        console.log('errormessage: ', error);
      }
    } else {
      console.log('The item could not be added');
    }
  };

  return (
    <AppLayout>
      <h1>Lägg till objekt</h1>
      <div>
        {addItemFormData.url && (
          <img src={addItemFormData.url} alt={addItemFormData.name} />
        )}
      </div>
      <br />
      <label>
        Ladda upp bild:
        <br />
        <input type="file" onChange={handleChangeImageFile} />
      </label>
      <br />
      <label>
        {' '}
        Produktnamn:
        <br />
        <input
          type="text"
          required
          onChange={(event) =>
            setAddItemFormData({ ...addItemFormData, name: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        {' '}
        Kategori:
        <br />
        <input
          type="text"
          required
          onChange={(event) =>
            setAddItemFormData({
              ...addItemFormData,
              category: event.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        {' '}
        Objektet kan hämtas från (ort):{' '}
        {/* (i framtiden: lägg till att pricka position på karta, funkar det med a11y?) */}
        <br />
        <input
          type="text"
          required
          onChange={(event) =>
            setAddItemFormData({
              ...addItemFormData,
              position: event.target.value,
            })
          }
        />
      </label>
      <br />
      <button onClick={() => addNewItem()}>Spara</button>
    </AppLayout>
  );
};

export default AddItemView;
