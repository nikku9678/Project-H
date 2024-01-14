import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../../baseUrl";

const EditAccessKey = () => {
    const [key, setKey] = useState({
        oldAccessKey: '',
        newAccessKey: '',
        confirmNewAccessKey: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setKey((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        try {
            const response = await axios.post(`${baseURL}/admin/editAccessKey`, key);
        } catch (error) {
            console.error('Error modifying Access Key.', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Old Access Key:</label>
                <input
                    type="text"
                    name="oldAccessKey"
                    value={key.oldAccessKey}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>New Access Key:</label>
                <input
                    type="text"
                    name="newAccessKey"
                    value={key.newAccessKey}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>New Access Key:</label>
                <input
                    type="text"
                    name="confirmNewAccessKey"
                    value={key.confirmNewAccessKey}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Update Access Key.</button>
        </form>
    )


};

export default EditAccessKey;