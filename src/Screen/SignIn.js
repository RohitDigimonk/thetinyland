import React, { Component } from 'react';
import { Text, View,NativeModules, ImageBackground,KeyboardAvoidingView, Image, TextInput, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import Button from '../common/Button';
import { StackActions, NavigationActions} from 'react-navigation';
import axios from 'axios';
import stringsoflanguages from './stringOfLanguage';
import Spinner from '../common/Spinner';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';


const { RNTwitterSignIn } = NativeModules;
const { TwitterAuthProvider } = firebase.auth;


const TwitterKeys = {
    TWITTER_CONSUMER_KEY: "ltHcXEnKk0P8TsA5VsXLolo3x",
  TWITTER_CONSUMER_SECRET: "RTz9cw0hjBf9h7P0CRqbCqFmLhSCsK25S3j0i6Ap3mijaVpbZE"
    
  };


class SignIn extends Component {

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

    // twitterLogin = async() => {
    //     try {
    //         // console.log('alsdf')
    //       await RNTwitterSignIn.init(TwitterKeys.TWITTER_CONSUMER_KEY, TwitterKeys.TWITTER_CONSUMER_SECRET);
    //         // console.log(data)
    //       // also includes: name, userID & userName
    //       const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();    
      
    //       const credential = TwitterAuthProvider.credential(authToken, authTokenSecret);
      
    //       const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      
    //       console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
    //     } catch (e) {
    //       console.error(e);
    //     }
    //     // console.log('alsdf')
    //   }
    

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
            this.props.navigation.navigate('SignIn')
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
    
    state = { email: '', password: '', loading: false};
    
    login = () => {
        const {email} = this.state;
        const {password} = this.state;
        this.setState({ loading: true})
        axios.post('https://thetinyland.com/api/Api/login', {
              
              email: email,
              password: password

        }).then((response)=>{
            // console.log(response);
            // const data = response['data']
            // const message = data['message']
            // const status = data['status']
            // const dataa = data['data']
            // const userid = dataa['id']
            
          
            const data = response['data']
            const data1 = data['data']
            // const first_name = data1['first_name']
            // const lname = data1['last_name']
            // const email = data1['email']
            const message = data['message']
            const status = data['status']
            // console.log(message)
            if (status != null){
                this.setState({
                    loading:false
                })
            }
            // this.setState({
            //     ffname:ffname,
            //     lname:lname,
            //     email:email
            // })

            // console.log(dataa['id']);

            // this.setState({
            //     userid:userid
            // })
            if(status==1){
               
                
                const dataa = data['data']
                const userid = dataa['id']
                // console.log(dataa['id']);

            this.setState({
                userid:userid
                
            })
                this.session()
            }
            else{
                
                alert(message);
                
            }
            
        }).catch(function (error){
            console.log(error);
        })
        
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
    renderButton(){
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.login}>
            {stringsoflanguages.signin}
            </Button>
        );
    }
    
    render(){
        
        // <UpdateProfile ffname={this.state.ffname} />
        // console.log(this.state.ffname);
        return(
            
            <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={Styles.contentContainer}>
            
            <KeyboardAvoidingView behavior="padding" enabled>
            <ImageBackground
                source={require('../Images/background_qtr.png')}
                style={{width: "100%", height: "100%"}}
            >
            <View style={{marginTop: 20, flex: 1}}>
            <TouchableOpacity
            style={{marginTop: 10, marginLeft: 10,width:35,height:50, position:'absolute'}}
            onPress={() => this.props.navigation.goBack()}>
            <Image
            source={require('../Images/back.png')}
            style={{width: 19, height: 33, marginTop: 10, marginLeft: 10}}
            /> 
            </TouchableOpacity>
            </View>
            <View style={{  justifyContent: "flex-end", alignItems: 'center', marginBottom: 12, }} >
               <View style={Styles.containerStyle}>
                    <TextInput
                        style={{width: '80%', color: "#000000"}}
                        placeholder={stringsoflanguages.email}
                        placeholderTextColor="#000000"
                        value={this.state.email}                        
                        onChangeText={email => this.setState({ email })}
                       />
                    <Image
                        source={require('../Images/mail.png')}
                        style={{width: 36, height: 16, marginLeft: 10}}
                    />
                </View>
                <View style={Styles.containerStyle}>
                    <TextInput
                        style={{width: '80%',color: "#000000"}}
                        placeholder={stringsoflanguages.password}
                        placeholderTextColor="#000000"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}

                    />
                    <Image
                        style={{width: 30, height: 19, marginLeft: 10,}}
                        source={require('../Images/password.png')}
                    />
              </View>
              <View style={{marginLeft: "55%"}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPass')}>
                    <Text style={{color: "#000000", fontFamily: 'Poppins'}}>
                        {stringsoflanguages.forgot}
                    </Text>
                </TouchableOpacity>
             </View>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Button onPress={() => this.props.navigation.navigate('SignUp')}>
                        {stringsoflanguages.signup}
                    </Button>
                        
                    {this.renderButton()}
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <TouchableOpacity onPress={this.facebookLogin}> 
                        <Image
                            style={{margin: 10,resizeMode:'contain',width:45,height:45}}
                            source={require('../Images/facebook.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._twitterSignIn}>
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
                </View>
                
            </View>
            
            </ImageBackground>
            </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}




const Styles = {
    containerStyle: {
        width: "85%",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative', 
        borderWidth: 1,
        borderColor: '#008C99',
        marginTop: 10,
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    contentContainer: {
        justifyContent: 'center',
        height: "100%"
    }
}





export default SignIn;