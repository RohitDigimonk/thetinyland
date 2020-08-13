import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

class Event extends Component{

    data = this.props.data
    event = this.data['event']
   
    url = "https://digimonk.co/tinyland//uploads/event_images/"

    render(){
         console.log(this.event);
       
        

        return(
    <ScrollView>
        {
            this.event.map( value=>
                <View>
                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, paddingLeft: 10, paddingRight: 10}}>
                    {value.event_image!=""?<Image
                        source={{uri:this.url+value.event_image}}
                        style={{height:120, width: 150, borderRadius: 6}}
                    />:<Image
                        source={require('../Images/event.png')}
                        style={{height:120, width: 150, borderRadius: 6}}
                    />}
                    <View style={{paddingLeft: 30, width: 230, }}>
                    <View style={{flexDirection: 'row'}}>
                    <Image
                        source={require('../Images/calendar.png')}
                        style={{height: 17, width: 16, marginTop: 10}}
                    />
                    <Text style={{paddingLeft: 10,fontFamily : 'Poppins', paddingTop: 10}}>{value.event_date}</Text>
                    
                    </View>
                    <Text style={{paddingLeft: 45,fontFamily : 'Poppins', paddingTop: 2}}> To </Text>
                    <View style={{flexDirection: 'row'}}>
                    <Image
                        source={require('../Images/calendar.png')}
                        style={{height: 17, width: 16, marginTop: 2}}
                    />
                    <Text style={{paddingLeft: 10,fontFamily : 'Poppins', paddingTop: 2}}>{value.event_enddate}</Text>
                    </View>
                    <Text style={{fontSize: 18,paddingTop: 10, paddingBottom: 10,fontFamily : 'Poppins'}}>{value.event_name}</Text>
                    </View>
                </View>
                <View>
               <Text style={{textAlign:'justify',fontFamily : 'Poppins',marginLeft: 10,marginRight:5, paddingRight:10}}>{value.event_description}</Text>
               </View>
               </View>
            )
        }
    </ScrollView>
        );
    }
}



export default Event;