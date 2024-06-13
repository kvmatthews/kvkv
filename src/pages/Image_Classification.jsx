import React, { useState } from "react";
import axios from "axios";

const Classification_Page = () => {
    const [files, setFiles] = useState([]);
    const [results, setResults] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("Please select image files first.");
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append("files[]", file);
        });

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setResults(response.data);
        } catch (error) {
            console.error("Error uploading the files:", error);
        }
    };

    return (
        <>
            <div className="title_menu_sub">
                <h1>Image Classification</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas accusamus quam, omnis enim fugiat adipisci esse laudantium aspernatur repellendus delectus.</p>
            </div>

            <div className="image_classification">
                <div className="file_image">
                    <label>
                        <input type="file" accept="image/png, image/jpeg" multiple onChange={handleFileChange} />
                    </label>
                </div>
                <button className="submit_image_button" onClick={handleSubmit}>
                    Submit
                </button>
                {results.map((result, index) => (
                    <div key={index}>
                        <span>Nama Dosen: {result.prediction}</span>
                        <span>Akurasi: {result.confidence}</span>
                        {result.image_url && <img src={`http://127.0.0.1:5000/${result.image_url}`} alt="Uploaded" />}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Classification_Page;
