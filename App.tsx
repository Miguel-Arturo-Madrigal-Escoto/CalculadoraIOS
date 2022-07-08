
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { CalculadoraScreen } from './src/screens/CalculadoraScreen';
import { styles } from './src/theme/appTheme';

export const App = () => {
    return (
      <SafeAreaView style={ styles.fondo }>
        <StatusBar 
          barStyle='light-content'
          backgroundColor='#141428'
        /> 
        <CalculadoraScreen />
      </SafeAreaView>
    )
}