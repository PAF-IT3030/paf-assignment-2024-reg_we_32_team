import axios from "axios";
const API_URL = "http://localhost:8082/api/v1/user";

class UserService {
  async saveUser(user) {
    return await axios.post(API_URL + `/save`, user);
  }

  getUser(id) {
    return axios.get(API_URL + "/" + id);
  }

  async updateUser(id, user) {
    return await axios.patch(API_URL + `/profile/${id}`, id, user);
  }

  deleteUser(id) {
    return axios.delete(API_URL + "/" + id);
  }

  async login(user) {
    return await axios.post(API_URL + `/login`, user);
  }

  async getProfileData(id) {
    return await axios.get(API_URL + `/profile/${id}`);
  }
}

export default new UserService();
