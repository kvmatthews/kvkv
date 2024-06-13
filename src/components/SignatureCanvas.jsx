import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import axios from "axios";

function SignatureCanvas() {
  const [imageURLs, setImageURLs] = useState([]);
  const [results, setResults] = useState([]);
  const sigCanvas = useRef(null);

  const clearCanvas = () => {
    sigCanvas.current.clear();
  };

  const saveCanvas = () => {
    const imageURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURLs([...imageURLs, imageURL]);
    clearCanvas(); // Clear the canvas after saving the image
  };

  const convertToBlob = async (imageURL) => {
    const base64Response = await fetch(imageURL);
    const blob = await base64Response.blob();
    return blob;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageURLs.length) {
      alert("Please draw an image before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      for (let i = 0; i < imageURLs.length; i++) {
        const blob = await convertToBlob(imageURLs[i]);
        formData.append("files[]", blob, `signature_${i}.png`);
      }

      const response = await axios.post(
        "http://192.168.1.8:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      // Combine the original images with their corresponding results
      const combinedResults = imageURLs.map((url, index) => ({
        url,
        ...response.data[index],
      }));
      setResults(combinedResults);
    } catch (error) {
      console.error("Error submitting the signature:", error);
      alert("There was an error submitting your images. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Signature Pad Example</h1>
      <div className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full max-w-lg">
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className: "signatureCanvas w-full h-48 border border-gray-300 rounded",
          }}
        />
        <div className="flex justify-around mt-4">
          <button
            onClick={saveCanvas}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={clearCanvas}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {imageURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`signature_${index}`}
            className="block mx-2 my-2 border border-gray-300 rounded"
            style={{ width: "150px" }}
          />
        ))}
      </div>
      {imageURLs.length > 0 && (
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
        >
          Submit
        </button>
      )}
      {results.length > 0 && (
        <div className="mt-4">
          <h5 className="text-xl font-bold">Prediction Results</h5>
          {results.map((res, index) => (
            <div key={index} className="mb-4">
              <img
                src={res.url}
                alt={`result_${index}`}
                className="block mx-auto border border-gray-300 rounded"
                style={{ width: "150px" }}
              />
              <p><strong>Image:</strong> {res.filename}</p>
              <p><strong>Prediction:</strong> {res.prediction}</p>
              <p><strong>Confidence:</strong> {res.confidence}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SignatureCanvas;
