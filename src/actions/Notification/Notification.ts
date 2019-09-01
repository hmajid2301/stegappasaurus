import { PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";

PushNotification.configure({
  onNotification: notification => {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  }
});

export default PushNotification;
