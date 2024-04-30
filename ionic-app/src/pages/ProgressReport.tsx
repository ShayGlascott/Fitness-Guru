import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './styling.css';
import Menu from './Menu';

interface ProgressItem {
  Date: string;
  StartTime: string;
  EndTime: string;
  Distance: number;
  Calories: number;
  Heartrate: number;
  Exercise: string;
}

const ProgressReport: React.FC = () => {
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);
  const [exercise, setExercise] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [distance, setDistance] = useState<number | undefined>();
  const [calories, setCalories] = useState<number | undefined>();
  const [heartrate, setHeartrate] = useState<number | undefined>();
  const memberId = 1;

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = () => {
    axios.get(`http://localhost:8000/progress/${memberId}`)
      .then(response => {
        setProgressItems(response.data);
      })
      .catch(error => console.error("There was an error fetching the progress data:", error));
  };

  const postProgress = () => {
    const exerciseValue = document.getElementById('exercise') as HTMLInputElement;
    const startTimeValue = document.getElementById('startTime') as HTMLInputElement;
    const endTimeValue = document.getElementById('endTime') as HTMLInputElement;
    const distanceValue = document.getElementById('distance') as HTMLInputElement;
    const caloriesValue = document.getElementById('calories') as HTMLInputElement;
    const heartrateValue = document.getElementById('heartrate') as HTMLInputElement;

    const exercise = exerciseValue.value;
    const startTime = startTimeValue.value;
    const endTime = endTimeValue.value;
    const distance = parseFloat(distanceValue.value);
    const calories = parseInt(caloriesValue.value, 10);
    const heartrate = parseInt(heartrateValue.value, 10);

    console.log("Exercise:", exercise);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Distance:", distance);
    console.log("Calories:", calories);
    console.log("Heart Rate:", heartrate);

    if (!exercise || !startTime || !endTime || !distance || !calories || !heartrate) {
      console.error("All fields must be filled");
      return;
    }

    const progressData = {
      StartTime: startTime,
      EndTime: endTime,
      Distance: distance,
      Calories: calories,
      Heartrate: heartrate,
      Exercise: exercise
    };

    axios.post(`http://localhost:8000/progress`, progressData, {
      params: { member_id: memberId }
    })
      .then(() => {
        fetchProgress(); 
        console.log("Progress added successfully");
      })
      .catch(error => console.error("Failed to post progress:", error));
  };

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Progress Report</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard className="card">
            <IonGrid>
              <IonRow>
                <IonCol><IonText>Exercise</IonText></IonCol>
                <IonCol><IonText>Start Time</IonText></IonCol>
                <IonCol><IonText>End Time</IonText></IonCol>
                <IonCol><IonText>Distance (miles)</IonText></IonCol>
                <IonCol><IonText>Calories</IonText></IonCol>
                <IonCol><IonText>Heart Rate (bpm)</IonText></IonCol>
                <IonCol />
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonSelect id="exercise" placeholder="Select Exercise" value={exercise}>
                    <IonSelectOption value="running">Running</IonSelectOption>
                    <IonSelectOption value="cycling">Cycling</IonSelectOption>
                    <IonSelectOption value="elliptical">Elliptical</IonSelectOption>
                  </IonSelect>
                </IonCol>
                <IonCol>
                  <IonInput id="startTime" type="time" placeholder="Select Start Time" value={startTime} />
                </IonCol>
                <IonCol>
                  <IonInput id="endTime" type="time" placeholder="Select End Time" value={endTime} />
                </IonCol>
                <IonCol>
                  <IonInput id="distance" type='number' placeholder='0' value={distance} />
                </IonCol>
                <IonCol>
                  <IonInput id="calories" type='number' placeholder='0' value={calories} />
                </IonCol>
                <IonCol>
                  <IonInput id="heartrate" type='number' placeholder='0' value={heartrate} />
                </IonCol>
                <IonCol>
                  <IonButton color="success" onClick={postProgress}>Add</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>

          <IonCard className="card">
            <IonGrid>
              <IonRow>
                <IonCol><IonText>Date</IonText></IonCol>
                <IonCol><IonText>Start Time</IonText></IonCol>
                <IonCol><IonText>End Time</IonText></IonCol>
                <IonCol><IonText>Distance</IonText></IonCol>
                <IonCol><IonText>Calories</IonText></IonCol>
                <IonCol><IonText>Heart Rate</IonText></IonCol>
                <IonCol><IonText>Exercise</IonText></IonCol>
              </IonRow>
              {progressItems.map((item, index) => (
                <IonRow key={index}>
                  <IonCol>{item.Date}</IonCol>
                  <IonCol>{item.StartTime}</IonCol>
                  <IonCol>{item.EndTime}</IonCol>
                  <IonCol>{item.Distance}</IonCol>
                  <IonCol>{item.Calories}</IonCol>
                  <IonCol>{item.Heartrate}</IonCol>
                  <IonCol>{item.Exercise}</IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ProgressReport;
