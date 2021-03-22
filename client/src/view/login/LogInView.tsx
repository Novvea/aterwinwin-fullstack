import styles from './LogInView.module.css'
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import { UserContext } from "../../shared/provider/UserProvider";
import { i_loginCredentials } from '../../shared/interface/Interface'
import BackendAPIService from '../../shared/api/service/BackendAPIService'

export const LogInView = () => {
  const history = useHistory();
  const [authUserContext, setAuthUserContext] = useContext(UserContext);
  const [allUsersFromServer, setAllUsersFromServer] = useState([])
  const [logInFormData, setLogInFormData] = useState<i_loginCredentials>({
    email: "",
    password: ""
  })

  const fetchDataFromServer = async () => {
    const response = await BackendAPIService.getAllUsers()
    const emails = response.data.map((item: any) => item.email)
    console.log('emails', emails)
    setAllUsersFromServer(response.data)
  }

  useEffect(() => {
    fetchDataFromServer()
  }, [])


  const signIn = () => {
    const isUserVerified = allUsersFromServer.find((user: any) => {
      if (user.email === logInFormData.email && user.password === logInFormData.password) {

        setAuthUserContext({
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          password: user.password
        })
        return true
      }
      return false
    })
    if (isUserVerified) {
      history.push(RoutingPath.homeView); /* vi flyttas tillbaka till home-view */
    } else {
      alert('Antingen är din epost eller ditt lösenord fel, testa igen!')
    }
  }



  return (
    <div className="content">
      <h1 className={styles.header}>Logga in här om du vill.</h1>
      <form>
        <label className={styles.label}> E-mail:
          <br />
          <input className={styles.input}
            onChange={(event) =>
              setLogInFormData({
                ...logInFormData,
                email: event.target.value
              })
            }
          />
        </label>
        <br />
        <label className={styles.label}> Lösenord:
          <br />
          <input className={styles.input}
            onChange={(event) =>
              setLogInFormData({
                ...logInFormData,
                password: event.target.value,
              })
            }
          />
        </label>
        <br />
        <button className={styles.button} onClick={signIn}>Logga in</button>
      </form>
      <div className={styles.signupContainer}>
        <label className={styles.label}>Jag har inget konto men skulle gärna vilja </label>
        <button className={styles.button} onClick={() => history.push(RoutingPath.signUpView)}>skapa ett konto</button>
      </div>
    </div >
  );
};

  //Gör egen funktion för att spara logincredentials istället för useState
/*   const formInput = { username: '', password: '' }
  const storeFormInputData = (typetype: string, input: string) => {
   return ({ ...formInput, [typetype]: input })
  } */