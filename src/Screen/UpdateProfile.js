import React, {Component} from 'react';
import {Text,View, ImageBackground, Image, TouchableOpacity,KeyboardAvoidingView, ScrollView, TextInput, AsyncStorage} from 'react-native';
import { StackActions, NavigationActions, SafeAreaView} from 'react-navigation';
import Button from '../common/Button';
import stringsoflanguages from './stringOfLanguage';
import Spinner from '../common/Spinner';
import Axios from 'axios';

class UpdateProfile extends Component{

    componentDidMount(){
        this.loadSession().done();
        console.log(StringI)
    }

    loadSession = async() => {
        this.setState({
          userid:await AsyncStorage.getItem('userid')
          
        })

        // console.log(this.state.userid)
        Axios.post('https://thetinyland.com/api/Api/profileInfo',{
            id: this.state.userid
        }).then((response) => {
            // console.log(response);
            const data2 = response['data']
            const data = data2['data']
            // console.log(data)
            this.setState({
                fname: data['first_name'],
                lname: data['last_name'],
                phone: data['phone']
            })
        })
      }

    state = { fname: '', lname: '', phone: '', loading: false }

    userupdate = () => {
        const {fname} = this.state;
        const {lname} = this.state;
        const {phone} = this.state;
        const {userid} = this.state;
        this.setState({ loading: true})

        if(phone.length < 8){
            alert("Phone no. should be minimunm 8 character")
            this.setState({loading:false})
        }
        else{
            
        fetch('https://thetinyland.com/api/Api/profileUpdate', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    
    
    
    first_name: fname,
  
    last_name: lname,

    phone: phone,

    id: userid
 
  })

}).then((response) => response.json())
        .then((responseJson)=> {
            console.log(userid)
            this.setState({
                data:responseJson
            })
            // Showing response message coming from server after inserting records.
                if(this.state.data['status']!=null){
                    this.setState({
                        loading:false
                    })
                }
                if(this.state.data['status']==1){
                    alert(this.state.data['message'])
                    this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({ routeName: 'UpdateProfile' })
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
        componentDidMount(){
        this.loadSession().done();
        }

       renderButton(){
           if (this.state.loading) {
               return <Spinner size="small" />;
           }

           return (
            <Button onPress={this.userupdate}>
            {stringsoflanguages.submit}
            </Button>
           );
       }

    render(){
    //     {this.props.ffname}
    //    console.log(this.props.text)
    // <ffname />
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
                        {stringsoflanguages.mypro}</Text>
                  </ImageBackground>
                  <View style={{marginTop: 30, alignItems: 'center'}}>
            <Text style={{fontSize: 28, color:"black",fontFamily: 'Poppins'}}>{stringsoflanguages.updatepro}</Text>
                </View>
            <ScrollView keyboardShouldPersistTaps='always' style={{marginTop: 5}}>
            <View style={{marginTop: 30}}>
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width: 300}}
                        placeholder={stringsoflanguages.first}
                        placeholderTextColor="#000000"
                        value = {this.state.fname}
                        onChangeText={fname => this.setState({ fname })}
                />
                    <Image
                        source={require('../Images/name.png')}
                        style={{width: 20, height: 20, marginLeft: 10}}
                    />
            </View>
        
            <View style={Styles.containerStyle}>
                <TextInput
                        style={{width:300}}
                        placeholder={stringsoflanguages.last}
                        placeholderTextColor="#000000"
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
                        style={{width:300}}
                        placeholder={stringsoflanguages.phone}
                        placeholderTextColor="#000000"
                        value = {this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                />
                    <Image
                        source={require('../Images/mobile.png')}
                        style={{width: 17, height: 30, marginLeft: 10}}
                    />
            </View>
           
            <View style={{marginTop: "10%", alignItems: 'center'}}>
                
                    {/* <Button onPress={this.userupdate}>
                        {stringsoflanguages.submit} */}

                     {this.renderButton()}

                    {/* </Button>  */}
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
export default UpdateProfile;