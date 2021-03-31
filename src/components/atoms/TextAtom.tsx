import React from 'react';
import {Text, TextProps, TextStyle, View} from 'react-native';
import {BLACK} from '../../styles/colors';

interface TextAtomProps extends TextProps {
  text: string | number | undefined;
  style?: TextStyle;
}

const TextAtom: React.FC<TextAtomProps> = props => {
  return (
    <View>
      <Text
        {...props}
        maxFontSizeMultiplier={1}
        allowFontScaling={false}
        style={[
          {
            flexShrink: 1,
            flexWrap: 'wrap',
            color: BLACK,
          },
          props.style,
        ]}>
        {props.text}
      </Text>
    </View>
  );
};

export default TextAtom;
