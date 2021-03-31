import * as React from 'react';
import {Alert, Pressable, View} from 'react-native';
import {PRIMARY, SECONDARY, WHITE} from 'src/styles/colors';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/Ionicons';
import {SCALE_10, SCALE_15, SCALE_30, SCALE_50} from 'src/styles/spacing';
import TextAtom from 'src/components/atoms/TextAtom';
import {FONT_SIZE_20} from 'src/styles/typography';
import {webClient} from 'src/shared/config';
import {useDispatch} from 'react-redux';
import {Post} from 'src/store/services/Login';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    configureSignIn();
  }, []);
  const configureSignIn = () => {
    GoogleSignin.configure({
      webClientId: webClient,
      offlineAccess: false,
    });
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(Post(userInfo));
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable
        onPress={signIn}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: SCALE_50,
          backgroundColor: SECONDARY,
          paddingVertical: SCALE_10,
          paddingHorizontal: SCALE_15,
        }}>
        <Icon name="logo-google" color={WHITE} size={SCALE_30} />
        <TextAtom
          text="Sign In With Google"
          style={{
            fontSize: FONT_SIZE_20,
            color: WHITE,
            paddingHorizontal: SCALE_10,
          }}
        />
      </Pressable>
    </View>
  );
};

export default Login;
