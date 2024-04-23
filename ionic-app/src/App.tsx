import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonNavLink,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, man, square, triangle } from 'ionicons/icons';
import ProgessReport from './pages/ProgressReport';
import Classes from './pages/Classes';
import Membership from './pages/Membership';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonNavLink>
        <IonRouterOutlet>
          <Route exact path="/progress">
            <ProgessReport />
          </Route>
          <Route exact path="/classes">
            <Classes />
          </Route>
          <Route path="/membership">
            <Membership />
          </Route>
          <Route exact path="/">
            <Redirect to="/progress" />
          </Route>
        </IonRouterOutlet>
      </IonNavLink>
    </IonReactRouter>
  </IonApp>
);

export default App;
