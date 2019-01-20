import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { Icon } from 'native-base';
import Markdown from 'react-native-simple-markdown';

import styles from './styles';


export default class TermsOfUse extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType='slide'
          onRequestClose={() => this.setModalVisible(false)}
          transparent={false}
          visible={this.state.modalVisible}
        >

          <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
            <Icon
              style={styles.icons}
              name='close'
              type='EvilIcons'
            />
          </TouchableOpacity>

          <ScrollView>
            <View style={styles.container}>
              <Markdown styles={styles.markdown}>
                #Terms & Conditions {'\n\n'}

                Last revised on 01/02/2019 {'\n\n'}

                By downloading or using the app, these terms will automatically apply to you – you
                should make sure therefore that you read them carefully before using the app.
                You’re not allowed to copy, or modify the app, any part of the app, or our
                trademarks in any way. You’re not allowed to attempt to extract the source
                code of the app, and you also shouldn’t try to translate the app into other
                languages, or make derivative versions. The app itself, and all the trade marks,
                copyright, database rights and other intellectual property rights related to it,
                still belong to. {'\n\n'}

                is committed to ensuring that the app is as useful and efficient as possible.
                For that reason, we reserve the right to make changes to the app or to charge
                for its services, at any time and for any reason. We will never charge you
                for the app or its services without making it very clear to you exactly what
                you’re paying for. {'\n\n'}

                The Stegappasaurus app stores and processes personal data that you have provided
                to us, in order to provide my Service. It’s your responsibility to keep your
                phone and access to the app secure. We therefore recommend that you do not
                jailbreak or root your phone, which is the process of removing software restrictions
                and limitations imposed by the official operating system of your device. It could
                make your phone vulnerable to malware/viruses/malicious programs, compromise your
                phone’s security features and it could mean that the Stegappasaurus app won’t work
                properly or at all. {'\n\n'}

                You should be aware that there are certain things that will not take responsibility
                for. Certain functions of the app will require the app to have an active internet
                connection. The connection can be Wi-Fi, or provided by your mobile network
                provider, but cannot take responsibility for the app not working at full
                functionality if you don’t have access to Wi-Fi, and you don’t have any of your
                data allowance left. {'\n\n'}

                If you’re using the app outside of an area with Wi-Fi, you should remember that
                your terms of the agreement with your mobile network provider will still apply.
                As a result, you may be charged by your mobile provider for the cost of data for
                the duration of the connection while accessing the app, or other third party
                charges. In using the app, you’re accepting responsibility for any such charges,
                including roaming data charges if you use the app outside of your home
                territory (i.e. region or country) without turning off data roaming. If you are
                not the bill payer for the device on which you’re using the app, please be aware
                that we assume that you have received permission from the bill payer for using the
                app. {'\n\n'}

                Along the same lines, cannot always take responsibility for the way you use the
                app i.e. You need to make sure that your device stays charged – if it runs out
                of battery and you can’t turn it on to avail the Service, cannot accept
                responsibility. {'\n\n'}

                With respect to ’s responsibility for your use of the app, when you’re using the
                app, it’s important to bear in mind that although we endeavour to ensure that
                it is updated and correct at all times, we do rely on third parties to provide
                information to us so that we can make it available to you. accepts no liability
                for any loss, direct or indirect, you experience as a result of relying wholly
                on this functionality of the app. {'\n\n'}

                At some point, we may wish to update the app. The app is currently available
                on Android & iOS – the requirements for both systems(and for any additional
                systems we decide to extend the availability of the app to) may change, and
                you’ll need to download the updates if you want to keep using the app. does
                not promise that it will always update the app so that it is relevant to you
                and/or works with the Android & iOS version that you have installed on your device.
                However, you promise to always accept updates to the application when offered to
                you, We may also wish to stop providing the app, and may terminate use of it at any
                time without giving notice of termination to you. Unless we tell you otherwise,
                upon any termination, (a) the rights and licenses granted to you in these terms
                will end; (b) you must stop using the app, and (if needed) delete it from your
                device. {'\n\n'}

                ##Changes to This Terms and Conditions {'\n\n'}

                I may update our Terms and Conditions from time to time. Thus, you are advised
                to review this page periodically for any changes. I will notify you of any
                changes by posting the new Terms and Conditions on this page. These changes
                are effective immediately after they are posted on this page. {'\n\n'}

                ##Contact Us {'\n\n'}

                If you have any questions or suggestions about my Terms and Conditions, do not
                hesitate to contact me. {'\n\n'}

                This Terms and Conditions page was generated by
                [App Privacy Policy Generator](https://app-privacy-policy-generator.firebaseapp.com/)
              </Markdown>

            </View>
          </ScrollView>
        </Modal>

        <TouchableOpacity onPress={() => { this.setModalVisible(true); }}>
          <Text style={styles.text}>Terms Of Use</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
