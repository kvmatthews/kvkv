import SignatureCanvas from "../components/SignatureCanvas";

const Signature = () => {
  return (
    <div>
      <div className="title_menu_sub">
        <h1>Signature Classification</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas accusamus quam, omnis enim fugiat adipisci esse laudantium aspernatur repellendus delectus.</p>
      </div>

      <div className="image_classification">
        <div className="file_image">
          <SignatureCanvas />
        </div>
        <button className="submit_image_button">
          Submit
        </button>
        <span>Nama Dosen: </span>
        <span>Akurasi: </span>
      </div>

    </div>
  );
};

export default Signature;
