import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useSelector} from 'react-redux';
import Login from 'src/screens/auth/Login';
import Home from 'src/screens/Home';
import StocksChart from 'src/screens/StocksChart';
import {RootState} from 'src/store/store';
import {PRIMARY, WHITE} from 'src/styles/colors';
import {moderateScale} from 'src/styles/mixins';

interface LayoutProps {}

export type StackParamsList = {
  Login: any;
  Home: any;
  Chart: {symbol: string};
};

const Stack = createStackNavigator<StackParamsList>();

const Layout: React.FC<LayoutProps> = ({}) => {
  const login = useSelector((state: RootState) => state.login);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: PRIMARY,
            height: moderateScale(60, 0.25),
          },
          headerTintColor: WHITE,
        }}>
        {login.login.idToken ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chart" component={StocksChart} />
          </>
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
