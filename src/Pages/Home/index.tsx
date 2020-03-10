import React  from 'react';
// import React,  { useEffect, useState }  from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { Button, message } from 'antd';
import './style.css';


// interface State {
//     isLogin: boolean
// }
// 范型里面可以包含另外一个范型，这样就可以使得 props 有语法提示
// class Home extends React.PureComponent<{}, State> {

interface CourseItem {
    title: string;
    count: number;
}
interface State {
    isLogin: boolean;
    data: {
        [key: string] : CourseItem[]
    }
}

interface LineData {
    name: string;
    type: string;
    data: number[];
}

class Home extends React.PureComponent {
    // 同样可以把 state 定义在这里，props 也可以得到类型提示
    state: State = {
        isLogin : true,
        data: {}
    };
    constructor(props: {}) {
        super(props);
    }
    componentDidMount() {
        this.checkLoginStatus('/api/isLogin');
        this.showData();
    }

    checkLoginStatus = async (url: string) =>  {
        const res = await axios.get(url);
        if (!res.data?.data) {
            this.setState({
                isLogin : false,
            })
        }
    }

    handleLogoutClick = async () => {
        const res = await axios.get('/api/logout');
        if (res.data?.data) {
            this.setState({
                isLogin : false,
            })
        }
    }

    handleCrawllerClick = async () => {
        const res = await axios.get('/api/getData');
        if (res.data?.data) {
            message.success('Crawl Successfully!')
        } else {
            message.error('Crawl Failed!')
        }
    }

    showData = async () => {
        const res = await axios.get('/api/showData');
        if (res.data?.data) {
            this.setState({
                data: res.data.data
            });
        } 
    }
    
    // get from echarts definition file
    getOptions:() => echarts.EChartOption =  () => {
     const { data } = this.state;
     const courseNames: string[] = [];
     const times: string[] = [];
     const tempData : {
         [key: string] : number[];
     } = {};
     for (let i in data) {
         const item = data[i];
         times.push(moment(Number(i)).format('MM/DD HH:mm'));
         item.forEach(innerItem => {
             const { title, count } = innerItem;
             if (courseNames.indexOf(title) === -1) {
                 courseNames.push(title);
             }
             tempData[title] ? tempData[title].push(count) : (tempData[title] = [count]);
         })
     }
     const result: LineData[] = [];
     for(let i in tempData) {
        if(tempData[i].length !== 0) {
            result.push({
                name: i,
                type: 'line',
                data: tempData[i]
            })
        }
     }
    
     return {
            title: {
                text: 'Online Course Learners'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: courseNames
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: times
            },
            yAxis: {
                type: 'value'
            },
            series: result
        };        
    }

   render() {
       const { isLogin } = this.state;
       if (isLogin) {
        return (
            <div className="home-page">
              <div className="buttons">
                <Button type="primary" onClick={this.handleCrawllerClick}>Crawl</Button>
                <Button type="primary" onClick={this.handleLogoutClick}>Exit</Button>
              </div>
              <ReactEcharts option={this.getOptions()} />
            </div>
          )
       }
       return <Redirect to="/login"/>
   } 
}

// Hook 版本： 
// 返回类型是 React.FC 也可以
// const Home1: () => JSX.Element = () => {

//     const [isLogin, setLogin] = useState(false);
    
//     async function checkLoginStatus(url: string) {
//         const res = await axios.get(url);
//         if (res.data?.data) {
//             setLogin(true);
//             console.log('Login Already')
//         } else {
//             setLogin(false);
//             console.log('No Login')
//         }
//     }
//     useEffect(() => {
//         checkLoginStatus('/api/isLogin');
//     })
//     return (
//         <div className="home-page">
//             <Button type="primary" >Crawl</Button>
//             <Button type="primary">Display</Button>
//             <Button type="primary">Exit</Button>
//         </div>
//     )
// }

export default Home;