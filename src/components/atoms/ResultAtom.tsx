import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {View, Pressable} from 'react-native';
import {GRAY} from 'src/styles/colors';
import {SCALE_10} from 'src/styles/spacing';
import {FONT_SIZE_20} from 'src/styles/typography';
import TextAtom from './TextAtom';

interface ResultAtomProps {
  data: any;
}

const ResultAtom: React.FC<ResultAtomProps> = props => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Pressable
        onPress={() =>
          navigation.navigate('Chart', {
            symbol: props.data['1. symbol'],
          })
        }
        style={{
          padding: SCALE_10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: GRAY,
          borderBottomWidth: 0.5,
        }}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <TextAtom
            style={{fontWeight: 'bold'}}
            text={props.data['1. symbol']}
          />
          <TextAtom
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{fontStyle: 'italic'}}
            text={props.data['2. name']}
          />
        </View>
        <TextAtom
          style={{fontSize: FONT_SIZE_20, fontWeight: 'bold'}}
          text={props.data['9. matchScore']}
        />
      </Pressable>
    </View>
  );
};

export default ResultAtom;
