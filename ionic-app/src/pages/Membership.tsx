import React from 'react';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './styling.css';

import { body, thermometer } from 'ionicons/icons';
import { NavLink } from 'react-router-dom';

const Membership: React.FC = () => {
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
            <NavLink to={'/progress'} className="menu-link">
              <IonText>Progress Report</IonText>
              <IonIcon icon={body} className='icon'></IonIcon>
            </NavLink>
          </IonMenuToggle>
          <br /><br />
          <IonMenuToggle autoHide={false}>
            <NavLink to={'/classes'} className="menu-link">
              <IonText>Classes</IonText>
              <IonIcon icon={body} className='icon'></IonIcon>
            </NavLink>
          </IonMenuToggle>
          <br /><br />
          <IonMenuToggle autoHide={false}>
            <NavLink to={'/membership'} className="menu-link">
              <IonText>Membership</IonText>
              <IonIcon icon={body} className='icon'></IonIcon>
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
            <IonTitle>Membership Management</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard className="card">
            <IonGrid>
              <IonRow>
                <IonCol size='3'>
                  <IonText>Name</IonText>
                </IonCol>
                <IonCol size='3'>
                  <IonText>Scheduled time</IonText>
                </IonCol>
                <IonCol size='3'>
                  <IonText>Instructor</IonText>
                </IonCol>
                <IonCol size='3'>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
}
export default Membership;
