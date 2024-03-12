const express = require('express');
const mongoose = require('mongoose');
const app = express();
// app.set('view engine','ejs')
// mongoose.set('strictQuery', true);
// const local = "mongodb://127.0.0.1:27017/MyDB";
// const connect = async () => {
//     try {
//         await mongoose.connect(local,{
//             useNewUrlParser:true,
//             useUnifiedTopology:true,
//         })
//         console.log("Ket noi thanh cong");
//     } catch (error) {
//         console.log("ket noi that bai");
//         console.log(error);
//     } 
mongoose.connect('mongodb://127.0.0.1:27017/MyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("ket noi thanh cong voi db");
}).catch((err)=>{
    console.error("Loi", err)
})
const db1 = mongoose.connection.useDb('db1');
const SinhVienSchema = new mongoose.Schema({
    maSV: String,
    tenSV: String
});
const SinhVien = db1.model('sinhvien', SinhVienSchema);
app.get('/', async (req, res) => {
    try {
        const sinhvien = await SinhVien.find();
        if (sinhvien.length > 0) {
            res.json(sinhvien);
            res.render('students',{sinhviens:sinhvien});
            // console.log(sinhvien);
        } else {
            res.status(404).json({ error: "khong co sinh vien" })
        }
    } catch (error) {
        console.error("loi doc du lieu: ")
        res.status(500).json({ error: "Loi doc du lieu" });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('server dang chay o cong 5000');
});

module.exports = app;