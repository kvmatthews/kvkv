import React, { useState } from "react";
import axios from "axios";

const Classification_Page = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [confidence, setConfidence] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Please select an image file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://192.168.1.8:5000/predict", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const { prediction, confidence, image_url } = response.data;
            setPrediction(prediction);
            setConfidence(confidence);
            setImageURL(image_url);
        } catch (error) {
            console.error("Error uploading the file:", error);
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
                        <input type="file" onChange={handleFileChange} />
                    </label>
                </div>
                <button className="submit_image_button" onClick={handleSubmit}>
                    Submit
                </button>
                <span>Nama Dosen: {prediction}</span>
                <span>Akurasi: {confidence}</span>
                {imageURL && <img src={`http://127.0.0.1:5000/${imageURL}`} alt="Uploaded" />}
            </div>
        </>
    );
};

export default Classification_Page;
