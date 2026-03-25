import { db } from "@/lib/firebase";
import { 
    collection, query, where, getDocs, 
    doc, limit, runTransaction, Timestamp // <--- THÊM Timestamp VÀO ĐÂY
} from "firebase/firestore";

export const createPostAndReserveLocker = async (postData, userEmail) => {
    try {
        return await runTransaction(db, async (transaction) => {
            
            // 1. Tìm tủ trống (available hoặc avl)
            const lockerQuery = query(
                collection(db, "lockers"), 
                where("status", "in", ["available", "avl"]), // Đảm bảo bắt dính cả 2 trường hợp
                limit(1)
            );
            const lockerSnapshot = await getDocs(lockerQuery);

            if (lockerSnapshot.empty) {
                throw new Error("Hiện tại hệ thống đã hết tủ trống. Vui lòng thử lại sau!");
            }

            const lockerDoc = lockerSnapshot.docs[0];
            const lockerRef = doc(db, "lockers", lockerDoc.id);

            // 2. Tạo mã PIN và tính thời gian (7 ngày)
            const newPin = Math.floor(100000 + Math.random() * 900000).toString();
            const now = new Date();
            const endTimeDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

            // 3. Tạo Bài Đăng (Post)
            const postRef = doc(collection(db, "posts")); 
            transaction.set(postRef, {
                ...postData,
                authorEmail: userEmail,
                assignedLocker: lockerDoc.id,
                status: "active",
                createdAt: Timestamp.fromDate(now) // Lưu bằng Timestamp luôn cho chuẩn
            });

            // 4. Tạo Order GIỐNG Y CHANG BÊN HTML
            const orderRef = doc(collection(db, "orders"));
            transaction.set(orderRef, {
                locker_id: lockerDoc.id,
                user_id: userEmail,
                duration_hours: 168, // 7 ngày = 168h
                points_spent: 0, // Nhặt được đồ thì 0 điểm
                start_time: Timestamp.fromDate(now), // <--- CHUẨN FIREBASE TIMESTAMP
                end_time: Timestamp.fromDate(endTimeDate), // <--- CHUẨN FIREBASE TIMESTAMP
                unlock_pin: newPin,
                status: "active",
                post_id: postRef.id
            });

            // 5. Khóa tủ (Đổi status thành occupied)
            transaction.update(lockerRef, {
                status: "occupied", 
                current_order_id: orderRef.id
            });

            return { 
                postId: postRef.id, 
                lockerId: lockerDoc.id, 
                pin: newPin 
            };
        });
    } catch (error) {
        console.error("Lỗi service:", error);
        throw error;
    }
};