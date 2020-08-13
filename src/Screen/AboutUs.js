import React, {Component} from 'react';
import { Text, View, ImageBackground, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import stringOfLanguage from './stringOfLanguage';
import SchoolSwiper from '../common/schoolSwiper';

class AboutUs extends Component {
    //     state = {AboutUs: []}
    // componentDidMount=()=>{
    //     Axios.post('https://thetinyland.com/api/Api/aboutusByID/',{
    //         id: 77
    //     })
    //     .then((response) =>{
    //         const AboutUs = response.data
    //         const About = AboutUs.data
    //         const Abou = About.about_school
    //         // const About = AboutUs.About
    //         this.setState({
    //             AboutUs: Abou
    data = this.props.data
    management_name = this.data['management_name']
    superviser = this.data['superviser'] 
    Teacher = this.data['teacher']
    methodology = this.data['methodology']
    mapUrl = this.data['mapUrl']
    social = this.data['social']
    mapLink = this.data['mapLink']
    instagram=""
    // instagram = this.social.split(',')

    render() {
        if(!this.social==""){
           this.instagram = this.social.split(',')
        }
        else{
            this.instagram=[]
        }
        

        // console.log(this.instagram);
        // console.log(this.props.children);
        return(
            <ScrollView>
                  
            <SchoolSwiper data = {this.data}/>
            <View>
              <Text style={{textAlign: 'justify',margin:10,fontFamily : 'Poppins'}}>{this.props.data['about_school']}</Text>
            </View>
            <View>
               {
                   this.instagram.map(value =>
                    <Text style={{textAlign: 'justify',margin:10,fontFamily : 'Poppins'}}>{value=='0'?"":value}</Text>
                   )
               }
            </View>
            <View style={Styles.containerstyle}>
                <ImageBackground
                    source={require('../Images/blue.png')}
                    style={{width: 175, height: 55, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Image
                    source={require('../Images/members.png')}
                    style={{width: 13, height: 16}}
                    />
                    <Text style={Styles.textstyle}>
                        {stringOfLanguage.management}
                    </Text>
                </ImageBackground>
                <ImageBackground
                    source={require('../Images/black.png')}
                    style={{width: 175, height: 55, justifyContent: 'center', alignItems: 'center'}}
                >
                    
                    <Text style={Styles.textstyle}>
                        {this.management_name}
                    </Text>
                </ImageBackground>

            </View>
            <View style={Styles.containerstyle}>
                <ImageBackground
                    source={require('../Images/blue.png')}
                    style={{width: 175, height: 55, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Image
                    source={require('../Images/members.png')}
                    style={{width: 13, height: 16}}
                    />
                    <Text style={Styles.textstyle}>
                        {stringOfLanguage.number}
                    </Text>
                </ImageBackground>
                <ImageBackground
                    source={require('../Images/black.png')}
                    style={{width: 175, height: 55, justifyContent: 'center', alignItems: 'center'}}
                >
                    
                    <Text style={Styles.textstyle}>
                        {this.superviser} {stringOfLanguage.supervisers}
                    </Text>
                </ImageBackground>

            </View>
            <View style={Styles.containerstyle}>
                <ImageBackground
                    source={require('../Images/blue.png')}
                    style={{width: 175, height: 55, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Image
                    source={require('../Images/members.png')}
                    style={{width: 13, height: 16}}
                    />
                    <Text style={Styles.textstyle}>
                        {stringOfLanguage.number} 
                    </Text>
                </ImageBackground>
                <ImageBackground
                    source={require('../Images/black.png')}
                    style={{width: 175, height: 55, justifyContent: 'center', alignItems: 'center'}}
                >
                    
                    <Text style={Styles.textstyle}>
                        {this.Teacher} {stringOfLanguage.teachers}
                    </Text>
                </ImageBackground>

            </View>
            <View style={Styles.containerstyle}>
                <ImageBackground
                    source={require('../Images/blue.png')}
                    style={{width: 175, height: 55, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Image
                    source={require('../Images/members.png')}
                    style={{width: 13, height: 16}}
                    />
                    <Text style={Styles.textstyle}>
                        {stringOfLanguage.methodology}
                    </Text>
                </ImageBackground>
                <ImageBackground
                    source={require('../Images/black.png')}
                    style={{width: 175, height: 55, justifyContent: 'center', alignItems: 'center'}}
                >
                    <ScrollView>
                    <Text style={Styles.textstyle}>
                        {this.methodology}
                    </Text>
                    </ScrollView>
                </ImageBackground>
                </View>
                <TouchableOpacity onPress={()=> Linking.openURL(this.mapLink)}>
                <View style={{marginTop: 10}}>
                    <Image
                    source={{uri: this.mapUrl }}
                    style = {{width: "100%", height: 300 }}
                    />
                </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const Styles = {
    textstyle : {
        color: '#ffffff',
        fontSize: 18,
        marginLeft: 2,
        fontFamily : 'Poppins'


    },
    containerstyle : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 3,
        marginBottom: 3,

    }
}

export default AboutUs;