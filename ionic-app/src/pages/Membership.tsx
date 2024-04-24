import React, { useState } from 'react';
import { IonAlert, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './styling.css';
import Menu from './Menu'; // Import the Menu component

import { body, thermometer } from 'ionicons/icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

interface UserStatus {
  name: string;
  startDate: string;
  endDate: string;
}

const Membership: React.FC = () => {
  const [userStatus, setUserStatus] = useState<UserStatus | undefined>(undefined);
  const [showTierAlert, setShowTierAlert] = useState(false);


  function updateTier(tier: string){
    axios.put('http://localhost:8000/updateTier')
      .then(function(response){
        console.log(response.data);
        
      })
      .catch(function(error){
        console.log(error);
      });

  }


  return (
    <>
      <Menu />
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
          {/* User Status Card */}
          <IonCard className="card">
            <IonGrid>
              <IonRow>
                <IonCol size='3'>
                  <IonText>Name</IonText>
                </IonCol>
                <IonCol size='3'>
                  <IonText>Start date</IonText>
                </IonCol>
                <IonCol size='3'>
                  <IonText>End date</IonText>
                </IonCol>
                <IonCol size='3'>
                </IonCol>
              </IonRow>
              <IonRow >
                <IonCol size='3'>
                  <IonItem lines='none'>
                    <IonText>{userStatus?.name}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol size='3'>
                  <IonItem lines='none'>
                    <IonText>{userStatus?.startDate}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol size='3'>
                  <IonItem lines='none'>
                    <IonText>{userStatus?.endDate}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol size='3'>
                  <IonButton color={"success"}>Renew</IonButton>
                  <IonButton color={"danger"}>Cancel</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          <IonGrid>
            {/* Gold Membership Card */}
            <IonCard className='card'>
              <IonRow>
                <IonCol style={{ textAlign: 'center' }}>
                  <IonCard >
                    <IonText style={{ fontSize: '25px', }}>Gold Tier</IonText>
                    <IonRow >
                      <IonList>
                        <IonItem lines='none'>Unlimited use of all services </IonItem>
                        <IonItem lines='none'>Access to personalized training</IonItem>
                        <IonItem lines='none'>Complimentary access to most amenities</IonItem>
                      </IonList>
                    </IonRow>
                    <IonButton id="select-plan">Select Plan</IonButton>
                  </IonCard>
                </IonCol>
                <IonCol style={{ textAlign: 'center' }}>
                  {/* Silver Membership Card */}
                  <IonCard >
                    <IonText style={{ fontSize: '25px', }}>Silver Tier</IonText>
                    <IonRow >
                      <IonList>
                        <IonItem lines='none'>Access to all basic Fitness Guru services  </IonItem>
                        <IonItem lines='none'>Additional fees for some special programs, such as child fitness</IonItem>
                      </IonList>
                    </IonRow>
                    <IonButton id="select-plan">Select Plan</IonButton>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonCard>
          </IonGrid>
          {/* TIER ALERT */}
          <IonAlert
            isOpen={showTierAlert}
            onDidDismiss={() => setShowTierAlert(false)} 
            header="You already have this plan!"
            message="Select another plan or renew/cancel your existing plan"
            buttons={['Cancel']}
          />
        </IonContent>
      </IonPage>
    </>
  );
}
export default Membership;
