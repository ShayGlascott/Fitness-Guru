import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './styling.css';
import { NavLink } from 'react-router-dom';
import { body, magnet } from 'ionicons/icons';
import axios from 'axios';
import { useState } from 'react';

const ProgessReport: React.FC = () => {
  
  interface ProgressItem{
    date: Date;
    timeAtGym: String;
    
  }
  const [progress, setProgress] = useState<ProgressItem[]>([])

  function getProgress() {
    axios.get('http://localhost:8000/progress')
      .then(function (response) {
        console.log(response);
      });

  }


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
            <IonTitle>Progress Report</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard className="card">
            <IonGrid>
              <IonRow>
                <IonCol size='3'>
                  <IonText>Date</IonText>
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
              {/* {classes.map((classItem, index) => (
                <IonRow>
                  <IonCol size='3'>
                    <IonItem>
                      <IonText>{classItem.className}</IonText>
                    </IonItem>
                  </IonCol>
                  <br />
                  <IonCol size='3'>
                    <IonItem>
                      <IonText>{classItem.time}</IonText>
                    </IonItem>
                  </IonCol>
                  <br />
                  <IonCol size='3'>
                    <IonItem>
                      <IonText>{classItem.instructor}</IonText>
                    </IonItem>
                  </IonCol>
                  <br></br>
                  <IonCol size='3'>
                    <IonItem>
                      <IonButton color={"dark"}>Add Class</IonButton>
                    </IonItem>
                  </IonCol>
                </IonRow>
              ))} */}
            </IonGrid>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ProgessReport;
