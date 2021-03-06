import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

// Import the extensions array
import * as ExtensionList from '../extensions/extensionOverview';

import {colors} from '../extensions/wizerCore';

class Extensions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExtension: null,
      extensionsList: null,
    };
  }

  extensionsView = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.extensionsGrid}>
        {this.state.extensionsList.map((item, i) => {
          const extensionIcon = new ExtensionList[item[0]]().extensionIcon();
          let name = item[0];
          if (name.length > 11) {
            name = name.substr(0, 9) + '...';
          }
          let devidedByThree = false;
          if (i % 3 === 0) {
            devidedByThree = true;
          }
          return (
            <TouchableOpacity
              style={
                !devidedByThree
                  ? styles.extensionButton
                  : [styles.extensionButton, styles.extensionButtonThree]
              }
              key={i}
              onPress={() =>
                this.setState({
                  selectedExtension: item,
                })
              }>
              <Image style={styles.extensionsIcon} source={extensionIcon} />
              <Text style={styles.extensionName}>{name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  componentDidMount() {
    this.getExtensions();
  }

  getExtensions = () => {
    const check = Object.keys(ExtensionList).map(function(key) {
      return [String(key), ExtensionList[key]];
    });
    if (check[0][0] !== 'default') {
      this.setState({
        extensionsList: Object.keys(ExtensionList).map(function(key) {
          return [String(key), ExtensionList[key]];
        }),
      });
    }
  };

  renderExtensions = () => {
    if (this.state.selectedExtension === null) {
      return this.extensionsView();
    } else {
      const ToShowExtension = this.state.selectedExtension[0];
      const Extension = ExtensionList[ToShowExtension];
      return <Extension />;
    }
  };

  render() {
    const {extensionsList, selectedExtension} = this.state;
    return (
      <>
        <SafeAreaView style={styles.topBar} />
        <SafeAreaView style={styles.hideStatusBar}>
          <StatusBar barStyle="light-content" />
          {extensionsList === null ? (
            <Text style={styles.noExtensions}>
              There were no extensions found
            </Text>
          ) : (
            <>
              {selectedExtension !== null ? (
                <View style={styles.topFlex}>
                  <TouchableOpacity
                    style={styles.goBack}
                    onPress={() => this.setState({selectedExtension: null})}>
                    <Image
                      style={styles.goBackArrow}
                      source={require('../assets/img/arrow.png')}
                    />
                    <Text style={styles.goBackText}>Extensions</Text>
                  </TouchableOpacity>
                  <Image
                    source={require('../assets/img/wizer_dark.png')}
                    style={styles.brandingImage}
                  />
                </View>
              ) : (
                <View style={styles.topFlex}>
                  <Text style={styles.extenionsTitle}>Extensions</Text>
                  <Image
                    source={require('../assets/img/wizer_dark.png')}
                    style={styles.brandingImage}
                  />
                </View>
              )}
              <View style={styles.extensionView}>
                {this.renderExtensions()}
              </View>
            </>
          )}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  extensionsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noExtensions: {
    color: colors.wizer,
    fontSize: 17,
    marginTop: 50,
    fontFamily:
      Platform.OS === 'android' ? 'Playfair-Display-regular' : 'Didot',
    textAlign: 'center',
  },
  topBar: {
    flex: 0,
    backgroundColor: colors.wizer,
  },
  hideStatusBar: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15,
    flex: 1,
    marginHorizontal: 20,
  },
  extensionButton: {
    padding: 5,
    width: 90,
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginRight: 'auto',
  },
  extensionButtonThree: {
    marginLeft: '4%',
    marginRight: '4%',
  },
  extensionsIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  extensionName: {
    color: colors.wizer,
    fontSize: 13,
    fontFamily:
      Platform.OS === 'android' ? 'Playfair-Display-regular' : 'Didot',
    textAlign: 'right',
  },
  extensionView: {
    flex: 1,
  },
  brandingImage: {
    width: 90,
    height: 30,
    resizeMode: 'contain',
  },
  topFlex: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  goBackText: {
    color: colors.wizer,
    fontSize: 15,
    fontFamily:
      Platform.OS === 'android' ? 'Playfair-Display-regular' : 'Didot',
    textAlign: 'right',
  },
  extenionsTitle: {
    fontFamily:
      Platform.OS === 'android' ? 'Playfair-Display-regular' : 'Didot',
    fontSize: 25,
    color: colors.wizer,
  },
  goBack: {
    borderWidth: 1,
    borderColor: colors.wizer,
    borderRadius: 5,
    width: 125,
    paddingVertical: 5,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goBackArrow: {
    width: 12.5,
    height: 12.5,
    resizeMode: 'contain',
    marginTop: 3,
  },
});

export default Extensions;
