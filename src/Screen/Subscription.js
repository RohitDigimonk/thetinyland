import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import stringOfLanguage from './stringOfLanguage';

class Subscription extends Component{

    data = this.props.data
    subscription = this.data['subscription']
    // subscription_id = this.subscription['subscription_id']
    // subscription_id = this.subscription['subscription_id']
    // nursery_id = this.subscription['nursery_id']
    
    // subscription_name = this.subscription['subscription_name']
   
    url = "https://thetinyland.com/uploads/subscription_images/"



    render(){
        // console.log(this.subscription);
       
        

        return(
    <ScrollView>
        {
            
            this.subscription.map( value=>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Subscribepage',
                {subscription_id:value.subscription_id,nursery_id:value.nursery_id,user_id:value.user_id})}>
                <ImageBackground
                    source={{uri: this.url+value.subscription_image}}
                    style={Styles.subbanner}
                >
                <View style={Styles.overlay}>
                <View style={Styles.container}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF',fontFamily : 'Poppins'}}>{value.subscription_name}
                </Text>
                <Text style={{fontSize: 14,fontFamily : 'Poppins', fontWeight: '700', color: '#FFFFFF'}}>{value.subscription_description}
                </Text>
                <Text style={{fontSize: 20,fontFamily : 'Poppins', fontWeight: 'bold', color: '#FFFFFF' }}>{value.subscription_price}
                </Text>
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Subscribepage')}> */}
                <ImageBackground
                    source={require('../Images/registration_button.png')}
                    style={{width: 135, height: 32, justifyContent: 'center', alignItems: 'center'}}
                >
    <Text style={{color: '#ffffff', fontSize: 18, fontFamily : 'Poppins'}}>{stringOfLanguage.subscribe}</Text>
                </ImageBackground>
                {/* </TouchableOpacity> */}
                </View>
                </View>
                </ImageBackground>
                </TouchableOpacity>
            )
        }
    </ScrollView>
        );
    }
}

const Styles = {
    subbanner: {
        width: "99%",
        height: 200,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
    },
    overlay:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 4,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }, 
    container: {
        flex: 1,
        width:'99%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        // borderRadius: 15,
        // borderColor: 'grey',
        // shadowOpacity: 20

    }
}


export default withNavigation(Subscription);