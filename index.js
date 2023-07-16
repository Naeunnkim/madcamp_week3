const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const dbconfig = require('./config/db_config.js');
const path = require('path');
const connection = mysql.createConnection(dbconfig);

const app = express();

const generateUniqueFilename = (originalname) => {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).slice(2);
    const extension = path.extname(originalname);
    const uniqueFilename = `${timestamp}-${randomString}${extension}`;
    return uniqueFilename;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueFilename = generateUniqueFilename(file.originalname);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage }).single('image');

app.use(express.json());

app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const endpoint = req.url;
    console.log(`요청 도착: ${endpoint}`);
    next();
});

app.set('port', process.env.PORT || 80);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

app.get('/navbar', (req, res) => {
    res.sendFile(__dirname + '/navbar.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
})

app.get('/diary', (req, res) => {
    res.sendFile(__dirname + '/diary.html');
})

app.get('/writediary', (req, res) => {
    res.sendFile(__dirname + '/writediary.html');
})

app.get('/meditation', (req, res) => {
    res.sendFile(__dirname + '/meditation.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})

app.get('/profile', (req, res)=>{
    res.sendFile(__dirname + '/profile.html');
})

app.get('/posts', (req, res) => {
    console.log('posts');
    connection.query('select * from dashboard natural join diary', (err, rows) => {
        res.status(200).send(rows);
    })
})

app.post('/signup', (req, res) => {
    const body = req.body;
    console.log(body);
    const id = body.id;
    const pw = body.pw;
    const phoneNum = body.phoneNum;
    const email = body.email;
    const name = body.name;
    if (id != null) {
        connection.query('insert into user_info (id, pw, name, tel, email) values (?, ?, ?, ?, ?)', [id, pw, name, phoneNum, email]);
    }
    res.send('end');
})

app.post('/login', (req, res) => {
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    if (id != null) {
        connection.query('select * from user_info where id = ? and pw = ?', [id, pw], (error, rows) => {
            if (error) throw error;
            if (rows.length != 0) {
                console.log("로그인 성공");
                res.status(200).json({
                    success: true,
                    id: rows[0].id,
                    name: rows[0].name,
                    pw: rows[0].pw,
                    tel: rows[0].tel,
                    email: rows[0].email
                });
            }
            else {
                console.log("로그인 실패");
                res.status(200).json({
                    success: false,
                    code: 0 //아이디 또는 비밀번호 오류
                });
            }
        })
    }
    else {
        console.log("null id");
        res.status(200).json({
            success: false,
            code: 1 //아이디 비어있음
        });
    }
})

app.post('/submit', (req, res) => {
    const { id, date, emotion, text, photo, board } = req.body;
    // console.log(date);
    // console.log(emotion);
    // console.log(text);
    // console.log(photo);

    connection.query('select * from diary where id = ? and date = ?', [id, date], (err, rows) => {
        if (err) throw err;
        //그 날짜에 작성한 일기 없음
        if (rows.length == 0) {
            //mysql에 데이터 삽입
            const sql = 'INSERT INTO diary(id, date, emotion, text, photo) VALUES (?,?,?,?,?)';
            const values = [id, date, emotion, text, photo];
            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error inserting data: ', err);
                    res.status(500).send('Error inserting data to database');
                    return;
                }
                console.log('Data inserted:', result.insertId);
                //0이면 게시판에 안올림, 1이면 올림
                if (board === 1) {
                    connection.query('select postnum from diary where id=? and date=?', [id, date], (err1, rows1) => {
                        if (err1) throw err1;
                        const postnum = rows1[0].postnum;
                        connection.query('insert into dashboard (postnum) values(?)', [postnum]);
                        res.status(200).json({
                            success: true,
                            insert: true //게시판에 올렸는지
                        })
                    })
                }
                else {
                    res.status(200).json({
                        success: true,
                        insert: false
                    })
                }
            })
        }
        //그 날짜에 작성한 일기 있음
        else {
            console.log("이미 일기 작성함");
            res.status(200).json({
                success: false
            });
        }
    })
})

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading image:', err);
            res.status(500).json({ error: 'Failed to upload image' });
        } else {
            // 이미지가 성공적으로 업로드되었을 때의 처리
            const imageUrl = `/public/uploads/${encodeURIComponent(req.file.filename)}`;
            console.log(imageUrl);
            res.status(200).json({
                image: imageUrl
            });
        }
    });
});

app.post('/diary', (req, res) => {
    const body = req.body;
    const id = body.id;
    connection.query('select * from diary where id = ?', [id], (err, rows) => {
        console.log('다이어리 데이터 전송 성공');
        // console.log(rows);
        res.status(200).json(rows);
    })
})

app.post('/profile', (req, res)=>{
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    const name = body.name;
    const tel = body.phoneNum;
    const email = body.email;
    // console.log(id, pw, name, tel, email);
    connection.query('update user_info set pw = ?, name = ?, tel = ?, email = ? where id = ?', [pw, name, tel, email, id], (err, rows)=>{
        if (err) throw err;
        res.status(200).json({succes:true});
    })
})



