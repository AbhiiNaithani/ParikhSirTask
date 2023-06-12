import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from './src/navigation/MainContainer';
import { SafeAreaView } from 'react-native';
import Context from './src/store/state/Context';

export default function App() {
  return (
    <Context>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden style='light' />

        <MainContainer />

      </SafeAreaView>
    </Context>
  );
}

const styles = StyleSheet.create({

}); 
