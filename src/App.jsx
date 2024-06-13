import React, { useState, useEffect } from "react";
import Main_Page from "./pages/Main_Page";
import Image_Classification_Page from "./pages/Image_Classification";
import Footer from "./components/Footer";
import SignatureCanvas from "./components/SignatureCanvas";
import Signature from "./pages/Signature";

const App = () => {
  let current_page;
  const [page, set_page] = useState(0);

  const main_page = () => {
    set_page(1);
  };

  const image_classification_page = () => {
    set_page(2);
  };

  // get data result

  // useEffect(() => {
  //   console.log(dataResult);
  // });

  switch (page) {
    case 0:
      current_page = (
        <>
          <div>
            <Main_Page main_page={main_page} />
          </div>
        </>
      );
      break;

    case 1:
      current_page = (
        <>
          <div>
            <Main_Page main_page={main_page} />
          </div>
        </>
      );
      break;

    case 2:
      current_page = (
        <>
          <div>
            <Image_Classification_Page
              image_classification_page={image_classification_page}
            />
          </div>
        </>
      );
      break;

    case 3:
      current_page = (
        <>
          <div>
            <Signature />
          </div>
        </>
      );
      break;

    case 4:
      current_page = (
        <>
          <div></div>
        </>
      );
      break;

    default:
      current_page = (
        <div>
          <h1>Halaman tidak ditemukan</h1>
        </div>
      );
      break;
  }

  return (
    <>
      <header>
        <a onClick={() => set_page(1)}>
          <h1>Signature Similarity</h1>
        </a>

        <nav>
          <ul>
            <li onClick={() => set_page(1)}>Beranda</li>
            <li onClick={() => set_page(2)}>Scan Image</li>
            <li onClick={() => set_page(3)}>Input Signature</li>
          </ul>
        </nav>
      </header>

      <main>{current_page}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
