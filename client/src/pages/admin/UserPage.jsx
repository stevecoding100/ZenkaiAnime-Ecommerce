import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import adminRoutes from "../../../api/adminRoutes";
import { MdSystemUpdateAlt, MdDeleteOutline } from "react-icons/md";

const UserPage = () => {
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        email: "",
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await adminRoutes.users.getUserById(id);
                console.log("fetched user: ", fetchUser.id);
                setUser(fetchedUser);
            } catch (error) {
                console.log("Error fetching user", error);
            }
        };
        fetchUser();
    }, [id]);

    const onSubmit = async () => {
        try {
            const result = await adminRoutes.users.updateUserById(id, user);
            console.log(result);
        } catch (error) {
            console.log("Error updating user", error);
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto mt-20 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                {user.first_name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-10">
                    <input
                        name="name"
                        onChange={onChange}
                        value={user.name}
                        placeholder="Name"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        name="lastName"
                        onChange={onChange}
                        value={user.lastName}
                        placeholder="Last Name"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        name="email"
                        onChange={onChange}
                        value={user.email}
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={onSubmit}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        >
                            <div className="flex items-center">
                                <MdSystemUpdateAlt className="text-xl mr-2" />
                                Update User
                            </div>
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            <div className="flex items-center">
                                <MdDeleteOutline className="text-xl mr-2" />
                                Delete User
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
