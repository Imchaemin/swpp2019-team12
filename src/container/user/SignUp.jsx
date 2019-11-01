import React, { Component } from 'react';
import axios from 'axios'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken"

class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    /*
        isFooVaild 형태는 각 input들이 적절한 형태로 들어왔는가에 대한 Boolean,
        fooVaildText 형태는 위의 Boolean 값에 따른 메시지 담는 변수
    */
    state = {
        email: '',
        password: '',
        password_confirmation: '',
        nickname: '',
        isEmailVaild: false,
        isPwVaild: false,
        isPwConfirmationVaild: false,
        // isNicknameValid: false,
        emailVaildText: "",
        pwConfirmationVaildText: "",
        pwVaildText: "",
        submitted: false,
    }
    /*
    characters other than @ or whitespace followed by an @ sign, 
    followed by more characters (not \'@\', \'.\', or whitespace: co.kr is not allowed in this case), 
    and then a \".\". After the \".\", you can only write 2 to 3 letters from a to z.
    */
    checkEmail = () => {
        let isFormVaild = (/^[^@\s]+@[^@\s\.]+[.][a-zA-Z]{2,3}$/.test(this.state.email));

        if (!isFormVaild) {
            this.setState({ emailVaildText: "잘못된 형식입니다.", isEmailVaild: false })
        }
        else {
            // ID 중복 확인.
            axios.patch('/api/signup/', {"username": this.state.email})
                .then(res => {
                                if(res['status'] === 200) {
                                    this.setState({ emailVaildText: "멋진 아이디네요!",
                                                    isEmailVaild: true    
                                                })
                                }
                                else {
                                    this.setState({ emailVaildText: "이미 동일한 아이디가 존재합니다.",
                                                    isEmailVaild: false    
                                                })
                                }
                            })
        }
    }
    /* 
    Must contain at least one number and one uppercase and one lowercase letter, 
    and at least 8 or more characters.
    */
    checkPassword = () => {
        let isFormVaild = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.state.password);
        if (isFormVaild) {
            this.setState({ isPwVaild: true,
                            pwVaildText: "",    
                        })
        }
        else {
            this.setState({ isPwVaild: false, 
                            pwVaildText: "대문자 소문자 최소 1개, 길이 8 이상"
                        })
        }
    }

    checkPasswordConfirmation = () => {
        if (this.state.password === this.state.password_confirmation) {
            this.setState({ isPwConfirmationVaild: true, 
                            pwConfirmationVaildText: "",    
                        })
        }
        else {
            this.setState({ isPwConfirmationVaild: false, 
                            pwConfirmationVaildText: "비밀번호가 일치하지 않습니다."    
                        })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const user_info = {
            username: this.state.email,
            password: this.state.password,
            nickname: this.state.nickname
        };
        let isAllFormValid = (
                    this.state.isEmailVaild &&
                    this.state.isPwVaild &&
                    this.state.isPwConfirmationVaild
                    );

        if(isAllFormValid) {
            axios.post('/api/signup/', user_info)
                        .then(res => this.props.history.push('/dashboard'))
        }
        // 적절하지 않은 input이 존재한다면, 그에 맞는 에러 메시지 띄워주기.
        else {

        }
    }

    componentDidMount() {}
    /*
        input field의 OnBlur를 이용해서 유저가 아이디 비밀번호를 입력하고
        해당 input field에서 나갔을 때, validation check를 하도록 짰습니다.  
    */
    render() {
        return (
            <div className="SignUp">
                <h1>SignUp Page</h1>
                <form >
                    <input
                        id="email-input"
                        placeholder="email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                        onBlur={ this.checkEmail }
                        value={ this.state.email }
                    />
                    <br/>
                    <p 
                        id="id-validation"
                    >{this.state.emailVaildText}</p>
                    <input
                        id="pw-input"
                        type="password"
                        placeholder="password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                        onBlur={ this.checkPassword }
                        value = { this.state.password }
                    />
                    <p>{this.state.pwVaildText}</p>
                    <br/>
                    <input
                        id="pw-confirm-input"
                        type="password"
                        placeholder="password_confirmation"
                        onChange={(e) => this.setState({ password_confirmation: e.target.value })}
                        onBlur={ this.checkPasswordConfirmation }
                        value = { this.state.password_confirmation }
                    />
                    <p id="pw-confirm-validation">{this.state.pwConfirmationVaildText}</p>
                    <br/>
                    <input
                        id="nickname-input"
                        placeholder="nickname"
                        onChange={(e) => this.setState({ nickname: e.target.value })}
                        value = { this.state.nickname }
                    />
                    <br/>
                    <button
                        id="signup-button"
                        onClick={this.handleSubmit}
                        disabled={
                                    this.state.email === '' ||
                                    this.state.password === '' ||
                                    this.state.password_confirmation === '' ||
                                    this.state.nickname === ''
                                }
                    >
                        Signup
                    </button>
                    
                    
                </form>
            </div>);
    }
}

export default SignUp;