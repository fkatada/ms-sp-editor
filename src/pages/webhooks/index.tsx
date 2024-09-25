import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import WebhooksCommands from './components/commands'
import WebHookEditPanel from './components/editpanel'
import WebhooksNewPanel from './components/newpanel'
import WebHooksList from './components/webhookslist'

const Webhooks = () => {
  return (
    <IonPage>
      <Header title={"Webhooks"} showOnLoad={false} headline='Header here' content='instructions here'/>
      {/* Actions menu */}
      <WebhooksCommands />
      <IonContent>
        <LoadingSpinner />
        {/* List of webhooks */}
        <WebHooksList />
        {/* Panel to edit webhook */}
        <WebHookEditPanel />
        {/* Panel to create new webhook */}
        <WebhooksNewPanel />
      </IonContent>
    </IonPage>
  );
};

export default Webhooks
