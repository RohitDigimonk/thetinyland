import React, {Component} from 'react';
import {Text,View, ImageBackground, SafeAreaView, Image, ScrollView, AsyncStorage,TouchableOpacity, text, TextInput} from 'react-native';
import { StackActions, NavigationActions} from 'react-navigation';
import Button from '../common/Button';
import axios from 'axios';
import stringsoflanguages from './stringOfLanguage';
import Spinner from '../common/Spinner';

class ContactUs extends Component{
    state = {message: '', fname: '', lname: '', email: '', loading: false}


    

    loadSession = async() => {
        this.setState({
          userid:await AsyncStorage.getItem('userid')
        })
      }

      

      componentDidMount(){
        this.loadSession().done();
    }

    sendmessage=()=>{
        
        const {message} = this.state;
        const {userid} = this.state;
        this.setState({loading:true})
        
        axios.post('https://thetinyland.com/api/Api/sendContactEmail',{
            user_id: userid,
            description: message

        }).then((response)=> {
            // console.log(response);
            const data = response['data']
            const status = data['status']
            const message = data['message']
            if(status!=null){
                this.setState({
                    loading:false
                })
            }
            if(status==1){
                alert(message);
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'ContactUs' })
                    ],
                  }))
            }
            else{
                alert(message);
            }
        })
    }

    renderButton(){
        if(this.state.loading){
            return<Spinner size="small" />;
        }
        return(
            <Button onPress={this.sendmessage}>Send</Button>
        );
    }



    render(){
        // console.log(this.state.message);
        return(
            <SafeAreaView>
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
                    <Text style={{fontFamily : 'Poppins', fontSize: 24,position: 'absolute'
                    ,alignSelf: 'center',paddingTop: 16}}>
                        {stringsoflanguages.Contact}
                    </Text>
                  </ImageBackground>
            
            <ScrollView keyboardShouldPersistTaps='always' style={{marginTop: 5}}>
            <View style={{marginTop: 40}}>
            
            {/* <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '96%',alignSelf: 'flex-start', textAlign: 'justify',fontFamily : 'Poppins' }}
                        // multiline={true}
                        placeholder="First Name"
                        placeholderTextColor="#000000"
                        // secureTextEntry
                        value = {this.state.fname}
                        onChangeText={fname => this.setState({ fname })}
                />
                    
            </View>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '96%',alignSelf: 'flex-start', textAlign: 'justify',fontFamily : 'Poppins' }}
                        // multiline={true}
                        placeholder="Last Name"
                        placeholderTextColor="#000000"
                        // secureTextEntry
                        value = {this.state.lname}
                        onChangeText={lname => this.setState({ lname })}
                />
                    
            </View>

            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: '96%',alignSelf: 'flex-start', textAlign: 'justify',fontFamily : 'Poppins' }}
                        // multiline={true}
                        placeholder="Email ID"
                        placeholderTextColor="#000000"
                        // secureTextEntry
                        value = {this.state.email}
                        onChangeText={email => this.setState({ email })}
                />
                    
            </View> */}
            
            <View style={Styles.containerStyle2}>
                <TextInput
                        style={{width: 320,height: 150,marginTop: 5,alignSelf: 'flex-start', textAlign: 'justify',fontFamily : 'Poppins' }}
                        multiline={true}
                        placeholder="Type your message here"
                        placeholderTextColor="#000000"
                        // secureTextEntry
                        value = {this.state.message}
                        onChangeText={message => this.setState({ message })}
                />
                    
            </View>
            <View style={{marginTop: 40, alignItems: 'center'}}>
            {/* <TouchableOpacity onPress={this.sendmessage}> */}
            {/* <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                <ImageBackground
                style={{marginTop: 20, width: 135, height: 32, justifyContent: 'center', alignItems: 'center' }}
                source={require('../Images/registration_button.png')}
                >
                <Text style={{fontFamily : 'Poppins', color:'white'}}>Send</Text>
                </ImageBackground>
            </View> */}
            {this.renderButton()}
            {/* </TouchableOpacity> */}
            </View>
            </View>
            </ScrollView>
            </ImageBackground>
            </SafeAreaView>
            
        );
    }
}

const Styles = {
    containerStyle: {
        width: "85%",
        alignItems: 'center',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // position: 'relative', 
        borderWidth: 1,
        borderColor: '#008C99',
        marginTop: 15,
        height: 45,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 10,
        

    },
    containerStyle2: {
        width: "85%",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative', 
        borderWidth: 1,
        borderColor: '#008C99',
        marginTop: 15,
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 10,
        height: 150
    },
}

                
    
export default ContactUs;