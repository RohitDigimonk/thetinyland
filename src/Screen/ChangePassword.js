import React, {Component} from 'react';
import { StackActions, NavigationActions} from 'react-navigation';
import {Text,View,SafeAreaView, ImageBackground, Image,KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput, AsyncStorage} from 'react-native';
import Button from '../common/Button';
import stringsoflanguages from './stringOfLanguage';
import Spinner from '../common/Spinner';

class ChangePassword extends Component{

    loadSession = async () => {
        this.setState({
            userid:await AsyncStorage.getItem('userid')
        })
    }

    state = {opassword: '', password: '', cpassword: '', loading:false}

    updatePassword =() => {
        const {opassword} = this.state;
        const {password} = this.state;
        const {cpassword} = this.state;
        this.setState({loading:true})
        // console.log(JSON.stringify({
           
        //     id: this.state.userid,
         
        //     current_password: opassword,
         
        //     new_password: password,
        
            
                       
        //   })
        //  )
        if(password==''){
            alert('password is required');
            this.setState({
                loading:false
            })
        }
        else if(password!=cpassword){
            alert('confirm password is not matched');
            this.setState({
                loading:false
            })
        }
        
       else{
       
        fetch('https://thetinyland.com/api/Api/updatePassword', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
           
              id: this.state.userid,
           
              current_password: opassword,
           
              new_password: password,
          
              
                         
            })
           
          }).then((response) => response.json())
                .then((responseJson) => {
                 console.log(responseJson)
                 this.setState({
                     data:responseJson
                 })
                 const status = this.state.data['status']

                 if(status!=null){
                     this.setState({
                         loading:false
                     })
                 }
        //   Showing response message coming from server after inserting records.
        if(this.state.data['status']==1){
            alert(this.state.data['message'])
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'ChangePassword' })
                ],
              }))
        }
                else{
                    alert(this.state.data['message'])
                }
                
                }).catch((error) => {
                  console.error(error);
                });
       }                     
    }

    renderButton(){
        if (this.state.loading){
            return<Spinner size='small' />;
        }
        return(
            <Button onPress={this.updatePassword}>
                        {stringsoflanguages.submit}
                   
                    </Button>
        );
    }
    
    componentDidMount(){
        this.loadSession().done();
    }
    render(){
        return(
            <SafeAreaView>
            <KeyboardAvoidingView behavior="padding" enabled>
            <ImageBackground
            source={require('../Images/background.png')}
            style={{width: '100%', height: '100%'}}
            >
            <ImageBackground
                  source={require('../Images/topheader.png')}
                  style={{height:70,width:431}}
                  >
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.toggleDrawer({
                      // params:"20"
                    })}>
                    <Image
                        source={require('../Images/more.png')}
                        style={{height: 23, width: 29, marginLeft: 10, marginTop: 20}}
                    />
                    </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 24,position: 'absolute',paddingTop: 16, alignSelf: 'center', color:"black",fontFamily: 'Poppins'}}>
                        {stringsoflanguages.changepass}</Text>
                  </ImageBackground>
            <ScrollView keyboardShouldPersistTaps='always' style={{marginTop: 5}}>
            <View style={{marginTop:"10%"}}>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: 300}}
                        placeholder={stringsoflanguages.opass}
                        placeholderTextColor="#000000"
                        secureTextEntry
                        value = {this.state.opassword}
                        onChangeText={opassword => this.setState({ opassword })}
                />
                    <Image
                        source={require('../Images/password.png')}
                        style={{width: 30, height: 19, marginLeft: 10}}
                    />
            </View>
        
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: 300}}
                        placeholder={stringsoflanguages.npass}
                        placeholderTextColor="#000000"
                        secureTextEntry
                        value = {this.state.password}
                        onChangeText={password => this.setState({password})}
                />
                    <Image
                        source={require('../Images/password.png')}
                        style={{width: 30, height: 19, marginLeft: 10}}
                    />
            </View>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: 300}}
                        placeholder={stringsoflanguages.confirm}
                        placeholderTextColor="#000000"
                        secureTextEntry
                        value = {this.state.cpassword}
                        onChangeText={cpassword => this.setState({ cpassword })}
                />
                    <Image
                        source={require('../Images/password.png')}
                        style={{width: 30, height: 19, marginLeft: 10}}
                    />
            </View>
           
            <View style={{marginTop: "10%", alignItems: 'center'}}>
                    
                    {/* <View style={Styles.buttonStyle}>
                        <Text style={Styles.textStyle}>Submit</Text>
                    </View> */}
                    {this.renderButton()}
            </View>
           
            
               
            
            </View>
            </ScrollView>
            </ImageBackground>
            </KeyboardAvoidingView>
            </SafeAreaView>
            
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
        marginTop: 15,
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 10,

    },

    buttonStyle: {
        width: 180,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        // backgroundColor: '#008C99',
        borderRadius: 25,
        height:50,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        
    },
    textStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
}
export default ChangePassword;