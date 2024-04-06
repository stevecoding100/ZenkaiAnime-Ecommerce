import axios from "axios";

const baseURL = "https://zenkai-anime-ecommerce.vercel.app/api";

const adminRoutes = {
  users: {
    // Get all users (admin only)
    getAllUsers: async () => {
      try {
        const response = await axios.get(`${baseURL}/auth/users`);
        return response.data;
      } catch (error) {
        throw new Error("Error fetching users", error);
      }
    },

    // Delete a user by ID (admin only)
    deleteUserById: async (userId) => {
      try {
        const response = await axios.delete(`${baseURL}/auth/delete/${userId}`);
        return response.data;
      } catch (error) {
        throw new Error("Error deleting user", error);
      }
    },

    // Update a user by ID (admin only)
    updateUserById: async (userId, userData) => {
      try {
        const response = await axios.put(
          `${baseURL}/auth/update/${userId}`,
          userData
        );
        return response.data;
      } catch (error) {
        throw new Error("Error updating user", error);
      }
    },
  },
};

export default adminRoutes;
