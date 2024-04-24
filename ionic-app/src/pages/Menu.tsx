import React from 'react';
import { IonContent, IonHeader, IonMenu, IonMenuToggle, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { NavLink } from 'react-router-dom';
import './styling.css';

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fitness Guru</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonMenuToggle autoHide={false}>
          <NavLink to={'/progress'} className="menu-link">
            <IonText color={"dark"} className="menu-link">Progress Report</IonText>
          </NavLink>
        </IonMenuToggle>
        <br /><br />
        <IonMenuToggle autoHide={false}>
          <NavLink to={'/classes'} className="menu-link">
            <IonText color={"dark"} className="menu-link">Classes</IonText>
          </NavLink>
        </IonMenuToggle>
        <br /><br />
        <IonMenuToggle autoHide={false}>
          <NavLink to={'/membership'} className="menu-link">
            <IonText color={"dark"} className="menu-link">Membership</IonText>
          </NavLink>
        </IonMenuToggle>
        <br></br>
      </IonContent>
    </IonMenu>
  );
}

export default Menu;