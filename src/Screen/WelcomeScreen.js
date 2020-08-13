import React, { Component } from 'react';
import { Image, View, ImageBackground, AsyncStorage} from 'react-native';
import Button from '../common/Button';
import {I18nManager} from 'react-native'; 
import stringsoflanguages from './stringOfLanguage';
// import {RNRestart} from "react-native-restart"
import { StackActions, NavigationActions} from 'react-navigation';

class LaunchScreen extends Component {

    //  async componentDidMount() {
    //     console.log(await AsyncStorage.getItem('userid'))
    //   }
    
    //   componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    //   }
    
    //   onBackPress = () => {
    //     return true; 
    //   }

    async componentDidMount(){
        this.setState({
            langi:await AsyncStorage.getItem('language')
          })
          console.log(this.state.langi)
          if(this.state.langi=="ar"){
            I18nManager.allowRTL(true);
            // NativeModules.DevSettings.reload();  
          }
          else{
            I18nManager.allowRTL(false);
            // NativeModules.DevSettings.reload();
          }

        // I18nManager.forceRTL(false);
        // RNRestart.Restart();
        this.timeoutHandle = setTimeout(()=>{
            // Add your logic for the transition
            this.props.navigation.navigate('Home')
       }, 2000);
    }

    render() {
        return(
            <ImageBackground source={require('../Images/background_half.png')} 
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}>
            <View   style={Styles.ImageView}>
                <Image
                    source={require('../Images/logo.png')}
                    style={{width: 300, height:200 }}
                />                
            </View>
            <View style={Styles.ButtonView}>
            <Button onPress={() => this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' })
            ],
          }))}>
                {stringsoflanguages.lets}
            </Button>
            </View>
            </ImageBackground>
        );
    }
}

const Styles = {
    ImageView: {
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center',
        paddingTop: '25%'     
    },
    ButtonView: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: "5%",
        marginRight: "35%",
        justifyContent: 'flex-end'
    }
}

export default LaunchScreen;