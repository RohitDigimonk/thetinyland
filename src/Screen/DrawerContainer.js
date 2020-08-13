import React from 'react';
import { View, StyleSheet,NativeModules,ImageBackground,TouchableOpacity, SafeAreaView,Image, ScrollView, AsyncStorage, } from 'react-native';
import { StackActions, NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
// import styles from './styles';
import {RNRestart} from "react-native-restart"
import {I18nManager} from 'react-native'; 
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import stringsoflanguages from './stringOfLanguage';
import MenuButton from '../common/MenuButton/MenuButton';
import axios from 'axios';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
// console.log(AsyncStorage.getItem('userid'))


const { RNTwitterSignIn } = NativeModules;
const { TwitterAuthProvider } = firebase.auth;


const TwitterKeys = {
    TWITTER_CONSUMER_KEY: "ltHcXEnKk0P8TsA5VsXLolo3x",
  TWITTER_CONSUMER_SECRET: "RTz9cw0hjBf9h7P0CRqbCqFmLhSCsK25S3j0i6Ap3mijaVpbZE"
    
  };

export default class DrawerContainer extends React.Component {

  appleLogin = () => {
    return appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    }).then(loginData => {
            // console.log(loginData)
            const fullName = loginData['fullName']
            const aemail = loginData['email']
            const aname = fullName['givenName']
            const alastname = fullName['familyName']
            axios.post('https://thetinyland.com/api/Api/socialMediaLogin', {
              first_name:aname,
              last_name:alastname,
              phone:"",
              email:aemail
          }).then((response) => {
            //   console.log(response)
            const data = response['data']
            const status = data['status']
            const data1 = data['data']
            const userid = data1['id']
            // console.log(data);
            if(status==1){
                this.setState({
                    userid:userid
                })
                this.session()
            }
          })
      
    });
  }

  _twitterSignIn = () => {
    RNTwitterSignIn.init(TwitterKeys.TWITTER_CONSUMER_KEY, TwitterKeys.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        // console.log(loginData)
        const temail = loginData['email']
        const tname = loginData['userName']
        const { authToken, authTokenSecret,email  } = loginData
        if (authToken && authTokenSecret) {
          axios.post('https://thetinyland.com/api/Api/socialMediaLogin', {
            first_name:tname,
            last_name:"",
            phone:"",
            email:temail
          }).then((response) => {
            // console.log(response)
            const data = response['data']
            const status = data['status']
            const data1 = data['data']
            const userid = data1['id']
            // console.log(data);
            if(status==1){
                this.setState({
                    userid:userid
                })
                this.session()
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      }
    )
  }

  googleLogin = async() => {
    try {
      // add any configuration settings here:

        
      await GoogleSignin.configure();
  
      const data = await GoogleSignin.signIn();
        
        // console.log(data)
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
    //   console.log((firebaseUserCredential.user.toJSON()));
      const dataget = firebaseUserCredential.user.toJSON()
      const providerData = dataget['providerData']
      const prodata = providerData['0']
      const gemail = prodata['email']
      const gname = prodata['displayName']
      console.log(gemail)
    axios.post('https://thetinyland.com/api/Api/socialMediaLogin', {
          first_name:gname,
          last_name:"",
          phone:"",
          email:gemail
      }).then((response) => {
        //   console.log(response)
        const data = response['data']
        const status = data['status']
        const data1 = data['data']
        const userid = data1['id']
        // console.log(data);
        if(status==1){
            this.setState({
                userid:userid
            })
            this.session()
        }
      })
      
    } catch (e) {
    //   console.error  (e);
    }
  }

facebookLogin = async() => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        // handle this however suites the flow of your app
        // this.props.navigation.navigate('SignIn')
      }
  
      else{
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        // getdata = result
        // console.log(getdata);
        // get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        // handle this however suites the flow of your app
        // throw new Error('Something went wrong obtaining the users access token');
        this.props.navigation.navigate('SignIn')
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
  
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
    //   console.log(firebaseUserCredential.user.toJSON())
      const dataget = firebaseUserCredential.user.toJSON()
      const providerData = dataget['providerData']
      const prodata = providerData['0']
      const femail = prodata['email']
      const fname = prodata['displayName']

      axios.post('https://thetinyland.com/api/Api/socialMediaLogin', {
          first_name:fname,
          last_name:"",
          phone:"",
          email:femail
      }).then((response) => {
        //   console.log(response)
        const data = response['data']
        const status = data['status']
        const data1 = data['data']
        const userid = data1['id']
        console.log(data);
        if(status==1){
            this.setState({
                userid:userid
            })
            this.session()
        }
    
      })
    }
  
      
    //   console.log(fname)
    } catch (e) {
      console.error(e);
    }
  }

  state={
    userid:"",
    langi:"en"
  }

  constructor(props) {
    super(props);
    const lang = [
      { shortform: 'en', longform: 'English' },
      { shortform: 'hi', longform: 'Hindi' },
      { shortform: 'ma', longform: 'Marathi' },
      { shortform: 'ar', longform: 'Arabic' },
    ];
    global.lang = lang; 
  }

  session=()=>{
    AsyncStorage.setItem('userid',this.state.userid)
    this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ],
      }))
}

    async componentDidMount(){

        this.loadSession().done();
        
        // this.setState({
        //   // langi:await AsyncStorage.getItem('language')
        // })
    }

    settext=async(value)=>{
      // alert(value)
      AsyncStorage.setItem('language',value)
      this.setState({
        langi:await AsyncStorage.getItem('language')
      })
      // console.log(await AsyncStorage.getItem('language'))
      stringsoflanguages.setLanguage(value);
      
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'WelcomeScreen' })
        ],
      }))
    
      // I18nManager.forceRTL(true);
      // // RNRestart.Restart();
      // this.props.navigation.closeDrawer();
    }

    
   
      loadSession = async() => {
        this.setState({
          userid:await AsyncStorage.getItem('userid')
        })
        // console.log(this.state.userid)
      }

    logout=async()=>{
        var value = await AsyncStorage.removeItem('userid')
        // alert(value)
        if(value == null){
             
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'WelcomeScreen' })
            ],
          }))
            // this.props.navigation.navigate('WelcomeScreen')
            // navigation.navigate('SignIn');
            // navigation.closeDrawer();
            // alert(value)
        }
        
    }

  render() {
    this.loadSession().done();
// console.log(this.state.langi)
    // console.log(this.props.navigation.state)
    const { navigation } = this.props;
    return (
        <ImageBackground
            source={require('../Images/background_full.png')}
            style={{width: "100%", height: "100%"}}
            >
              <SafeAreaView style={{}}>
                <View style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                  style={{width: 150, height: 150, resizeMode: 'contain'}}
                  source={require('../Images/logo.png')}
                  />
                  
                </View>
                <ScrollView>
               
                
<MenuButton
  title={stringsoflanguages.home}
  // source={require('../../../assets/icons/home.png')}
  onPress={() => {
    navigation.navigate('Home');
    navigation.closeDrawer();
  }}
/>
{this.state.userid==null?
<MenuButton
  title={stringsoflanguages.sign}
  
  // source={require('../../../assets/icons/category.png')}
  onPress={() => {
    navigation.navigate('SignIn');
    navigation.closeDrawer();
  }}
/>:null
}
{this.state.userid!=null?
 <MenuButton
  title={stringsoflanguages.mypro}
  // source={require('../../../assets/icons/home.png')}
  onPress={() => {
    navigation.navigate('UpdateProfile');
    navigation.closeDrawer();
  }}
/>:null
  }
{this.state.userid!=null?
 <MenuButton
  title={stringsoflanguages.changepass}
  // source={require('../../../assets/icons/home.png')}
  onPress={() => {
    navigation.navigate('ChangePassword');
    navigation.closeDrawer();
  }}
/>:null
  }


 <MenuButton
  title={stringsoflanguages.our}
  // source={require('../../../assets/icons/home.png')}
  onPress={() => {
    navigation.navigate('Services');
    navigation.closeDrawer();
  }}
/>
<MenuButton
  title={stringsoflanguages.why}
  // source={require('../../../assets/icons/category.png')}
  onPress={() => {
    navigation.navigate('Why');
    navigation.closeDrawer();
  }}
/>
{this.state.userid!=null?
<MenuButton
  title={stringsoflanguages.Contact}
  // source={require('../../../assets/icons/search.png')}
  onPress={() => {
    navigation.navigate('ContactUs');
    navigation.closeDrawer();
  }}
/>:null
}


  <MenuButton
  title={stringsoflanguages.term}
  // source={require('../../../assets/icons/search.png')}
  onPress={() => {
    navigation.navigate('Terms');
    navigation.closeDrawer();
  }}
/>
  {this.state.langi=="en"?<MenuButton
  title="عربى"
  // source={require('../../../assets/icons/home.png')}
  onPress={()=>{this.settext("ar")}}
/>:<MenuButton
  title="English"
  // source={require('../../../assets/icons/home.png')}
  onPress={()=>{this.settext("en")}}
/>}
{this.state.userid!=null?
<MenuButton
  title={stringsoflanguages.logout}
  // source={require('../../../assets/icons/search.png')}
  onPress={this.logout}
/>:null
}  
                 
                </ScrollView>
                {this.state.userid==null?
                <View style={{flexDirection: 'row', marginTop: "5%", paddingLeft: 30}}>
                    <TouchableOpacity onPress={this.facebookLogin}> 
                    <Image
                        style={{margin: 10,resizeMode:'contain',width:45,height:45}}
                        source={require('../Images/facebook.png')}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._twitterSignIn}>
                    <Image
                        style={{margin: 10,resizeMode:'contain',width:45,height:45}}
                        source={require('../Images/twitter.png')}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.googleLogin}>
                    <Image
                        style={{margin: 10,resizeMode:'contain',width:45,height:45}}
                        source={require('../Images/google.png')}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.appleLogin}>
                    <Image
                        style={{margin: 10,resizeMode:'contain',width:45,height:45}}
                        source={require('../Images/apple.png')}
                    />
                    </TouchableOpacity>

                </View>:null}     
              </SafeAreaView>
              </ImageBackground>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

const styles = StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'row',
      // alignItems: 'center',
      marginTop:20
      // justifyContent: 'center'
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      paddingHorizontal: 10
    },
    // drawerHeader:{
    //   width:"100%",
    //   height:60,
    //   backgroundColor:"#e22034"
      
    // },
    DrawerContainer:{
      flex: 1,
    }
  });
  

 