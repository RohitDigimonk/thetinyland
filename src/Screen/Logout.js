import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

class Logout extends Component{

 
    
    logout=async()=>{
        // // console.log(this.state.userid)
        // var value = await AsyncStorage.removeItem('userid')
        // alert(value)
        // if(value == null){
        //     this.props.navigation.navigate('SignIn')
        // }
        // return null
        alert("hello")
    }

    render(){
        this.logout()
        return(
         null 
        );
    }
}

export default Logout;