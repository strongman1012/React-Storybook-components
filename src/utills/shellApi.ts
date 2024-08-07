import axios from "axios";

export default class ShellApi {

    /** Excute Test Shell Script */
    excuteTestShell = () => {
        const baseURL = `${process.env.REACT_APP_TEST_SERVER_URL}/api/v0`;
        return axios.post(`${baseURL}/script/test`);
    }
}