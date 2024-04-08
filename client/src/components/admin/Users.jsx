import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import adminRoutes from "../../../utils/adminRoutes";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await adminRoutes.users.getAllUsers();
        setUsers(users);
      } catch (error) {
        console.log("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-20 bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
      <table className="w-full  table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">FirstName</th>
            <th className="py-3 px-6 text-left">LastName</th>
            <th className="py-3 px-6 text-left">UserName</th>
            <th className="py-3 px-6 text-center">Email</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="truncate">{user.first_name}</td>
              <td className="py-3 px-6 text-left">{user.last_name}</td>
              <td className="py-3 px-6 text-left">{user.username}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>

              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <Link
                    to={`${user.id}`}
                    className="text-blue-500 hover:text-blue-600 mr-4"
                  >
                    <MdOutlineModeEdit className="text-xl" />
                  </Link>
                  <Link className="text-red-500 hover:text-red-600">
                    <MdOutlineDeleteOutline className="text-xl" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <Pagination
          total={Math.ceil(users.length / usersPerPage)}
          page={currentPage}
          onChange={onPageChange}
          size="lg"
          rounded
          color="primary"
        />
      </div>
    </div>
  );
};

export default Users;
