import React  from 'react';
// import React,  { useEffect, useState }  from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import { Button, message } from 'antd';
import './style.css';


// interface State {
//     isLogin: boolean
// }
// 范型里面可以包含另外一个范型，这样就可以使得 props 有语法提示
// class Home extends React.PureComponent<{}, State> {


class Home extends React.PureComponent {
    // 同样可以把 state 定义在这里，props 也可以得到类型提示
    state = {
        isLogin : true
    };
    constructor(props: {}) {
        super(props);
    }
    componentDidMount() {
        this.checkLoginStatus('/api/isLogin');
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
    
    // get from echarts definition file
    getOptions:() => echarts.EChartOption =  () => {
     return {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
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