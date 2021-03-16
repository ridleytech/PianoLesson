import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, Animated} from 'react-native';
import Header from './Header';
import {useSelector, useDispatch} from 'react-redux';
import videoImg from '../../images/instructions-placeholder.png';
import lockIcon from '../../images/lock-icon.png';
import checkIcon from '../../images/check2.png';

import {ScrollView} from 'react-native-gesture-handler';

const ProgressionMenu = ({showLevel}) => {
  var levels = [1, 2, 3, 4, 5, 6, 7];

  const loggedIn = useSelector((state) => state.loggedIn);
  const accessFeature = useSelector((state) => state.accessFeature);
  const dispatch = useDispatch();

  const highestCompletedProgressionLevel = useSelector(
    (state) => state.highestCompletedProgressionLevel,
  );

  const opacity = useState(new Animated.Value(0))[0];

  Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
  }).start();

  return (
    <>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flex: 1,
        }}>
        <Text
          style={{
            fontFamily: 'Helvetica Neue',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#3AB24A',
          }}>
          Progression Training
        </Text>
        {/* <Image source={videoImg} style={styles.video} /> */}
        <Animated.View style={{marginTop: 30, opacity: opacity}}>
          <View
            style={{
              backgroundColor: '#3AB24A',
              height: 65,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                padding: 20,
                textAlign: 'center',
              }}>
              Choose Level
            </Text>
          </View>

          <ScrollView style={{height: '100%'}}>
            {levels.map((level, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    showLevel(level);
                  }}
                  key={index}>
                  <View
                    style={{
                      backgroundColor: '#F6FA43',
                      height: 65,
                      marginBottom: 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        padding: 20,
                        textAlign: 'center',
                      }}>
                      Level {level}
                    </Text>
                  </View>

                  {!loggedIn && accessFeature == 2 ? (
                    <Image
                      source={
                        index < highestCompletedProgressionLevel
                          ? checkIcon
                          : index > 0
                          ? lockIcon
                          : null
                      }
                      style={{position: 'absolute', right: 12, top: 12}}
                    />
                  ) : (
                    <Image
                      source={
                        index < highestCompletedProgressionLevel
                          ? checkIcon
                          : null
                      }
                      style={{position: 'absolute', right: 12, top: 12}}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
            <View style={{height: 270}} />
          </ScrollView>
        </Animated.View>
      </View>
    </>
  );
};

export default ProgressionMenu;
