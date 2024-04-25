import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './styling.css';
import { NavLink } from 'react-router-dom';
import { body, magnet } from 'ionicons/icons';
import axios from 'axios';
import { useState } from 'react';
import Menu from './Menu';
import { Line } from 'react-chartjs-2';


interface ProgressGraphProps {
  data: ProgressItem[]; 
}

interface ProgressItem {
  exercise: string;
  time?: number;
  calories?: number;
  heartRate?: number;
}


const ProgessReport: React.FC = () => {
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [memberId, setMemberId] = useState<Number>(1);
  function getProgress() {
    axios.get('http://localhost:8000/progress/' + memberId)
      .then(function (response) {
        console.log(response);
        setProgress(response.data)
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
            <IonTitle>Progress Report</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* Enter exercise card */}
          <IonCard className="card">
            <IonGrid>
              <IonRow>
                <IonCol >
                  <IonText>Exercise</IonText>
                </IonCol>
                <IonCol >
                  <IonText>Start Time</IonText>
                </IonCol>
                <IonCol >
                  <IonText>End Time</IonText>
                </IonCol>
                <IonCol >
                  <IonText>Distance (miles)</IonText>
                </IonCol>
                <IonCol >
                  <IonText>Calories</IonText>
                </IonCol>
                <IonCol >
                  <IonText>Heart Rate (bpm)</IonText>
                </IonCol>
                <IonCol >
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol >
                  <IonSelect placeholder="no selection">
                    <IonSelectOption value="running">Running</IonSelectOption>
                    <IonSelectOption value="cycling">Cycling</IonSelectOption>
                    <IonSelectOption value="elliptical">Elliptical</IonSelectOption>
                  </IonSelect>
                </IonCol>
                <IonCol >
                  <IonInput
                    type="time"
                    placeholder="Select Start Time"
                    value={startTime}
                    onIonChange={(e) => setStartTime(e.detail.value!)}
                  />
                </IonCol>
                <IonCol >
                  <IonInput
                    type="time"
                    placeholder="Select End Time"
                    value={endTime}
                    onIonChange={(e) => setEndTime(e.detail.value!)}
                  />
                </IonCol>
                <IonCol >
                  <IonInput type='number' id='distance' placeholder='0'></IonInput>
                </IonCol>
                <IonCol >
                  <IonInput type='number' id='calories' placeholder='0'></IonInput>
                </IonCol>
                <IonCol >
                  <IonInput type='number' id='heartRate' placeholder='0'></IonInput>
                </IonCol>
                <IonCol >
                  <IonButton color={"success"}>Add</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          <IonCard className='card'>
            <IonRow>
              <IonCol style={{textAlign: "center"}}>
                <h1>Graphs</h1>          

              </IonCol>
            </IonRow>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ProgessReport;
