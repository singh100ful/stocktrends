import * as React from 'react';
import {View, Pressable, Platform, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PRIMARY, WHITE} from 'src/styles/colors';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackParamsList} from 'src/layout/Layout';
import {SCALE_25, SCALE_65} from 'src/styles/spacing';
import {Delete} from 'src/store/services/Login';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import debounce from 'lodash.debounce';
import {getSearch} from 'src/store/services/Search';
import {RootState} from 'src/store/store';
import TextAtom from 'src/components/atoms/TextAtom';
import SearchMolecule from 'src/components/molecule/SearchMolecule';
import ResultAtom from 'src/components/atoms/ResultAtom';
import LoadingAtom from 'src/components/atoms/LoadingAtom';
import {FONT_SIZE_16} from 'src/styles/typography';

interface HomeProps {
  navigation: NavigationProp<StackParamsList, 'Home'>;
}

const Home: React.FC<HomeProps> = props => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [error, setError] = React.useState('');
  const [text, setText] = React.useState('');
  const legacyAuth = () => Platform.Version < 23;
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search);

  React.useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => dispatch(Delete())}
          style={{paddingHorizontal: 10}}>
          <Icon name="log-out-outline" color={WHITE} size={SCALE_25} />
        </Pressable>
      ),
    });
  }, []);

  const authenticate = () => {
    setAuthenticated(true);
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: () => setError('Authentication Error'),
    })
      .then(() => {
        authenticate();
      })
      .catch(error => {
        console.log('Authentication Error: ', error);
      });
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({
      description: 'Scan your fingerprint on the device scanner to continue',
      title: 'Log in with Biometrics',
    }).then(() => authenticate());
  };

  const initiateBiometric = () => {
    if (legacyAuth()) {
      authLegacy();
    } else {
      authCurrent();
    }
  };

  const searchStocks = () => {
    dispatch(getSearch(text));
  };

  const debounceSearch = debounce(searchStocks, 250);

  const onChangeSubmit = (text: string) => {
    setText(text);
    debounceSearch();
  };

  if (!authenticated) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: PRIMARY,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name="finger-print"
          onPress={() => initiateBiometric()}
          size={SCALE_65}
          color={WHITE}
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <SearchMolecule
        text={text}
        onChangeSubmit={text => onChangeSubmit(text)}
      />
      <ScrollView>
        {search.loading ? (
          <LoadingAtom />
        ) : search.search ? (
          search.search.map((data: any, index: number) => {
            return <ResultAtom data={data} key={index} />;
          })
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TextAtom
              style={{fontSize: FONT_SIZE_16}}
              text="No results found"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
