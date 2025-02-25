import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const { user, loading, setLoading, createUser, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    if (user) return <Navigate to={from} replace={true} />
    if (loading) return <LoadingSpinner />

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            // Register user
            await createUser(formData.email, formData.password);

            // eslint-disable-next-line no-unused-vars
            const { confirmPassword, ...safeFormData } = formData;
            const res = await axiosPublic.post(`/users`, safeFormData);

            navigate('/')
            if (res.data.insertedId) toast.success("Registration successful!");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error('Something Want Wrong, Try Again !');
        } finally { setLoading(false) };
    };

    const handelGoogleLogIn = async () => {
        try {
            const res = await googleSignIn();
            const { email, displayName } = res.user;

            if (email) {
                const res = await axiosPublic.post(`/users`, { email, displayName });

                navigate('/');
                if (res.data.insertedId) { toast.success('Successfully Sign In !', {}) }
            }
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error('Something Want Wrong, Try Again !');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100">
            <div className="w-full max-w-md p-6 bg-base-200 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-blood">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full focus:outline-blood"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full focus:outline-blood"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full focus:outline-blood"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full focus:outline-blood"
                    />
                    <button type="submit" className="btn bg-blood text-white w-full">
                        Register
                    </button>
                    <button type='button' onClick={handelGoogleLogIn} className="btn btn-accent text-base-content px-8 w-full">or, Register With Google</button>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16'></div>
                    <p className='px-3 text-sm'>
                        or Have an accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16'></div>
                </div>
                <p className='px-6 text-sm text-center text-base-content'>
                    Already Have an Account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-blood text-gray-600'
                    >
                        login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;
