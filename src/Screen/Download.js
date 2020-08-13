import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';
// import RNFetchBlob from "react-native-fetch-blob";
import stringOfLanguage from './stringOfLanguage';
import RNFS from 'react-native-fs';
import Axios from 'axios';
class Download extends Component {

    


    data = this.props.data
    nurseryDoc = this.data['nurseryDoc']
    document = this.nurseryDoc['document']
   
    url = "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http%3a%2f%2fcdni.autocarindia.com%2fExtraImages%2f20191230104226_Tata-H2X-SUV-concept-ex.jpg&h=578&w=872&c=0"
    
    
        
      
      downloadFileBegin = () =>{
        console.log("Downloading");
      }
      
      downloadFileProgress = (data) =>{
        const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
        const text = `Progress ${percentage}%`;
        // console.log(text);
        if(text=='Progress 100%') {
            alert('Dowload Completed Successfully');
        }
      }

      download = (document,nurserydoc_name,user_id,document_id,nursery_id) => {
          
var RNFS = require('react-native-fs');
 
// create a path you want to write to
 var path = RNFS.DocumentDirectoryPath;
 RNFS.downloadFile({ fromUrl: document,
toFile: `${RNFS.DocumentDirectoryPath}/${nurserydoc_name}`,
background: true,
begin: this.downloadFileBegin,
progress: this.downloadFileProgress

    })
    Axios.post('https://thetinyland.com/api/Api/getDownloadDetails',{
        user_id:user_id,
        document_id:document_id,
        nursery_id:nursery_id
    }).then((response) => {
        console.log(response);
    })

}


    render(){
        console.log(this.nurseryDoc)
        return(
            <ImageBackground
            source={require('../Images/background.png')}
            style={{width: "100%", height: "100%"}}
            >
                { this.nurseryDoc.map(value =>

            <View style={Styles.viewcontainer}>
                <Text style={{fontSize: 20, fontWeight: '800', marginTop: 15,fontFamily : 'Poppins'}}>
                    {value.nurserydoc_name}
                </Text>
                <TouchableOpacity onPress={()=>
                this.download(value.document,value.nurserydoc_name,value.user_id,value.document_id,value.nursery_master_id)}>
                <ImageBackground
                source={require('../Images/registration_button.png')}
                style={{width: 135, height: 35, marginTop: 15, alignItems: 'center', marginRight: 10}}
                >
                <Text style={{color: '#ffffff',fontFamily : 'Poppins'}}>{stringOfLanguage.download}</Text>
                <Image
                source={require('../Images/download.png')}
                style={{width: 12, height: 15, marginBottom: 15 }}
                >
                        
                </Image>
                </ImageBackground>
                </TouchableOpacity>
            </View>
        )
                }
            </ImageBackground>
        );
    }
}

const Styles = {
    viewcontainer:{
        borderWidth: 0.1,
        height: 60,
        borderRadius: 2,
        borderColor: 'black',
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 20,
        PaddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        

        
        
        
    }
}

export default withNavigation(Download);