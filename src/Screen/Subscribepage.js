import React, {Component} from 'react';
import {Text,View,Alert, ImageBackground,AsyncStorage, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Button} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import stringsoflanguages from './stringOfLanguage';
import { StackActions, NavigationActions} from 'react-navigation';
import Axios from 'axios';
// import PayPal from 'react-native-paypal-wrapper';


var radio_props = [
    {label: <Image
        source={require('../Images/visa_master.png')}
        style={{height: 29, width: 136, marginLeft: 10, marginTop: 2}}
    />, value: 0 },
    {label: <Image
        source={require('../Images/paypal.png')}
        style={{height: 29, width: 136, marginLeft: 10, marginTop: 2}}
    />, value: 1 },
   
  ];
  

class Subscribepage extends Component{

    params = this.props.navigation.state.params
    subscription_id = this.params['subscription_id']
    nursery_id = this.params['nursery_id']
    school_owner = this.params['user_id']
    // param = this.params

    state = {
        userid: '',subscription_id:'',nursery_id:''
    }
    
    // paypal() {
    //     PayPal.initialize(PayPal.SANDBOX, 'AW8pIdNP7pDnVrEyfIDXtERPt_KaFqsF2n3soujez9olIXhw5Ci2yLcyidF2Sddj8EdStMz4Rfpaem3r'); // 3 enviroments - NO_NETWORK, SANDBOX, PRODUCTION
    //     PayPal.pay({
    //       price: '1',
    //       currency: 'USD',
    //       description: 'Nursery Plan',
    //     }).then(confirm => console.log(confirm))
    //       .catch(error => console.log(error));
    //   }


    loadSession = async() => {
        this.setState({
          userid:await AsyncStorage.getItem('userid')
        })

        // console.log(this.state.userid)
      }

      componentDidMount = () => {
          this.loadSession().done();
      }


    paypal = () => {
        if(this.state.userid == null){
        Alert.alert('','For complete your subscription please login',[
            {
                'text':'OK',
                onPress:()=>{
                    this.props.navigation.dispatch(StackActions.reset({
                        index:0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'SignIn' })
                        ],
                    }))
                }
            }])
        } 
         else
        {
            Axios.post('https://thetinyland.com/api/Api/getSubscriptonDetails',{
                
                parent_id: this.state.userid,
                subscription_id: this.subscription_id,
                nursery_id: this.nursery_id,
                user_id : this.school_owner
            }).then((response) => {
                // console.log(response)
                data=response['data'],
                status=data['status'],
                // message=data['message'],
                // message=data['message'],
                console.log(data)
                if(status == 1 ) {
                    alert('You have Successfully Subscribed')
                }
                else{
                    alert(data['message']);
                }

            })
        }
        
    }



    render(){
        // const {params} = this.props.navigation.state
        // this.setState({
        //     subscription_id:params['subscription_id']
        // })
        // console.log(this.nursery_id);
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
            style={{marginTop: 10, marginLeft: 10,width:35,height:50, position:'absolute'}}
            onPress={() => this.props.navigation.goBack()}>
            <Image
            source={require('../Images/back.png')}
            style={{width: 19, height: 33, marginTop: 10, marginLeft: 10}}
            /> 
            </TouchableOpacity>
            </View>
            
            </ImageBackground>
            <ScrollView>
            <View style={{marginTop: 20}}>
            <View style={Style.containerStyle}>
                <View style={{flexDirection: 'row'}}>
                <ImageBackground
                      source={require('../Images/subscribenumber.png')}
                      style={Style.ButtonStyle}
                >
                    <Text
                    style={Style.TextStyle}
                    >{stringsoflanguages.subscribeno}</Text>
                    </ImageBackground>

                    <TextInput
                    style={Style.inputStyle}
                    >

                    </TextInput>
                </View>
            </View>
            <View style={Style.containerStyle}>
                <View style={{flexDirection: 'row'}}>
                <ImageBackground
                      source={require('../Images/idnumber.png')}
                      style={Style.ButtonStyle}
                >
                    <Text
                    style={Style.TextStyle}
                    >{stringsoflanguages.idnumber}</Text>
                    </ImageBackground>
                    <TextInput
                    style={Style.inputStyle}
                    >

                    </TextInput>
                </View>
            </View>
            <View style={Style.containerStyle}>
                <View style={{flexDirection: 'row'}}>
                <ImageBackground
                      source={require('../Images/phonenumber.png')}
                      style={Style.ButtonStyle}
                >
                    <Text
                    style={Style.TextStyle}
                    >{stringsoflanguages.phone}</Text>
                    </ImageBackground>
                    <TextInput
                    style={Style.inputStyle}
                    >

                    </TextInput>
                </View>
            </View>
            <View style={Style.containerStyle}>
                <View style={{flexDirection: 'row'}}>
                <ImageBackground
                      source={require('../Images/area.png')}
                      style={Style.ButtonStyle}
                >
                    <Text
                    style={{color: 'white', textAlign: 'center'}}
                    >{stringsoflanguages.area}</Text>
                    </ImageBackground>
                    <TextInput
                    style={Style.inputStyle}
                    >

                    </TextInput>
                </View>
            </View>
                <TextInput
                style={{width: '95%',
                height: 70,
                borderWidth: 0.5,
                borderRadius: 7,
                shadowOpacity: 10,
                shadowRadius: 7,
                marginLeft: 6,
                marginRight: 20,
                marginTop: 20,
                backgroundColor: 'white'}}
                />
            </View>
            <View style={{marginTop: 35, marginLeft: 10, justifyContent: 'center'}}>
            
            <View>
            <RadioForm
            radio_props={radio_props}
            initial={0}
            labelStyle={{fontSize:22, paddingTop:5}}
            onPress={(value) => {this.setState({value:value})}}

            />
            </View>

            </View>
            <View style={{alignItems: 'center', marginTop: 50  }}>
            <TouchableOpacity onPress={this.paypal}>
                {/* ()=>Alert.alert('hey','message',[
               {
                     'text':'ok',
                     onPress:()=>{
                         this.props.navigation.dispatch(StackActions.reset({
                             index:0,
                             actions: [
                                 NavigationActions.navigate({ routeName: 'SignIn' })
                             ],
                         }))
                     }
                 }
             ])}> */}
                <ImageBackground
                style={{width: 269, height: 80, justifyContent: 'center', alignItems: 'center'}}
                source={require('../Images/orderButton.png')}
                >
                <Text style={{color: 'white', fontSize: 24}}>{stringsoflanguages.createorder}</Text>
                </ImageBackground>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </ImageBackground>
            </SafeAreaView>
            
        );
    }
}

const Style= {
    // TextStyle: {paddingTop: 10,
    // paddingBottom: 10,
    // fontSize: 18,
    // textAlign: 'justify',
    // paddingLeft: 5,
    // paddingRight: 5
    // },
    ButtonStyle: {
        width: 131,
        height: 43,
        justifyContent: 'space-around'
    },
    inputStyle: {
        width: '63%',
        height: 43,
        borderWidth: 0.5,
        borderRadius: 7,
        shadowOpacity: 0.2,
        shadowRadius: 7,
        marginLeft: 6,
        backgroundColor: 'white',
        paddingRight: 10,
        paddingLeft: 10

    },

    TextStyle: {
        color: 'white',
        // TextStyle: 'center',
        paddingLeft: 50,
        paddingRight: 5
    },

    containerStyle: {
        margintop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5
    }
}

export default Subscribepage;