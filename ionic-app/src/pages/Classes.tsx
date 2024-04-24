import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './styling.css';
import { body } from 'ionicons/icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Menu from './Menu';

interface ClassItem {
  className: string;
  startTime: number;
  endTime: number;
  instructor: string;
}

const Classes: React.FC = () => {

  
  const fakeClasses: ClassItem[] = [
    {
      className: 'Yoga',
      startTime: 60,
      endTime: 10,
      instructor: 'John Doe'
    },
    {
      className: 'Pilates',
      startTime: 45,
      endTime: 10,

      instructor: 'Jane Smith'
    },
    {
      className: 'Zumba',
      startTime: 60,
      endTime: 10,

      instructor: 'Alice Johnson'
    },
    {
      className: 'Spin',
      startTime: 45,
      endTime: 10,

      instructor: 'Bob Brown'
    },
    {
      className: 'Boxing',
      startTime: 60,
      endTime: 10,

      instructor: 'Chris Davis'
    }
  ];
  const [schedule, setSchedule] = useState<ClassItem[]>(fakeClasses);
  const [classes, setClasses] = useState<ClassItem[]>(fakeClasses);

  function getClasses() {
    axios.get('http://localhost:8000/classes')
      .then(function (response) {
        console.log(response);
        const classData = response.data.map((classItem: ClassItem) => ({
          className: classItem.className,
          time: classItem.startTime,
          instructor: classItem.instructor
        }));
        setClasses(classData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function getSchedule() {
    axios.get('http://localhost:8000/classSchedule')
      .then(function (response) {
        console.log(response);
        const classData = response.data.map((classItem: ClassItem) => ({
          className: classItem.className,
          time: classItem.startTime,
          instructor: classItem.instructor
        }));
        setSchedule(classData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeClass() {
    axios.post('http://localhost:8000/removeClass')
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
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
                      <IonButton color={"danger"}>Delete Class</IonButton>
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
                      <IonText style={{ fontSize: '18px' }}>{classItem.className}</IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText>Start time: {classItem.startTime}</IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText>End time: {classItem.endTime}</IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText>Instructor: {classItem.instructor}</IonText>
                    </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonButton color={"dark"}>Add Class</IonButton>
                    </IonCol>
                  </IonRow>
                </IonCard>
              ))}
            </IonCard>
          </IonGrid>

        </IonContent>
      </IonPage >
    </>
  );
};

export default Classes;
