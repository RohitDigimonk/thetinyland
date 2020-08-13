import React, {Component} from 'react';
import {Text,View, ImageBackground,SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native';
import Axios from 'axios';
import stringsoflanguages from './stringOfLanguage';


class Why extends Component{

    state = {
        whyMyNursery:""
    }

    componentDidMount = () => {
        Axios.post('https://thetinyland.com/api/Api/informativePageList')
        .then((response) => {
            console.log(response);
            const data = response['data']
            const alldata = data['data']
            // console.log(alldata);
            const whyMyNursery = alldata[0]

            this.setState({
                whyMyNursery:whyMyNursery
            })
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
                    </View>
                    <Text style={{fontFamily : 'Poppins', fontSize: 24,position: 'absolute'
                    ,alignSelf: 'center',paddingTop: 16}}>
                        {stringsoflanguages.why}
                    </Text>
                    
                  </ImageBackground>
            
            
            <ScrollView style={{marginTop: 5}}>
            <View>
            
                <Text style={Style.TextStyle}>    
                    {this.state.whyMyNursery['description']}
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

export default Why;