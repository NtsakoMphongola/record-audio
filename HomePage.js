import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View} from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

export default function HomePage() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync( Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY );
        setRecording(recording);
      } else {
        setMessage("Please grant permission to access microphone");
      }
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });
    setRecordings(updatedRecordings);
  }
  
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
  
  const deleteRecording = (index) => {
    let updatedRecordings = [...recordings];
    updatedRecordings.splice(index, 1);
    setRecordings(updatedRecordings);
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1}  {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play" color="gold" />
          <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share" color="blue" />
          <Button style={styles.button} onPress={() => deleteRecording(index)} title='Delete' color="red" />
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.txtTitle}> You may start recording </Text>
       <Text>{message}</Text>
        <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
        {getRecordingLines()}
        <StatusBar style="auto" />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddcdcd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    padding: 40,
    borderRadius: 25,
    backgroundColor: '#dddddd',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    fontSize: 20,
    margin: 25,
    padding: 7,
    borderRadius: 5,
    backgroundColor: '#bbcdcd',
  },
  button: {
    margin: 16,
    padding: 7,   
  },
  txtTitle: {
    padding: 20,
    margin: 9,
    paddingVertical: 15,
    fontSize: 28,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    // backgroundColor: '#cdcdcd'
  }
});
