import React  from 'react';
// import React,  { useEffect, useState }  from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import './style.css';


// interface State {
//     isLogin: boolean
// }
// 范型里面可以包含另外一个范型，这样就可以使得 props 有语法提示
// class Home extends React.PureComponent<{}, State> {


class Home extends React.PureComponent {
    // 同样可以把 state 定义在这里，props 也可以得到类型提示
    state = {
        // loaded: false,
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
        // this.setState({
        //     loaded: true
        // })
    }

    handleLogoutClick = async () => {
        const res = await axios.get('/api/logout');
        if (res.data?.data) {
            this.setState({
                isLogin : false,
            })
        }
        // this.setState({
        //     loaded: true
        // })
    }

   render() {
       // const { isLogin, loaded} = this.state;
       const { isLogin } = this.state;
       if (isLogin) {
        return (
            <div className="home-page">
              <Button type="primary" >Crawl</Button>
              <Button type="primary">Display</Button>
              <Button type="primary" onClick={this.handleLogoutClick}>Exit</Button>
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