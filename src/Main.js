import React from 'react'
import MainRouter from './Router/MainRouter'
import GlobalProvider from './Contexts/GlobalContext'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary:"#5C3CBB",
      surface:"#FFF",
      black:"#4A4453",
      gray:"#7B7485",
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