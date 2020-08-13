import React, {Component} from 'react';
import {Text,View, ImageBackground, TouchableOpacity,TextInput, ScrollView, Image,AsyncStorage, StyleSheet}from 'react-native';
// import OtpInputs from 'react-native-otp-inputs'
import stringsoflanguages from './stringOfLanguage';
import Button from '../common/Button';
import { SafeAreaView } from 'react-navigation';

class OtpRegistration extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value:"",
            checkotp:false,
            }
        }
    otpRef = React.createRef()
  
    clearOTP = () => {
      otpRef.current.clear()
    }

    checkOtp=(code)=>{
        // Alert.alert(code)
        this.setState({
            checkotp:false
        })
        console.log(code)
        // this.state.value= code.nativeEvent.text
        this.setState({
            value:code
        })
        console.log(this.state.value)
    }
  
    handleSubmit=()=>{
        console.log(JSON.stringify({
            otpcode:this.state.value,
            email: this.props.navigation.state.params.email,
           

       }))
        fetch('https://thetinyland.com/api/Api/verify',{
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        otpcode:this.state.value,
                        email: this.props.navigation.state.params.email,
                       

                   })
               }).then((response) => response.json())
               .then((responseJson) => {
                    this.setState( { data: responseJson });
                    // console.log(this.state.data);
                    this.setState({ myData: this.state.data['data'] })
                    // console.log(this.state.myData);
                    this.setState({ userid: this.state.myData['id'] })
                    console.log(this.state.userid);
                    if(this.state.data['status']==1){
                         this.session();
                    }
                    else{
                        this.setState({
                            checkotp:true
                        })
                      
                    }
                   
               }).catch((error) => {
                    console.error(error);
               });
    }

    session=()=>{
        AsyncStorage.setItem('userid',this.state.userid)
        this.props.navigation.navigate("Home");
    }

    render() {
        return(
            <SafeAreaView>
            <ImageBackground
            source={require('../Images/background.png')}
            style={{width: '100%', height: '100%'}}
            >
            <ImageBackground
            source={require('../Images/topheader.png')}
            style={{width: 431, height: 70}}
            >
            <View>
            <TouchableOpacity
            style={{width:19, height: 33, marginTop: 10, marginLeft: 10}}
            onPress={() => this.props.navigation.goBack()}>
            <Image
            source={require('../Images/back.png')}
            style={{width: 19, height: 33, marginTop: 10, marginLeft: 10}}
            /> 
            </TouchableOpacity>
            </View>
            
            </ImageBackground>
            
            <ScrollView keyboardShouldPersistTaps='always'>
            <View>
            
            <View>
               <ScrollView keyboardShouldPersistTaps='always'>
                 <View style={styles.container}>
            <View>
                <View style={{width:"100%", flexDirection:'row', alignItems:"center" }}>
                <TouchableOpacity
             onPress={() => {
                this.props.navigation.navigate("Dashboard");
              }}>
               {/* <Image source={require('../Images/blue.png')} style={styles.Smalllogo} /> */}
            </TouchableOpacity>{/* <Text style={{fontSize:22, marginRight:20, marginTop:30, textDecorationLine:"underline"}}>HI JOHN</Text> */}
                </View>
                 <View style={{width:'100%', height:"100%", alignItems:"center", marginTop:5,
                  padding: 20, }}>
                   <View style={{width:"100%", height:200, justifyContent:"center"}}>
                    <Text style={[styles.titleText,{fontSize:16}]}>{stringsoflanguages.vfcode}</Text>
                     
                       <TextInput
                        style={[styles.otpContainer,{borderColor:this.state.checkotp?"#f00":"#000"}]}
                        onChangeText={code => this.checkOtp(code)}
                       />
                   </View> 
                   
                        <View style={{marginTop: 40}}>
                    <Button onPress={this.handleSubmit}>{stringsoflanguages.submit}</Button>
                    </View>
                    {this.state.checkotp?
                    <View>
                    <Text style={{color:"#f00"}}>{stringsoflanguages.wrongotp}</Text>
                    {/* <TouchableOpacity>
                        <Text style={{fontSize:18, textAlign:"center", color:"#0FAD01", marginTop:20, fontFamily:"Raleway-Regular"}}>Resend Code</Text>
                    </TouchableOpacity> */}
                    </View>:null}
                </View>
                
            </View>
        </View>
           </ScrollView>
            
            
           </View>
                
            
            </View>
            </ScrollView>
            </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles= StyleSheet.create({
    container: {
      flex: 1,
    //   width: '100%',
      height:'100%',
      justifyContent: 'center',
      fontFamily:"Poppins",
      alignItems: 'center',
    //   backgroundColor:'#000'
    },
    mainConatiner:{
        width:"100%",
        height:"100%",
        backgroundColor:"#DEDF38",
        alignItems:"center",
        justifyContent:"center"
    },
    newConatiner:{
        width:"100%",
        height:"100%",
        backgroundColor:"#DEDF38",
        // alignItems:"center",
        // justifyContent:"center"
    },
    logo:{
       
        width: 180,
        height: 86,
        resizeMode:"contain",
        // top:173
        bottom:60,
        marginTop:120
    },
    Smalllogo:{
        width: 60,
        height: 60,
        margin:15,
        resizeMode:"contain",
       
    },
    loginContent:{
        width:"100%"
    },
    inputContainer:{
        // flex:1,
        // width:"100%",
        marginLeft:40,
        marginRight:40,
        
    },
    inputs:{
        width:'100%',
        // flex:1,
        height:38,
        backgroundColor:"#fff",
        // borderWidth:1,
        // borderColor:"#ff00000"
        borderRadius:4,
        marginBottom:30,
        textAlign:"center"
    },
    boxinput:{
        width:'100%',
        // flex:1,
        height:38,
        backgroundColor:"#fff",
     
        borderRadius:4,
        marginBottom:30,
        textAlign:"center"
    },
    otpContainer:{
        // borderColor:"#f00",
        borderWidth:1,
        borderRadius:4,
        fontSize:22,
        backgroundColor: 'white',
        marginTop: 20
    },
    inputbox:{
        width:'100%',
        // flex:1,
        height:38,  
        backgroundColor:"#fff",
        borderWidth:2,
        borderColor:"#000",
        // marginBottom:20,
        // borderRadius:4,
        marginTop:10,
        marginBottom:50,
        textAlign:"center"
    },
    newinputs:{
        marginLeft:40
    },
    btnView:{
        width:"100%",
        alignItems:"center"
    },
    Whitebtn:{
        // height:38,
        backgroundColor:"#fff",
        borderRadius:24.5,
        marginTop:25,
        paddingLeft:25,
        paddingRight:25,
        paddingTop:10,
        paddingBottom:10
    },
   Textbtn:{
        // height:38,
        // backgroundColor:"#fff",
        borderRadius:24.5,
        marginTop:15,
        paddingLeft:25,
        paddingRight:25,
        paddingTop:10,
        paddingBottom:10
    },
    blackText:{
        fontSize:20,
        color:'#000'

    },
    whiteText:{
        fontSize:22,
        color:'#fff',
        fontWeight: 'bold',

    },
    form:{
        width:"100%",
        alignItems:"center"
    },
    titleText:{
        fontSize:20,
        color:'red',
        // fontWeight:"bold",
        fontFamily:"Poppins",
        textAlign:"center"
        
    },
    TextContainer:{
        width:"100%",
        // marginLeft:60,
        // marginRight:60,
        // borderWidth:1,
        paddingLeft:40,
        paddingRight:40
    },
    nav:{
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        // height:65,
        paddingRight:20,
        paddingLeft:20,
        paddingTop:10,
        backgroundColor:"#fff",
        alignSelf:'flex-end',
        flexDirection:"row",
        justifyContent:"space-between",
        fontFamily:"Poppins",
        shadowOffset: { width: 10, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 7,
      },
      nav2:{
        position:"absolute",
        bottom:30,
        right:0,
        left:0,
        height:55,
        paddingRight:30,
        paddingLeft:30,
        paddingTop:10,
        backgroundColor:"#fff",
        alignSelf:'flex-end',
        flexDirection:"row",
        justifyContent:"space-between",
        
      },
      list:{
          width:"100%",
          minHeight:80,
          backgroundColor:"#ddd",
          borderBottomColor:"#ccc",
          borderBottomWidth:1,
          flexDirection:"row",
          justifyContent:"space-between",
          paddingTop:20,
          paddingBottom:20
          
      },
      content: {
        backgroundColor: '#DEDF38',
        padding: 22,
        fontFamily:"Poppins",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      contentTitle: {
        fontSize: 24,
        marginBottom: 12,
        fontFamily:"Poppins",
        color:"#fff"
      },
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      scrollableModal: {
        height: 300,
      },
      scrollableModalContent1: {
        height: 200,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scrollableModalText1: {
        fontSize: 20,
        color: 'white',
      },
      scrollableModalContent2: {
        height: 200,
        backgroundColor: '#A9DCD3',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scrollableModalText2: {
        fontSize: 20,
        color: 'white',
        fontFamily:"Poppins",
      },
      customBackdrop: {
        flex: 1,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
      },
      customBackdropText: {
        marginTop: 10,
        fontSize: 17,
      },
      modalinputs:{
        height:45,
        width:"100%",
        backgroundColor:"#fff",
        borderRadius:30,
        // marginBottom:20
      },
      closeBtn:{
        backgroundColor:"#fff",
        borderRadius:30,
        height:45,
        paddingLeft:20,
        paddingRight:20,
        marginTop:20,
        alignItems:"center"
      },

  });


export default OtpRegistration;