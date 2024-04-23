import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './styling.css';
import { body } from 'ionicons/icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';



const Classes: React.FC = () => {

  interface ClassItem {
    className: string;
    startTime: number;
    endTime: number;
    instructor: string;
  }
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
            <IonTitle>Class Schedule</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard className="card">
            <IonGrid>
              <IonRow>
                <IonCol size='2.4'>
                  <IonText>Name</IonText>
                </IonCol>
                <IonCol size='2.4'>
                  <IonText>Start time</IonText>
                </IonCol>
                <IonCol size='2.4'>
                  <IonText>End time</IonText>
                </IonCol>
                <IonCol size='2.4'>
                  <IonText>Instructor</IonText>
                </IonCol>
                <IonCol size='2.4'>
                </IonCol>
              </IonRow>

              

              {classes.map((classItem, index) => (
                <IonRow>
                  <IonCol size='2.4'>
                    <IonItem>
                      <IonText>{classItem.className}</IonText>
                    </IonItem>
                  </IonCol>
                  <br />
                  <IonCol size='2.4'>
                    <IonItem>
                      <IonText>{classItem.startTime}</IonText>
                    </IonItem>
                  </IonCol>
                  <br />
                  <IonCol size='2.4'>
                    <IonItem>
                      <IonText>{classItem.endTime}</IonText>
                    </IonItem>
                  </IonCol>
                  <br />
                  <IonCol size='2.4'>
                    <IonItem>
                      <IonText>{classItem.instructor}</IonText>
                    </IonItem>
                  </IonCol>
                  <br></br>
                  <IonCol size='2.4'>
                    <IonItem>
                      <IonButton color={"dark"}>Add Class</IonButton>
                    </IonItem>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Classes;
