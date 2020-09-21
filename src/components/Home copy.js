import React, {Component, useState} from 'react';
import {StyleSheet, NativeModules, SafeAreaView} from 'react-native';
var testView = NativeModules.PlayKey;
import {connect} from 'react-redux';
import Header from './Header';
import IntervalLevel1 from './IntervalLevel1';
import IntervalLevel2 from './IntervalLevel2';
import IntervalLevel3 from './IntervalLevel3';
//import PlayerMidi from './PlayerMidi';
import TestMidi from './TestMidi';
import Menu from './Menu';
import {setLevel} from '../actions/';
import IntervalLevel4 from './IntervalLevel4';
import IntervalLevel5 from './IntervalLevel5';
//https://www.npmjs.com/package/react-native-check-box

//cant update git

//var testView = NativeModules.PlayKey;

class Home extends Component<Props> {
  constructor(props: Props) {
    super(props);

    //console.log('home props: ' + JSON.stringify(props));
  }

  componentDidMount() {
    // testView.initGraph('url').then((result) => {
    //   console.log('show', result);
    // });
  }

  showLevel = (level) => {
    //console.log('showLevel2: ' + level);

    this.props.setLevel(level);
  };

  showMenu = () => {
    console.log('showMenu');
  };

  goBack = () => {
    console.log('go back');
  };

  render() {
    return (
      <>
        <SafeAreaView />

        <Header props={this.props} />
        {/* <TestMidi /> */}
        {/* <Player2 tracks={TRACKS} /> */}
        {this.props.level == 0 ? (
          <Menu showLevel={this.showLevel} />
        ) : this.props.level == 1 ? (
          <IntervalLevel1 />
        ) : this.props.level == 2 ? (
          <IntervalLevel2 />
        ) : this.props.level == 3 ? (
          <IntervalLevel3 />
        ) : this.props.level == 4 ? (
          <IntervalLevel5 />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    level: state.level,
  };
};

export default connect(mapStateToProps, {setLevel})(Home);

let offset = 100;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  checkbox: {
    alignSelf: 'center',
  },
  previewBtn: {
    marginTop: 50,
  },
  whiteKeys: {
    marginTop: 140,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  blackKeys: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon2: {
    position: 'absolute',
    left: 30 + offset,
    zIndex: 1,
  },
  icon3: {
    position: 'absolute',
    left: 78 + offset,
    zIndex: 1,
  },
  icon4: {
    position: 'absolute',
    left: 173 + offset,
    zIndex: 1,
  },
  icon5: {
    position: 'absolute',
    left: 222 + offset,
    zIndex: 1,
  },
  icon6: {
    position: 'absolute',
    left: 270 + offset,
    zIndex: 1,
  },
  above: {
    position: 'absolute',
    left: 320,
    zIndex: 3,
  },
});
