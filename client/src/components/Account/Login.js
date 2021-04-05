import { Link } from 'react-router-dom';
import {useState} from 'react';
const Login = ({
    history
}) => {

    const user = localStorage.getItem('user');
    if(user){
        history.push('/');
    }

    const [error, setError] = useState('');

    const logUser = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(!email || !password){
            setError('Email and Password are required. Please fill them...');
            return;
        }

        const body = {
            Email: email,
            Password: password,
            Username: '',
            ConfirmPassword: '',
        };
        const responce = await fetch('http://localhost:5002/api/user/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
            'Content-Type': 'application/json',
            },
        })
        .then(res => res.json());

        if(!responce){
            setError('Incorect Email or Password. Please try again...');
            return;
        }

        localStorage.setItem('user', email);
        history.push('/');
    };

    return (
        <div class="cotainer">
            <div class="row justify-content-center">
                <div class="col-md-8 col-10">
                    <div class="card mt-5">
                        <div class="card-header h5">Login</div>
                        <div class="card-body">
                            <form className="mt-3 mb-3" onSubmit={logUser}>
                                {error && <h5 className="text-danger">{error}</h5>}
                                <div class="form-group row">
                                    <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                    <div class="col-md-6">
                                        <input type="text" id="email_address" class="form-control" name="email" required autofocus />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                    <div class="col-md-6">
                                        <input type="password" id="password" class="form-control" name="password" required />
                                    </div>
                                </div>
                                <div class="col-md-6 offset-md-4">
                                    <button type="sumbit" class="btn btn-primary ">
                                        Login
                                    </button>
                                    <Link to="/register" className="ml-4">
                                        Don't have an account ? Register.
                                    </Link>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;