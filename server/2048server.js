const express = require('express');
const axios = require('axios');
const app = express();
const mysql = require('mysql')     //引入mysql 模块
const multer = require('multer');
const upload = multer({ dest: 'uploads/avatarUrl' });//微信上传解析模块（没有无法实现上传）
const fs = require('fs');
const { log } = require('console');
// const app = express()              //创建实例，上面已有
app.use(express.json());
app.use('/uploads', express.static('uploads'));
// ---------------------------------------------用户登陆模块--------------------------------------------
app.post('/login', async (req, res) => {
  console.log(req.body.code.code)
  console.log("头像" + req.body.imgname.avatarUrl)
  console.log("名字" + req.body.imgname.nickName)
  if (!req.body.code.code) {
    return res.status(400).send('缺少 code 参数');
  }
  const code = req.body.code.code;
  console.log("code:" + code);

  const appid = 'wx44ce5ede218f6387';
  const secret = 'db76567b6193088f5f32e360b6ceec4d';
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code&connect_redirect=1`;

  try {
    const name = req.body.imgname.nickName;
    const avatarUrl = req.body.imgname.avatarUrl;
    const response = await axios.post(url);
    const openid = response.data.openid;
    console.log(openid);
    res.send(openid);
    // 数据库命名 id自增、openid、name、avatarurl
    let sqlStr = `INSERT INTO users (openid, name, avatarUrl) VALUES ('${openid}', '${name}', '${avatarUrl}')`;
    //执行mysql 语句
    conn.query(sqlStr, (err) => {
      console.log(err, 'sql语句执行成功')
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('获取 OpenID 时出错');
  }
});
// ---------------------------------------------用户上传头像模块--------------------------------------------
// 上传图片
app.post('/upload/avatarUrl', upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log("接收成功");
  console.log(file);

  const filePath = file.path;
  const fileSize = file.size;
  const openid = req.body.openid;

  // 创建服务器地址
  const serverAddress = 'http://127.0.0.1:3000/';

  // 将文件路径中的所有反斜杠替换为正斜杠
  const urlPath = filePath.replace(/\\/g, '/');

  // 创建图片的 URL
  const avatarUrl = serverAddress + urlPath;

  console.log(avatarUrl);
  // 更新 users 表中的 avatarUrl 字段
  let sqlStr = `UPDATE users SET avatarUrl = ? WHERE openid = ?`;
  conn.query(sqlStr, [avatarUrl, openid], (err, results) => {
    if (err) {
      console.error(err);
      res.send({ success: false });
    } else {
      res.send({ avatarUrl });
      console.log('sql语句执行成功');
    }
  });
});
// ---------------------------------------------用户查询并存储头像位置模块--------------------------------------------
app.post('/users', async (req, res) => {
  const openid = req.body.openid
  let sqlStr = `SELECT avatarUrl, name FROM users WHERE openid = ?`;
  conn.query(sqlStr, [openid], (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.json(results); 
      console.log(results);
      console.log('sql语句执行成功');
    }
  });
});
// ---------------------------------------------用户进入排行榜模块--------------------------------------------
app.get('/ranking', async (req, res) => {
  try {
    let sqlStr = `SELECT score, avatarUrl, name FROM ranking WHERE openid IS NOT NULL GROUP BY score, avatarUrl, name ORDER BY score DESC LIMIT 10;`;
      conn.query(sqlStr, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        console.log('sql语句执行成功');
        res.json(results); // 将结果转换为JSON格式并发送
      }
    });
  } catch (error) {
    console.error(error);
  }
});
// ---------------------------------------------用户记录分数模块--------------------------------------------
app.get('/game', async (req, res) => {
  try {
    const openid = req.query.openid;
    const score = req.query.score;

    // 查询users表
    let userSqlStr = `SELECT avatarUrl, name FROM users WHERE openid = '${openid}'`;
    conn.query(userSqlStr, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        const avatarUrl = results[0].avatarUrl;
        const name = results[0].name;

        // 插入ranking表
        let rankingSqlStr = `INSERT INTO ranking (openid, name, avatarUrl, score) VALUES ('${openid}', '${name}', '${avatarUrl}', '${score}')`;
        conn.query(rankingSqlStr, (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send('Server error');
          } else {
            console.log("记录排行榜成功");
            console.log('sql语句执行成功');
            res.json(results); // 将结果转换为JSON格式并发送
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
});
// ---------------------------------------------用户存档模块--------------------------------------------
app.post('/record', async (req, res) => {
  const grid = req.body.grid;
  const openid = req.body.openid;
  // 开始一个事务
  conn.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    // 执行 DELETE 操作
    let sqlremove = `DELETE FROM record WHERE openid = ?`;
    conn.query(sqlremove, [openid], (err, deleteResults) => {
      if (err) {
        console.error(err);
        conn.rollback(() => {
          res.status(500).send('Server error');
        });
        return;
      }

      // 执行 INSERT 操作
      let sqlStr = `INSERT INTO record (openid, grid) VALUES ('${openid}', '${grid}')`;
      console.log(sqlStr)
      conn.query(sqlStr, [openid, grid], (err, insertResults) => {
        if (err) {
          console.error(err);
          conn.rollback(() => {
            res.status(500).send('Server error');
          });
          return;
        }

        // 提交事务
        conn.commit((err) => {
          if (err) {
            console.error(err);
            conn.rollback(() => {
              res.status(500).send('Server error');
            });
          } else {
            console.log('事务执行成功');
            res.json(insertResults);
          }
        });
      });
    });
  });
});
// ---------------------------------------------用户存档删除模块--------------------------------------------
app.post('/record/remove', async (req, res) => {
  console.log("record打印:" + req.body.openid)
  console.log("record打印:" + req.body.grid)
  const grid = req.body.grid;
  const openid = req.body.openid;
  let sqlStr = `DELETE FROM record WHERE openid = '${openid}'`;
  conn.query(sqlStr, [openid], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      console.log('sql语句执行成功');
      res.json(results); // 将结果转换为JSON格式并发送
    }
  });
});
// ---------------------------------------------查询并提取用户存档模块--------------------------------------------
app.post('/record/select', async (req, res) => {
  console.log("record打印:" + req.body.openid)
  const openid = req.body.openid;
  let sqlStr = `select * FROM record WHERE openid = '${openid}';`;
  conn.query(sqlStr, [openid], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      console.log('sql语句执行成功');
      console.log(results);
      res.json(results); // 将结果转换为JSON格式并发送
    }
  });
});
// ---------------------------------------------数据库连接--------------------------------------------
const conn = mysql.createConnection({
  user: 'root',          //用户名
  password: '123456',	//密码
  host: 'localhost',		//主机（默认都是local host）
  database: 'game'    //数据库名
})
app.get('/find', (req, res) => {
  let sql = `SELECT * FROM users `
  conn.query(sql, (err, results) => {
    //返回的查询信息为result 然后将其显示在页面上
    res.send(results)
  })
})
// 测试连接
conn.connect(err => {
  console.log(err, '连接成功');
})
// 开启服务器
app.listen(3000, () => {
  console.log('服务器在3000端口开启。。。。。');
})