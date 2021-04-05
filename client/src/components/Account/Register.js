import {Link} from 'react-router-dom';
import {useState} from 'react';

const Register = ({
    history
}) => {
    const user = localStorage.getItem('user');
    if(user){
        history.push('/');
    }
    
    const [error, setError] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const username = e.target.username.value;

        if(!email || !password || !confirmPassword || !username){
            setError('All fields are required. Please fill them...');
            return;
        }

        if(email.length > 20 || password.length > 20 || username.length > 20){
            setError('Too much characters. Maximum size of all fields is 20 characters...');
            return;
        }

        if (password !== confirmPassword) {
            setError('Password fields doesn\'t match');
            return;
        }

        if (email.length < 8 || !email.includes('@')) {
            setError('Please enter a valid email. Minimum 8 characters...');
            return;
        }

        if (username.length < 8) {
            setError('Username too short. Minimum 8 characters...');
            return;
        }

        if (password.length < 8) {
            setError('Password too short. Minimum 8 characters...');
            return;
        }

        const body = {
            Email: email,
            Password: password,
            Username: username,
            ConfirmPassword: confirmPassword,
        };
        const responce = await fetch('http://localhost:5002/api/user/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
            'Content-Type': 'application/json',
            },
        })
        .then(res => res.json());
        console.log(responce.message);
        if(responce.message !== 'Ok'){
            setError(responce.message);
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
                        <div class="card-header h5">Register</div>
                        <div class="card-body">
                            <form className="mt-3 mb-3" onSubmit={registerUser}>
                            {error && <h5 className="text-danger">{error}</h5>}
                                <div class="form-group row">
                                    <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                    <div class="col-md-6">
                                        <input type="text" id="email_address" class="form-control" name="email" required autofocus />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="username" class="col-md-4 col-form-label text-md-right">Username</label>
                                    <div class="col-md-6">
                                        <input type="text" id="username" class="form-control" name="username" required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                    <div class="col-md-6">
                                        <input type="password" id="password" class="form-control" name="password" required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="confirPassword" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                    <div class="col-md-6">
                                        <input type="password" id="confirmPassword" class="form-control" name="confirmPassword" required />
                                    </div>
                                </div>
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary ">
                                        Register
                                    </button>
                                    <Link to="/login" className="ml-4">
                                        Already have an account ? Login.
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

export default Register;