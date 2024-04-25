import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './styling.css';
import { body, remove } from 'ionicons/icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Menu from './Menu';

interface ClassItem {
  classID?: number;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  instructor: string;
}

const Classes: React.FC = () => {
  const [schedule, setSchedule] = useState<ClassItem[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState('');

  function getClasses() {
    axios.get('http://localhost:8000/classes')
      .then(function (response) {
        // console.log(response.data);
        setClasses(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function getSchedule() {
    axios.get('http://localhost:8000/schedule/1')
      .then(function (response) {
        console.log(response.data);
        setSchedule(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeClass(classID: string | number | undefined) {
    console.log(classID);
    axios.delete('http://localhost:8000/classes/1/' + classID)
      .then(function (response) {
        console.log(response);
        if(response.data.message == 'Class not found in schedule'){
          setShowToast(true);
          setToastMsg(response.data.message);
        }
        else{
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function addClass(classID: string | number | undefined) {
    console.log(classID);
    axios.post('http://localhost:8000/classes/1/' + classID)
      .then(function (response) {
        console.log(response);
        if (response.data.message == 'Class already added to schedule') {
          setShowToast(true);
          setToastMsg(response.data.message);
        }
        else {
          window.location.reload();
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getClasses();
    getSchedule();
  }, []);
  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Class Schedule</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonCard className='card'>
              <IonRow>
                <IonCol style={{ textAlign: 'center' }}>
                  <IonText style={{ fontSize: '25px' }}>Schedule:</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText> Class </IonText>
                </IonCol>
                <IonCol>
                  <IonText> Start </IonText>
                </IonCol>
                <IonCol>
                  <IonText> End </IonText>
                </IonCol>
                <IonCol>
                  <IonText> Instructor </IonText>
                </IonCol>
                <IonCol>
                </IonCol>
              </IonRow>
              {schedule.map((classItem, index) => (
                <IonRow>
                  <IonCol size='2.4'>
                    <IonItem lines='none'>
                      <IonText>{classItem.className}</IonText>
                    </IonItem>
                  </IonCol>
                  <br />
                  <IonCol size='2.4'>
                    <IonItem lines='none'>
                      <IonText>{classItem.startTime}</IonText>
                    </IonItem>
                  </IonCol>
                  <br />
                  <IonCol size='2.4'>
                    <IonItem lines='none'>
                      <IonText>{classItem.endTime}</IonText>
                    </IonItem>
                  </IonCol>
                  <br />
                  <IonCol size='2.4'>
                    <IonItem lines='none'>
                      <IonText>{classItem.instructor}</IonText>
                    </IonItem>
                  </IonCol>
                  <br></br>
                  <IonCol size='2.4'>
                    <IonItem lines='none'>
                      <IonButton color={"danger"} onClick={() => removeClass(classItem.classID)}>Remove Class</IonButton>
                    </IonItem>
                  </IonCol>
                </IonRow>
              ))}
            </IonCard>
            <br></br>
            <IonCard className='card'>
              <IonRow>
                <IonCol style={{ textAlign: 'center' }}>
                  <IonText style={{ fontSize: '25px' }}>Add Classes:</IonText>
                </IonCol>
              </IonRow>
              {classes.map((classItem, index) => (

                <IonCard className='classes'>
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText style={{ fontSize: '18px' }}><u>{classItem.className}</u></IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText><b>Date:</b> {classItem.date}</IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText><b>Start time:</b> {classItem.startTime}</IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText><b>End time:</b> {classItem.endTime}</IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText><b>Instructor: </b>{classItem.instructor}</IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonButton color={"success"} onClick={() => addClass(classItem.classID)}>Add Class</IonButton>
                    </IonCol>
                  </IonRow>
                </IonCard>
              ))}
            </IonCard>
          </IonGrid>
          <IonToast
            isOpen={showToast} 
            onDidDismiss={() => setShowToast(false)} 
            message={toastMsg}
            duration={2000} 
          />
        </IonContent>
      </IonPage >
    </>
  );
};

export default Classes;
