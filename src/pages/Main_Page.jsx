import React, { useState } from "react";
import arrow_right from "../assets/icons/arrow_right.svg"
import signature_image from "../assets/img/penmanship-2561217_1920.jpg"

const Main_Page = () => {

    return (
        <>
            <div className="main_page">
                <div className="title_menu">
                    <div className="title">
                        <h1>Website Pendeteksi Kemiripan Pada Tanda Tangan
                            Dosen Universitas De La Salle
                            Menggunakan Algoritma Long Short Term Memory</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas accusamus quam, omnis enim fugiat adipisci esse laudantium aspernatur repellendus delectus.</p>
                    </div>

                    <div className="image_info">
                        <img src={signature_image} alt="" />
                    </div>
                </div>

                <div className="option_card">
                    <div className="scan_image">
                        <div className="card1_text">
                            <h3>Image Clasification</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, obcaecati.</p>

                            <div className="underline_h4">
                                <h4>Input Image</h4>
                                <img src={arrow_right} alt="" className="arrow_icon" />
                            </div>
                        </div>
                    </div>
                    <div className="live_signature">
                        <div className="card2_text">
                            <h3>Signature Verification</h3>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, similique.</p>
                            <div className="underline_h4">
                                <h4 className="">Input Signature</h4>
                                <img src={arrow_right} alt="" className="arrow_icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main_Page