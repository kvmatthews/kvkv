import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import axios from "axios";

function SignatureCanvas() {
  const [imageURL, setImageURL] = useState(null);
  const sigCanvas = useRef(null);
  const [result, setResult] = useState(null);

  const clearCanvas = () => {
    sigCanvas.current.clear();
    setImageURL(null);
    setResult(null);
  };

  const saveCanvas = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageURL) return;

    try {
      // Convert base64 to a blob
      const base64Response = await fetch(imageURL);
      const blob = await base64Response.blob();

      const formData = new FormData();
      formData.append("file", blob, "signature.png");

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
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting the signature:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Signature Pad Example</h1>
      <div className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full max-w-lg">
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className:
              "signatureCanvas w-full h-48 border border-gray-300 rounded",
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
      {imageURL && (
        <>
          <div className="mt-4">
            <img
              src={imageURL}
              alt="My Signature"
              className="block mx-auto border border-gray-300 rounded"
              style={{ width: "150px" }}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
          >
            Submit
          </button>
        </>
      )}
      {result && (
        <div>
          <h5>Hasil</h5>
          <p>{result.confidence}</p>
          <p>{result.prediction}</p>
        </div>
      )}
    </div>
  );
}

export default SignatureCanvas;
