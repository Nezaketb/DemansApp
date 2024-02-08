/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import notifee from '@notifee/react-native';

// async function setupChannels() {
//     await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });
//   }
  
//   setupChannels();

const MyHeadlessTask = async (event) => {
    const taskId = event.taskId;
    const isTimeout = event.timeout; 

    if (isTimeout) {
        console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
        BackgroundFetch.finish(taskId);
        return;
      }
    
      console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
    
    BackgroundTimer.runBackgroundTimer(() => {
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
  
      // Bildirim gönderme zamanını kontrol edin (Örneğin, 08:00'de)
      if (currentHour === 2 && currentMinute === 35) {
        // Bildirim oluşturun ve gönderin
        notifee.displayNotification({
          title: 'İlaç Zamanı!',
          body: 'İlacınızı almayı unutmayın!',
          android: {
            channelId: 'medicine-channel-id',
          },
          ios: {
            sound: 'default',
          },
        });
      }
    }, Platform.OS === 'ios' ? 60000 : 10000); // iOS'ta her dakika, Android'de her 10 saniyede bir kontrol edilir.
  };

  BackgroundFetch.configure({
    minimumFetchInterval: 15,
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true,
    forceAlarmManager: true,
  }, MyHeadlessTask, (error) => {
    console.error('[BackgroundFetch] configure error:', error);
  });

AppRegistry.registerComponent(appName, () => App);
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
