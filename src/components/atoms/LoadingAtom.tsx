import * as React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {SECONDARY} from 'src/styles/colors';
import {SCALE_5} from 'src/styles/spacing';

const LoadingAtom: React.FC = ({}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: SCALE_5,
      }}>
      <ActivityIndicator color={SECONDARY} size="large" />
    </View>
  );
};

export default LoadingAtom;
