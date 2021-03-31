import {RouteProp} from '@react-navigation/core';
import * as React from 'react';
import {Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoadingAtom from 'src/components/atoms/LoadingAtom';
import TextAtom from 'src/components/atoms/TextAtom';
import {StackParamsList} from 'src/layout/Layout';
import {getStocks} from 'src/store/services/Stocks';
import {RootState} from 'src/store/store';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-responsive-linechart';
import {BLACK, CHART, GRAY, WHITE} from 'src/styles/colors';
import {SCALE_10, SCALE_3, SCALE_5} from 'src/styles/spacing';
import {FONT_SIZE_18} from 'src/styles/typography';

interface StocksChartProps {
  route: RouteProp<StackParamsList, 'Chart'>;
}

const filter = [
  {name: 'Daily', short: 'Dly', value: 'TIME_SERIES_DAILY'},
  {name: 'Weekly', short: 'Wkly', value: 'TIME_SERIES_WEEKLY'},
  {name: 'Monthly', short: 'Mtly', value: 'TIME_SERIES_MONTHLY'},
];

const StocksChart: React.FC<StocksChartProps> = props => {
  const stocks = useSelector((state: RootState) => state.stocks);
  const dispatch = useDispatch();
  const [time, setTime] = React.useState('TIME_SERIES_DAILY');

  const fetchStocks = () => {
    let data = {
      type: time,
      symbol: props.route.params.symbol,
    };

    dispatch(getStocks(data));
  };

  React.useEffect(() => {
    fetchStocks();
  }, [time]);

  const found = filter.find(element => {
    if (element.value === time) {
      return element.name;
    }
  });

  const convertDate = (date: any) => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var format = new Date(date);
    var day = format.getDate();
    var month = months[format.getMonth()];
    var year = format.getFullYear();
    const formatted_date = day + '/' + month + '/' + year;
    return formatted_date;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: SCALE_5,
        }}>
        <TextAtom
          style={{fontSize: FONT_SIZE_18, fontWeight: 'bold'}}
          text={props.route.params.symbol + ' stock price by ' + found?.name}
        />
        <TextAtom text="Using Ordinal X-axis" />
      </View>
      <View style={{flexDirection: 'row', padding: SCALE_5}}>
        <View>
          <TextAtom text="Zoom :" />
        </View>
        {filter.map((data, index: number) => {
          return (
            <Pressable
              key={index}
              onPress={() => setTime(data.value)}
              style={{
                paddingHorizontal: SCALE_10,
                backgroundColor: GRAY,
                marginHorizontal: SCALE_5,
              }}>
              <TextAtom
                style={{
                  color: time === data.value ? BLACK : WHITE,
                  fontWeight: time === data.value ? 'bold' : '500',
                }}
                text={data.short}
              />
            </Pressable>
          );
        })}
      </View>
      {stocks.loading ? (
        <LoadingAtom />
      ) : stocks.stocks ? (
        <View>
          <Chart
            style={{height: '90%', width: '100%'}}
            data={stocks.stocks}
            padding={{left: 40, bottom: 20, right: 20, top: 20}}>
            <VerticalAxis
              tickCount={11}
              theme={{labels: {formatter: v => v.toFixed(2)}}}
            />
            <HorizontalAxis
              tickCount={5}
              theme={{labels: {formatter: date => convertDate(date)}}}
            />
            <Area
              theme={{
                gradient: {
                  from: {color: CHART},
                  to: {color: CHART, opacity: 0.4},
                },
              }}
            />
            <Line
              theme={{
                stroke: {color: CHART, width: SCALE_3},
              }}
            />
          </Chart>
        </View>
      ) : (
        <View>
          <TextAtom text="No Data Available" />
        </View>
      )}
    </View>
  );
};

export default StocksChart;
