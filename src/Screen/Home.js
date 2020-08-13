import React, { Component } from 'react';
import { FlatList,Text, View, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView,Modal, AsyncStorage,StyleSheet } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import axios from 'axios';
import SchoolTypeScroll from './SchoolTypeScroll';
import _ from 'lodash';
import { StackActions, NavigationActions, SafeAreaView} from 'react-navigation';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Bilingual from './Bilingual';
import Islamic from './Islamic';
import AllSchool from './AllSchool';
import Trilingual from './Trilingual';
import Special from './Special';
import Sevenpetal from './Sevenpetal';
import Montessori from './Montessori';
import stringOfLanguage from './stringOfLanguage';
// import Modal from 'react-native-modal';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Menu, { MenuItem, MenuDivider, Position,stickTo} from "react-native-enhanced-popup-menu";
// import Popup from './Popup';


class Home extends Component {
     
  _menu = null;

  setMenuRef = ref => {
      this._menu = ref;
    };
   
    hideMenu = () => {
      this._menu.hide();
    };
   
    showMenu = () => {
      this._menu.show();
      
      
    };

    nearBy = () => {
      // this.hideMenu();
      this.setState({filtermodal:!this.state.filtermodal,Allicon:false,registericon:false,vacanticon:false,nearicon:!this.state.nearicon})
      const {longitude} = this.state;
      const {latitude} = this.state;

      axios.post('https://thetinyland.com/api/Api/getNearMeSchool',{
          latitude : latitude,
          longtitude: longitude
      }).then((response) => {
        // console.log(response);
        const data2 = response['data']
        const data = data2['data']
        // console.log(data);
        this.setState({
          nurseryList:data
        })
      })
    }



        state = {nurseryList: [], filtermodal:false,Allicon:true,vacanticon:false,registericon:false,nearicon:false}


        // basestate = this.state.nurseryList
        url = "https://thetinyland.com//uploads/cover_images/"

        loadSession = async() => {
          this.setState({
            userid:await AsyncStorage.getItem('userid')
          })

          // console.log(this.state.userid)
        }
        
          
        
      
        // componentWillUnmount() {
        //   BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        // }
      
        // onBackPress = () => {
        //   return true; 
        // }

        componentDidMount=()=>{
          this.loadSession().done();
         
            axios.post('https://thetinyland.com/api/Api/nurseryList' )
            .then((response) => {
                
                // console.log(response.data)
                const album = response.data
                var newalbum = album.data
                var vacantdata = album.data
                var registrationdata = album.data
                // const registration = newalbum['school_name']
                // console.log(registration);
                
                this.setState({
                    nurseryList:newalbum
                })
                this.setState({
                    data:newalbum
                })
                this.setState({
                  vacantData: vacantdata
                })
                this.setState({
                  registrationData:registrationdata
                })
            })

            Geolocation.getCurrentPosition((position) => {
                  // console.log(position);
                  var cord = position['coords']
                  this.setState({
                    longitude:cord['longitude'],
                    latitude:cord['latitude']
                  })
            })

          //   Geolocation.getCurrentPosition(
          //     (position) => {
          //         console.log(position);
          //         var cord= position['coords']
          //         this.setState({
          //           longitude:cord['longitude'],
          //           latitude:cord['latitude']
  
          //         })
                  
          //     },
          //     (error) => {
          //         // See error code charts below.
          //         console.log(error.code, error.message);
          //     },
          //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          // );
      
  
        }
        // setDefaultNurseryList = () => {
        //   this.hideMenu();
        //   var value= _.filter(this.state.nurseryList, { registration_open: "0" })
        //   this.setState({
        //    nurseryList:value
        //   })  
        // }


