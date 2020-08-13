import React, {Component} from 'react';
import {Text,View, ImageBackground, Image,SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import Axios from 'axios';
import stringsoflanguages from './stringOfLanguage';

class Services extends Component{

    state = {
        ourServicesOurPartners:''
    }


    componentDidMount = () => {
        Axios.post('https://thetinyland.com/api/Api/informativePageList')
        .then((response) => {
            const data = response['data']
            // console.log(data['data']);
            var alldata= data['data']
            console.log(alldata);
            var ourServicesOurPartners= alldata[1]
            console.log(ourServicesOurPartners)
            // const description = data.description
            this.setState({
                ourServicesOurPartners:ourServicesOurPartners
            })
            // console.log(description);
        })
    }


    render(){
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
                    {/* <Image
                        source={require('../Images/logo.png')}
                        style={{height: 57, width: 85, marginLeft: '24%', marginTop: 5}}
                    /> */}
                    </View>
                    <Text style={{fontFamily : 'Poppins', fontSize: 24,position: 'absolute'
                    ,alignSelf: 'center',paddingTop: 16}}>
                        {stringsoflanguages.our}
                    </Text>
                  </ImageBackground>
            
            
            <ScrollView style={{marginTop: 5}}>
            <View>
            
                <Text style={Style.TextStyle}>    
                    {this.state.ourServicesOurPartners['description']}
                 </Text>
            
            </View>
            </ScrollView>
            </ImageBackground>
            </SafeAreaView>
            
        );
    }
}

const Style= {
    TextStyle: {paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    textAlign: 'justify',
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily : 'Poppins'
    }
}

export default Services;