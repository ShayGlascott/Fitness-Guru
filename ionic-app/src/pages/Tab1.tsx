import { IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { NavLink } from 'react-router-dom';
import { body, magnet } from 'ionicons/icons';
import axios from 'axios';

function getProgress(){
  axios.get('http://localhost:8000/progress')
    .then(function (response) {
      console.log(response);
    });

}

const Tab1: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Fitness Guru</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle autoHide={false}> 
            <NavLink to={'/tab1'} className="menu-link">
              <IonText>Progress Report</IonText>
              <IonIcon icon={body} className='icon'></IonIcon>
            </NavLink>
          </IonMenuToggle>
          <br /><br />
          <IonMenuToggle autoHide={false}> 
            <NavLink to={'/tab2'} className="menu-link">
              tab2
            </NavLink>
          </IonMenuToggle>
          <br /><br />
          <IonMenuToggle autoHide={false}> 
            <NavLink to={'/tab3'} className="menu-link">
              tab3
            </NavLink>
          </IonMenuToggle>
          <br></br>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent>
      </IonPage>
    </>
  );
};

export default Tab1;
