import React, {Component} from 'react';
import {FlatList,Text, View, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { withNavigation } from 'react-navigation';
import stringOfLanguage from './stringOfLanguage';



class AllSchool extends Component{


  

  data = this.props.data

    state = {nurseryList: []}

        url = "https://thetinyland.com//uploads/cover_images/"
      

        componentDidMount=()=>{
           
            // axios.post('https://thetinyland.com/api/Api/nurseryList' )
            // .then((response) => {
                
            //     // console.log(response.data)
            //     const album = response.data
            //     var newalbum = album.data
            //     //const data = response.data
            //     // console.log(newalbum.length);
                
            //     this.setState({
            //         nurseryList:newalbum
            //     })
            //     this.setState({
            //         data:newalbum
            //     })
                 
            // })
            
        }


        getSchool=(categoryId)=> {
            const schoolArray = [];
            this.state.nurseryList.map(data => {
              if (data.id == categoryId) {
                schoolArray.push(data);
              }
            });
            return schoolArray;
          }

          getRecipesByRecipeName(schoolName) {
            const nameUpper = schoolName.toUpperCase();
            const schoolArray = [];
            this.state.nurseryList.map(data => {
              if (data.school_name.toUpperCase().includes(nameUpper)) {
                schoolArray.push(data);
              }
            });
            return schoolArray;
          }
        

          handleSearch = text => {
            var recipeArray1 = this.getRecipesByRecipeName(text);
            // var recipeArray2 = getRecipesByCategoryName(text);
            // var recipeArray3 = getRecipesByIngredientName(text);
            var aux = recipeArray1
            var schoolArray = [...new Set(aux)];
            if (text == '') {
              this.setState({
                value: text,
                nurseryList: this.state.data
              });
            } else {
              this.setState({
                value: text,
                nurseryList: schoolArray
              });
            }
          };

       

        // renderList () {
        // return this.state.nurseryList.map(nurseryList => 
        // <Text key={nurseryList.id}>{nurseryList.address}</Text>
        //     );
        // }
        renderSchool = ({ item }) => (
            <View style={Styles.containerStyle}>
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
                
                <View style={{marginTop:5, width: "60%"}}>
                <View style={{flexDirection:'row'}}>
                
                <Image
                        source={require('../Images/school_logo.png')}
                        style={{width: 10, height: 15,marginRight:5,marginTop:2}}
                    />
                
                <Text style = {Styles.textContainer}>{item.school_name}</Text>
                </View>
                <View style={{flexDirection:'row',width:180}}>
                
                <Image
                    source={require('../Images/location.png')}
                    style={{width: 10, height: 15, marginRight:5,marginTop:5}}
                />
                <Text style={Styles.textContainer}>{item.city}</Text>
                </View>  
                
                </View>
                <View style={{width:"40%",position: 'relative'}}>
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
          );


    render(){
      // console.log(this.props.data)
        return(
            <ScrollView>   
            <View style={{marginTop: 10}}>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.props.data}
              renderItem={this.renderSchool}
              keyExtractor={item => `${item.id}`}
            />
            </View>
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
        maxWidth:'90%',
        // Height:'auto'
    }
}
export default withNavigation(AllSchool);