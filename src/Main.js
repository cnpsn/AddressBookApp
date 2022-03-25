import React from 'react'
import MainRouter from './Router/MainRouter'
import GlobalProvider from './Contexts/GlobalContext'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary:"#4C3397",
      surface:"#FFF",
      LightGrey:"#AFA8BA"
    },
};

export default function Main() {
  return (
    <GlobalProvider>
        <PaperProvider theme={theme}>
            <MainRouter/>
        </PaperProvider>
    </GlobalProvider>
  )
}