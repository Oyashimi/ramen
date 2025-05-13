'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [uploadedImage1, setUploadedImage1] = useState(null); // 1枚目の画像（顔画像）
  const [uploadedImage2, setUploadedImage2] = useState(null); // 2枚目の画像（モーダルで表示する画像）
  const [showPopup, setShowPopup] = useState(false); // モーダル表示状態

  // 画像1のアップロード
  const handleImageUpload1 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage1(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 画像2のアップロード
  const handleImageUpload2 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage2(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 顔画像をクリックしたときにモーダルを表示
  const handleImageClick = () => {
    setShowPopup(true);
  };

  // モーダルを閉じる
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* 背景画像 */}
      <img
        src="/ramen_shop.png"
        alt="ラーメン屋背景"
        className="absolute top-0 left-0 w-full h-full object-contain z-0"
      />

      {/* 店主画像 */}
      <img
        src="/ramen_tenshu.png"
        alt="店主画像"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[300px] h-auto"
      />

      {/* 1枚目のアップロードされた顔画像 */}
      {uploadedImage1 && (
        <img
          src={uploadedImage1}
          alt="顔画像"
          className="absolute z-20"
          style={{
            top: '78%', // 顔の位置を調整
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
          onClick={handleImageClick} // 顔画像クリックでモーダル表示
        />
      )}

      {/* 2枚目のアップロード画像（モーダルで表示） */}
      {/* ファイルアップロードUI */}
      <div className="absolute top-4 left-4 z-30 bg-white p-4 rounded shadow">
        <label className="text-sm font-medium">顔画像をアップロード:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload1} className="mt-2" />
      </div>

      <div className="absolute top-16 left-4 z-30 bg-white p-4 rounded shadow">
        <label className="text-sm font-medium">モーダル画像をアップロード:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload2} className="mt-2" />
      </div>

      {/* モーダル表示 */}
      {showPopup && uploadedImage2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Score</h2>
            <img
              src={uploadedImage2}
              alt="モーダル画像"
              className="mt-4 w-64 h-64 object-contain"
            />
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
