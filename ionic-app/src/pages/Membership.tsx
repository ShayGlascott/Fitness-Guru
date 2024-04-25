import React, { useEffect, useState } from 'react';
import { IonAlert, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './styling.css';
import Menu from './Menu';

import { body, thermometer } from 'ionicons/icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Membership: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showErrorTierAlert, setShowErrorTierAlert] = useState(false);
  const [showTierSubscription, setShowTierSubscription] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(0);
  const [selectedTier, setSelectedTier] = useState<number>(-1);
  const currentDate: Date = new Date();
  console.log(currentDate);
  function updateTier() {
    axios.post(`http://localhost:8000/member/0/tier/` + selectedTier)
      .then(function (response) {
        console.log(response.data)

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  function getMember() {
    axios.get(`http://localhost:8000/member/1`)
      .then(function (response) {
        console.log(response.data);
        setUsername(response.data.Name);
        setStartDate(response.data.StartDate);
        setEndDate(response.data.EndDate);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleConfirm = () => {
    console.log('Selected subscription:', selectedSubscription);
    setShowTierSubscription(false);
  };

  useEffect(() => {
    getMember();
  }, [])
  function handleSelectPlan() {

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
                    <IonText>{username}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol size='3'>
                  <IonItem lines='none'>
                    <IonText>{startDate}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol size='3'>
                  <IonItem lines='none'>
                    <IonText>{endDate}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol size='3'>
                  <IonButton color={"success"} onClick={()=> setShowTierSubscription(true)}>Renew</IonButton>
                  {/* <IonButton color={"danger"}>Cancel</IonButton> */}
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
                    <IonText style={{ fontSize: '25px', }}>Silver Tier</IonText>
                    <IonRow >
                      <IonList>
                        <IonItem lines='none'>Access to all basic Fitness Guru services  </IonItem>
                        <IonItem lines='none'>Additional fees for some special programs, such as child fitness</IonItem>
                      </IonList>
                    </IonRow>
                    <IonButton id="select-plan" onClick={handleSelectPlan}>Select Plan</IonButton>
                  </IonCard>
                </IonCol>
                <IonCol style={{ textAlign: 'center' }}>
                  {/* Silver Membership Card */}

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
              </IonRow>
            </IonCard>
          </IonGrid>
          {/* ERROR TIER ALERT */}
          <IonAlert
            isOpen={showErrorTierAlert}
            onDidDismiss={() => setShowErrorTierAlert(false)}
            header="You already have this plan!"
            message="Select another plan or renew/cancel your existing plan"
            buttons={['Cancel']}
          />
          {/* Tier Subscription */}
          <IonAlert
            isOpen={showTierSubscription}
            onDidDismiss={() => setShowTierSubscription(false)}
            header="Select Length of subscription"
            inputs={[
              {
                name: 'radio1',
                type: 'radio',
                label: 'One month',
                value: 'one_month',
                checked: selectedSubscription === 1,
                handler: () => setSelectedSubscription(1),
              },
              {
                name: 'radio2',
                type: 'radio',
                label: 'Three months',
                value: 'three_months',
                checked: selectedSubscription === 3,
                handler: () => setSelectedSubscription(3),
              },
              {
                name: 'radio3',
                type: 'radio',
                label: 'Six months',
                value: 'six_months',
                checked: selectedSubscription === 6,
                handler: () => setSelectedSubscription(6),
              },
            ]}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => setShowTierSubscription(false),
              },
              {
                text: 'Confirm',
                handler: handleConfirm,
              },
            ]}
          />
        </IonContent>
      </IonPage>
    </>
  );
}
export default Membership;
