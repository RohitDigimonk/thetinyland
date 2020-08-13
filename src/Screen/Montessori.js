import React, {Component} from 'react';
import {Text,View, TouchableOpacity, ImageBackground, Image, ScrollView} from 'react-native';
import { withNavigation } from 'react-navigation';
import stringOfLanguage from './stringOfLanguage';
class Montessori extends Component{

    url = "https://thetinyland.com//uploads/cover_images/"

    data = this.props.data
    



    render(){
        console.log(this.data)
        return(
            <ScrollView>{
            this.data.map(item=>
                 {
                     if(item.school_type == "Montessori curriculum")
                 return <View style={Styles.containerStyle}>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('SchoolDashboard', { item })}>
                <View>
                 <ImageBackground
                     source={{uri: this.url+item.cover_image}}
                     style={{width: "100%", height: 220}}
                     resizeMode= 'contain'
                 >
                   </ImageBackground>
                   </View>
                   <View style={Styles.detailContainer}>
                     
                     <View style={{marginTop:5,width:'60%'}}>
                     <View style={{flexDirection:'row',alignContent:'center'}}>
                     
                     <Image
                             source={require('../Images/school_logo.png')}
                             style={{width: 10, height: 15,marginRight:5,marginTop:2}}
                         />
                     
                     <Text style={Styles.textContainer}>{item.school_name}</Text>
                     </View>
                     <View style={{flexDirection:'row'}}>
                     
                     <Image
                         source={require('../Images/location.png')}
                         style={{width: 10, height: 15, marginRight:5,marginTop:5}}
                     />
                     <Text style={Styles.textContainer}>{item.city}</Text>
                     </View>  
                     
                     </View>
                     <View style={{width:'40%'}}>
                     {item.registration_open==1?
                         <ImageBackground
                             source={require('../Images/registration_button.png')}
                             style={{width: 135, height: 32, alignItems: 'center', justifyContent: 'center'}}
                         >
                             <Text style={{fontFamily : 'Poppins',color:'#ffffff'}}>
                                {stringOfLanguage.registrationOpen}
                             </Text>
     
                         </ImageBackground>:<ImageBackground
                             source={require('../Images/vacation_button.png')}
                             style={{width: 141, height: 36, alignItems: 'center', justifyContent: 'center'}}
                         >
                             <Text style={{fontFamily : 'Poppins',color:'#ffffff'}}>
                                {stringOfLanguage.vacant}
                             </Text>
     
                         </ImageBackground>
                        }
                         </View>
                     
                     </View>
                 </TouchableOpacity>
         </View>
                 }
    
            )
    }
    </ScrollView>      
          );

        
    }
} 
const Styles = {
    containerStyle: {
        marginTop: 20, 
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        height: 'auto',
        backgroundColor: 'white',
        
    },
    detailContainer: {
      alignItems:'center',
      width: "100%",
      flexDirection:'row',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20
        
        
    },
    textContainer: {
        fontSize: 16,
        fontFamily : 'Poppins',
        maxWidth:180,
        Height:'auto'
    }
}
export default withNavigation(Montessori);