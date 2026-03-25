"use client";
import { auth } from "../firebase"; // Nhớ check lại đường dẫn tới file firebase.js cho đúng

export default function LockerRedirectButton() {
  const handleGoToLocker = () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Đổi port 5500 thành port của trang HTML
      const targetUrl = `http://127.0.0.1:5500/campus-locker.html?userEmail=${encodeURIComponent(currentUser.email)}`;
      window.location.href = targetUrl; 
    } else {
      alert("Bạn cần đăng nhập trước!");
    }
  };

  return (
    <button 
      onClick={handleGoToLocker}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all"
    >
      Đi cất đồ vào tủ khóa
    </button>
  );
}