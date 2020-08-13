import React, { Component } from 'react';
import { Text, View, ImageBackground, TextInput, Image,TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import ButtonNew from '../common/ButtonNew';
import stringsoflanguages from './stringOfLanguage';
import SpinnerNew from '../common/SpinnerNew';

class SignUp extends Component {
    
    state = { name: '', lname: '',phone: '', email: '', password: '',loading: false }

    userRegistration = () => {
        const {name} = this.state;
        const {lname} = this.state;
        const {phone} = this.state;
        const {email} = this.state;
        const {password} = this.state;
        this.setState({loading:true})
        

        axios.post('https://thetinyland.com/api/Api/register', {
            
                first_name: name, 
	            last_name:lname,
	            phone:phone,
	            email:email,
	            password:password,

            }).then((response) =>{
                // console.log(response)
                const data = response['data']
                const message = data['message']
                const status = data['status']
                if (status != null){
                    this.setState({
                        loading:false
                    })
                }
                // console.log(status)

                if(status == 1){
                    alert(message);
                    this.props.navigation.navigate('OtpRegistration',{email:this.state.email});
                }
                else{
                    alert(message)
                }
                
            }).catch(function (error){
                console.log(error);
            })
    
        }
        renderButton(){
            if (this.state.loading) {
                return <SpinnerNew size="small" />;
            }
    
            return (
                
                <ButtonNew onPress={this.userRegistration}>
                    {stringsoflanguages.submit}
                </ButtonNew>
        
            );
        }
          
     
    
    render(){
        return(
            
            <ImageBackground
                source={require('../Images/background_full.png')}
                style={{width: '100%', height: '100%'}}
            >
            <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollView keyboardShouldPersistTaps='always'>
            <View style={{marginTop: 20}}>
            <TouchableOpacity
            style={{marginTop: 10, marginLeft: 10,width:35,height:50, position:'absolute'}}
            onPress={() => this.props.navigation.goBack()}>
            <Image
            source={require('../Images/back.png')}
            style={{width: 19, height: 33, marginTop: 10, marginLeft: 10}}
            /> 
            </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center',marginTop: "25%"}}>
                <View style={{bottom: "5%"}}>
            <Text style={{fontSize: 28, color:"white",fontFamily: 'Poppins'}}>{stringsoflanguages.signup}</Text>
                </View>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '80%'}}
                        placeholder={stringsoflanguages.first}
                        value = {this.state.name}
                        onChangeText={name => this.setState({ name })}
                />
                    <Image
                        source={require('../Images/name.png')}
                        style={{width: 20, height: 20, marginLeft: 10}}
                    />
            </View>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '80%'}}
                        placeholder={stringsoflanguages.last}
                        value = {this.state.lname}
                        onChangeText={lname => this.setState({lname})}
                />
                    <Image
                        source={require('../Images/name.png')}
                        style={{width: 20, height: 20, marginLeft: 10}}
                    />
            </View>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '80%'}}
                        placeholder={stringsoflanguages.phone}
                        value = {this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                />
                    <Image
                        source={require('../Images/mobile.png')}
                        style={{width: 17, height: 30, marginLeft: 10}}
                    />
            </View>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '80%'}}
                        placeholder={stringsoflanguages.emailid}
                        value = {this.state.email}
                        onChangeText={email => this.setState({ email })}
                />
                    <Image
                        source={require('../Images/mail.png')}
                        style={{width: 36, height: 16, marginLeft: 10}}
                    />
            </View>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '80%'}}
                        placeholder={stringsoflanguages.password}
                        value = {this.state.password}
                        onChangeText={password => this.setState({password})}
                        secureTextEntry
                />
                    <Image
                        source={require('../Images/password.png')}
                        style={{width: 30, height: 19, marginLeft: 10}}
                    />
            </View>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '80%'}}
                        placeholder={stringsoflanguages.confirm}
                        secureTextEntry
                />
                    <Image
                        source={require('../Images/password.png')}
                        style={{width: 30, height: 19, marginLeft: 10}}
                    />
            </View>

            <View style={{marginTop: "5%",backgroundColor: 'transparent'}}>
             {this.renderButton()}
             </View>
            <View style={{flexDirection: 'row', marginTop: "5%"}}>
            
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
            </ScrollView>
            </KeyboardAvoidingView>
            </ImageBackground>
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
export default SignUp;