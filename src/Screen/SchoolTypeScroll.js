import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Bilingual from './Bilingual';
import Islamic from './Islamic';
import AllSchool from './AllSchool';
import Trilingual from './Trilingual';
import Special from './Special';
import Sevenpetal from './Sevenpetal';
import Montessori from './Montessori';

class SchoolTypeScroll extends Component{
    render(){
        // console.log()
        return(
            
            <ScrollableTabView
            style={{marginTop: 5}}
            tabBarTextStyle={{fontFamily : 'Poppins'}}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar
                    // style={{backgroundColor: "lightgrey"}}
                />}
            
          >
              
            <AllSchool tabLabel='All' data={this.props.data} />
            
            <Bilingual tabLabel='Bilingual' data={this.props.data} />
            <Islamic tabLabel='Islamic' data={this.props.data}/>
            <Trilingual tabLabel='Trilingual nursery' data={this.props.data} />
            <Special tabLabel='Special needs' data={this.props.data} />
            <Sevenpetal tabLabel='Seven petal education' data={this.props.data} />
            <Montessori tabLabel='Montessori curriculum' data={this.props.data}/>

            
            {/* <Subscription tabLabel='Subscription' data={this.props.data} />
            <Event tabLabel='Event & Activities' data={this.props.data}/>
            <Download tabLabel='Nurseries' data={this.props.data} /> */}
            </ScrollableTabView>
        
          
        );
    }
}

export default SchoolTypeScroll;