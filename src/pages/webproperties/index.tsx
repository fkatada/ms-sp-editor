import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import WebPropertiesCommands from './components/commands'
import WebPropertiesEditPanel from './components/editpanel'
import WebPropertiesNewPanel from './components/newpanel'
import WebPropertiesList from './components/webpropertieslist'

const WebProperties = () => {
  return (
    <IonPage>
      <Header title={'Web Properties'} showOnLoad={false} headline='' content=''/>
      {/* Actions menu */}
      <WebPropertiesCommands />
      <IonContent>
        <LoadingSpinner />
        {/* List of web properties */}
        <WebPropertiesList />
        {/* Panel to edit web property */}
        <WebPropertiesEditPanel />
        {/* Panel to create new web property */}
        <WebPropertiesNewPanel />
      </IonContent>
    </IonPage>
  )
}

export default WebProperties
