import * as React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BLACK, GRAY} from 'src/styles/colors';
import {SCALE_10, SCALE_40, SCALE_25} from 'src/styles/spacing';

interface SearchMoleculeProps {
  text: string;
  onChangeSubmit: (text: string) => any;
}

const SearchMolecule: React.FC<SearchMoleculeProps> = props => {
  return (
    <View style={{padding: SCALE_10}}>
      <View
        style={{
          height: SCALE_40,
          backgroundColor: '#f0f0f0',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: SCALE_10,
          borderColor: GRAY,
          borderWidth: 0.5,
        }}>
        <Icon style={{paddingLeft: SCALE_10}} name="search" size={SCALE_25} />
        <TextInput
          style={{
            height: SCALE_40,
            marginLeft: SCALE_10,
            flex: 1,
            color: BLACK,
          }}
          onChangeText={text => props.onChangeSubmit(text)}
          value={props.text}
          placeholderTextColor={GRAY}
          placeholder="Search Stock"
        />
      </View>
    </View>
  );
};

export default SearchMolecule;