      All=()=>{
        // this.hideMenu();
        this.setState({Allicon:!this.state.Allicon,vacanticon:false,registericon:false,nearicon:false, filtermodal:!this.state.filtermodal})
          // this.state.nurseryList
          this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' })
          ],
        }))
        
      }
      vacant=(value)=> {
        // this.hideMenu();
        this.setState({filtermodal:!this.state.filtermodal,vacanticon:!this.state.vacanticon,Allicon:false,registericon:false,nearicon:false})
        
        var value= _.filter(this.state.vacantData, { registration_open: "0" })
                    this.setState({
                      nurseryList:value
                    })     
      }
      registration=(value)=> {
        // this.hideMenu();
        this.setState({filtermodal:!this.state.filtermodal,vacanticon:false,Allicon:false,nearicon:false,registericon:!this.state.registericon})
        var value= _.filter(this.state.registrationData, { registration_open: "1" })
        this.setState({
        nurseryList:value
   }) 
       
            
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
            // alert(text)
            
            var recipeArray1 = this.getRecipesByRecipeName(text);
            // var recipeArray2 = getRecipesByCategoryName(text);
            // var recipeArray3 = getRecipesByIngredientName(text);
            // alert(recipeArray1)
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

       

        renderList () {
        return this.state.nurseryList.map(nurseryList => 
        <Text key={nurseryList.id}>{nurseryList.address}</Text>
            );
        }

        selectmodal=()=>{
          this.setState({filtermodal:!this.state.filtermodal})
        }

    render() {
        // console.log(this.state.nurseryList);
      
        return(
          <SafeAreaView>
                <Modal

                      visible={this.state.filtermodal}

                      transparent={true}

                      animationType={'fade'}

                      // onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} }
                       >

                      <View style={{ flex:1,  alignItems:'flex-end', justifyContent:'flex-end', backgroundColor: 'rgba(0,0,0,.5)' }}>


                      <View style={Styles.Alert_Main_View}>


                      <Text style={{color:'#ffffff',paddingBottom:10,paddingLeft:10,fontSize:15}}>Sort by</Text>    
                      <TouchableOpacity onPress={this.All}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>

                      <Text style={Styles.textstyle}>{stringOfLanguage.all}</Text>

                      {this.state.Allicon?
                      <Image
                      source={require('../Images/right.png')}
                      style={{height:25,width:20,resizeMode:'contain'}}
                      />:null
                      }
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.vacant}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>

                      <Text style={Styles.textstyle}>{stringOfLanguage.vacant}</Text>

                      {this.state.vacanticon?
                      <Image
                      source={require('../Images/right.png')}
                      style={{height:25,width:20,resizeMode:'contain'}}
                      />:null
                      }
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.registration}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>

                      <Text style={Styles.textstyle}>{stringOfLanguage.registrationOpen}</Text>

                      {this.state.registericon?
                      <Image
                      source={require('../Images/right.png')}
                      style={{height:25,width:20,resizeMode:'contain'}}
                      />:null
                      }
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.nearBy}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>

                      <Text style={Styles.textstyle}>{stringOfLanguage.near}</Text>

                      {this.state.nearicon?
                      <Image
                      source={require('../Images/right.png')}
                      style={{height:25,width:20,resizeMode:'contain'}}
                      />:null
                      }
                      </View>
                      </TouchableOpacity>
                      <View style={{justifyContent:'center',alignItems:'center',width:'100%',marginBottom:10}}>
                      <View style={{height:40,width:140}}>
                      <TouchableOpacity onPress={()=>this.setState({filtermodal:!this.state.filtermodal})} style={{flex:2,alignSelf:'stretch',backgroundColor:'#000',borderRadius:20,borderWidth:1,borderColor:'#fff',marginLeft:5,marginRight:5}}>
                          <Text style={{alignSelf:'center',color:'#fff',fontSize:16,fontWeight:'600',paddingTop:10,paddingBottom:10}}>Cancel</Text>
                      </TouchableOpacity>
                      </View>
                      </View>
                      </View>

                      </View>
                </Modal>
                  <ImageBackground
                  source={require('../Images/background.png')}
                          style={{width: '100%', height: '100%'}}
                  >
                  <ImageBackground
                  source={require('../Images/topheader.png')}
                  style={{height:70,width:431}}
                  >
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity  onPress={() => this.props.navigation.toggleDrawer({
                      // params:"20"
                    })}>
                    <Image
                        source={require('../Images/more.png')}
                        style={{height: 23, width: 29, marginLeft: 10, marginTop: 20}}
                    />
                    </TouchableOpacity>
                    <Image
                        source={require('../Images/logo.png')}
                        style={{height: 57, width: 85, marginLeft: "27%", marginTop: 5}}
                    />
                    </View>
                  </ImageBackground>  
                    <View style={{flexDirection: 'row'}}>
                    
                    <View style={{height: 40, borderWidth: 1, borderRadius: 10, marginTop: 20, marginLeft: 20,marginRight: 5, flexDirection: 'row'}}>
                        <Image
                            source={require('../Images/Search.png')}
                            style={{width: 24, height: 24, marginTop: 6, marginLeft: 4,resizeMode:'contain'}}
                        />
                        <TextInput
                            style={{width:260,fontSize: 17}}
                            placeholder= {stringOfLanguage.searchnurseries}
                            onChangeText={text => this.handleSearch(text)}
                        />
                        
                        </View>
                        <TouchableOpacity onPress={()=>this.selectmodal()}>
                        <View style={{justifyContent:'center',paddingTop:20,paddingLeft:20}}>
                              <Image
                                  source={require('../Images/filter.png')}
                                  style={{width: 45, height: 30,resizeMode:'contain' }}
                              />
                        </View>
                        </TouchableOpacity>
                        {/* <View>
                        <Menu
            ref={this.setMenuRef}
            button={<TouchableOpacity style={{marginLeft:10, marginTop: 24}} onPress={this.showMenu}>
              <Image
                source={require('../Images/filter.png')}
                style={{width: 45, height: 30, }}
               
            />
            </TouchableOpacity>}
          >
            <MenuItem onPress={this.All}>{stringOfLanguage.all}</MenuItem>
            <MenuDivider />
            <MenuItem onPress={this.vacant}>{stringOfLanguage.vacant}</MenuItem>
            <MenuDivider />
            <MenuDivider />
            <MenuItem onPress={this.registration}>{stringOfLanguage.registrationOpen}</MenuItem>
            
            <MenuDivider />
            <MenuItem onPress={this.nearBy}>{stringOfLanguage.near}</MenuItem>
          </Menu>      
                        </View> */}
                        {/* <Menu
                            ref={this.setMenuRef}
                            // style={{left:0}}
                        > */}
                          {/* <MenuItem>Sort By</MenuItem> */}
                          


                        {/* </Menu> */}
                    </View>
                    {/* <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 22,fontFamily: 'Poppins'}}>{stringOfLanguage.Nurseries}</Text>
                        
                    </View> */}
                    <ScrollableTabView
            style={{marginTop: 5}}
            tabBarTextStyle={{fontFamily : 'Poppins', fontSize: 14}}
            tabBarActiveTextColor={'#008c99'}
            tabBarUnderlineStyle={{height: 3, backgroundColor: '#008c99'}}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar
                    // style={{backgroundColor: "transparent"}}
                />}
            
          >
              
            <AllSchool tabLabel={stringOfLanguage.all} data={this.state.nurseryList} />
            
            <Bilingual tabLabel={stringOfLanguage.bilingual} data={this.state.nurseryList} />
            <Islamic tabLabel={stringOfLanguage.islamic} data={this.state.nurseryList}/>
            <Trilingual tabLabel={stringOfLanguage.trilingual} data={this.state.nurseryList} />
            <Special tabLabel={stringOfLanguage.Special} data={this.state.nurseryList} />
            <Sevenpetal tabLabel={stringOfLanguage.seven} data={this.state.nurseryList} />
            <Montessori tabLabel={stringOfLanguage.montessori} data={this.state.nurseryList}/>

            
            </ScrollableTabView>
                    {/* <SchoolTypeScroll data={this.state.nurseryList}  /> */}
                    
        </ImageBackground>
        </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
  Alert_Main_View:{
     
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor : "#000000", 
    height: "30%" ,
    width: '100%',
    paddingLeft:10,
  },
  textstyle: {
    color:'#ffffff',
    fontSize:20,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20
  },

})

export default Home;