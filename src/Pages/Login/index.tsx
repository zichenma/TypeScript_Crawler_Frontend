import React, { PureComponent } from 'react';
import request from '../../request';
import qs from 'qs';
import { Form, Icon, Input, Button, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import './style.css';
import { Redirect } from 'react-router-dom';
import responseResult from '../../responseResult'


interface FormFields {
  password: string;
}
interface Props {
  form: WrappedFormUtils<FormFields>;
}



class LoginForm extends PureComponent<Props> {
  state = {
      isLogin : false
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        request.post('/api/login', qs.stringify({
            password: values.password
        }), {
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res => {
          const data: responseResult.login = res.data;
            if(data) {
                this.setState({
                    isLogin : true
                })
            } else {
                message.error("Login Failed")
            }
        })
      }
    });
  };

  render() {
    const { isLogin } = this.state;
    const { getFieldDecorator } = this.props.form;
    return  isLogin ? (<Redirect to="/" /> 
        ) : (
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);

export default WrappedLoginForm;