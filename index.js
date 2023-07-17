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

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/profile.html');
})

app.get('/boarddetail', (req, res) => {
    res.sendFile(__dirname + '/boarddetail.html');
})

app.get('/diarydetail', (req, res) => {
    res.sendFile(__dirname + '/diarydetail.html');
})

app.get('/posts', (req, res) => {
    console.log('posts');
    connection.query(`SELECT a.*, COALESCE(b.good, 0) AS good
        FROM (SELECT *
            FROM dashboard
            NATURAL JOIN diary
            ORDER BY date DESC) a
        LEFT JOIN (SELECT postnum, COUNT(*) AS good
               FROM dashboard
               NATURAL JOIN board_good
               GROUP BY postnum) b
        ON a.postnum = b.postnum order by a.date desc;
        `, (err, rows) => {
        res.status(200).send(rows);
    })
})

app.get('/graph', (req, res) => {
    connection.query('SELECT emotion, COUNT(*) AS count FROM diary  GROUP BY emotion order by emotion', (err, result) => {
        res.status(200).json({
            cnt1: result[0].count,
            cnt2: result[1].count,
            cnt3: result[2].count,
            cnt4: result[3].count,
            cnt5: result[4].count
        });
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
    const { id, date, emotion, text, photo, board, check } = req.body;
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
                            insert: true, //게시판에 올렸는지
                            edit: false
                        })
                    })
                }
                else {
                    res.status(200).json({
                        success: true,
                        insert: false,
                        edit: false
                    })
                }
            })
        }
        //그 날짜에 작성한 일기 있음
        else {
            if (check) {
                console.log("글 수정");
                connection.query('update diary set emotion = ?, photo = ?, text = ? where id = ? and date = ?', [emotion, photo, text, id, date], (err, rows)=>{
                    res.status(200).json({
                        success: true,
                        edit: true
                    })
                })
            }
            else {
                console.log("이미 일기 작성함");
                res.status(200).json({
                    success: false
                });
            }

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
    connection.query('select * from diary where id = ? order by date desc', [id], (err, rows) => {
        console.log('다이어리 데이터 전송 성공');
        // console.log(rows);
        res.status(200).json(rows);
    })
})

app.post('/profile', (req, res) => {
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    const name = body.name;
    const tel = body.phoneNum;
    const email = body.email;
    // console.log(id, pw, name, tel, email);
    connection.query('update user_info set pw = ?, name = ?, tel = ?, email = ? where id = ?', [pw, name, tel, email, id], (err, rows) => {
        if (err) throw err;
        res.status(200).json({ succes: true });
    })
})

app.post('/boarddetail', (req, res) => {
    const body = req.body;
    const postnum = body.postnum;
    connection.query('select * from comment where postnum = ?', [postnum], (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    })
})

app.post('/wcomment', (req, res) => {
    const body = req.body;
    const postnum = body.postnum;
    const id = body.id;
    const datetime = body.datetime;
    const text = body.text;
    connection.query('insert into comment (postnum, id, datetime, text) values(?, ?, ?, ?)', [postnum, id, datetime, text], (err, rows) => {
        if (err) throw err;
        res.status(200).json({ success: true });
    })
})

app.post('/good', (req, res) => {
    const body = req.body;
    const postnum = body.postnum;
    connection.query('select * from board_good where postnum = ?', [postnum], (err, rows)=>{
        if (err) throw err;
        res.status(200).json(rows);
    })
})

// 삭제 요청 처리 API 엔드포인트
app.post('/diary/delete', (req, res) => {
    const body = req.body;
    const id = body.id; // 사용자 ID
    const postnum = body.postnum; // 일기의 고유 ID (postnum)

    // 해당 일기 데이터를 삭제하는 쿼리를 실행
    connection.query('DELETE FROM diary WHERE id = ? AND postnum = ?', [id, postnum], (err, result) => {
        if (err) {
            console.error('Error deleting diary data:', err);
            res.status(500).json({ success: false, error: 'Failed to delete diary data' });
            return;
        }

        console.log('Diary data deleted:', result.affectedRows);
        // 삭제 성공 응답 보내기
        res.status(200).json({ success: true });
    });
});

app.post('/update_good', (req, res)=>{
    const body = req.body;
    const postnum = body.postnum;
    const id = body.id;
    const insert = body.insert;
    if(insert){
        //추가
        connection.query('insert into board_good (postnum, good_id) values(?, ?)', [postnum, id], (err, rows) =>{
            if(err) throw err;
            res.status(200).json({insert: true});
        })
    }
    else{
        //삭제
        connection.query('delete from board_good where id = ? and postnum = ?', [id, postnum], (err, rows) => {
            if(err) throw err;
            res.status(200).json({
                insert: false
            });
        })
    }
})