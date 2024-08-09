// import express from 'express';
// import axios from 'axios';
// import mysql from 'mysql';
// import bodyParser from 'body-parser';
// import fs from 'fs';
// 换成es6地module模块需要重构
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const multer = require('multer');
const upload = multer({
  dest: 'upload/',
  limits: { fileSize: 10 * 1024 * 1024 } // 设置最大文件大小为 10MB
});

const mysql = require('mysql')     //引入mysql 模块
const bodyParser = require('body-parser');
app.use(express.json());
app.use('/files', express.static('/files', { download: true }));
app.use('/image/avatar', express.static('image/avatar'));
app.use('/image/textImage', express.static('image/textImage'));
app.use(bodyParser.json({ limit: '10mb' }));
const fs = require('fs');
// -----------------------------------------登录
app.post('/myland/login', async (req, res) => {
  if (!req.body.code) {
    return res.status(400).send('缺少 code 参数');
  }
  const code = req.body.code;
  const body = req.body;
  const name = req.body.name;
  const serverAddress = 'http://127.0.0.1:8080/';

  const appid = 'wx44ce5ede218f6387'; // 你的 AppID
  const secret = 'db76567b6193088f5f32e360b6ceec4d'; // 你的 AppSecret
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code&connect_redirect=1`;

  try {
    const response = await axios.post(url);
    const openid = response.data.openid;
    // ...其他代码...

    // 处理头像
    const avatarBase64 = req.body.avatar.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(avatarBase64, 'base64');
    // 确保image/avatar文件夹存在
    const avatarDir = `${process.cwd()}/image/avatar`;
    fs.mkdirSync(avatarDir, { recursive: true });
    const avatarFileName = `${openid}.jpg`;
    const filePath = `${avatarDir}/${avatarFileName}`;

    fs.writeFile(filePath, buffer, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('文件保存失败');
      } else {
        console.log('JPEG文件已成功保存！');
        // 生成HTTP可访问的URL
        const avatarUrl = `${serverAddress}image/avatar/${avatarFileName}`;
        console.log("头像:" + avatarUrl)
        // 存储用户信息到数据库
        let sqlSlc = `SELECT userId,avatarUrl FROM users WHERE openid='${openid}'`;
        let sqlStr = `INSERT INTO users (openid, name, avatarUrl) VALUES ('${openid}', '${req.body.name}', '${avatarUrl}') ON DUPLICATE KEY UPDATE name='${req.body.name}', avatarUrl='${avatarUrl}'`;
        try {
          await conn.query(sqlStr);
          await conn.query(sqlSlc, (err, results) => {
            if (err) {
              console.error('查询帖子和用户信息时出错:', err);
              res.status(500).send('查询帖子和用户信息时出错');
            } else {
              const { userId, avatarUrl: avatar } = results[0];
              res.send({ userId, avatar });
            }
          });
          console.log('用户信息已成功保存到数据库');
        } catch (dbErr) {
          console.error(dbErr);
          res.status(500).send('保存用户信息到数据库时出错');
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('获取 OpenID 时出错');
  }
});

// -----------------------------------------发布帖子

app.post('/myland/file', upload.single('file'), (req, res) => {
  const { userId, theme, title, content, linkUrl, images } = req.body;
  console.log(req.body)
});
app.post('/myland/txt', async (req, res) => {
  console.log(req.body)
  const { userId, theme, title, content, linkUrl, images } = req.body;
  const serverAddress = 'http://127.0.0.1:8080';
  // 这里定义了一个文件夹路径，将保存所有上传的图片
  const imageDir = path.join(__dirname, 'image', 'textImage');

  // 创建目标目录，如果目标目录已经存在，recursive: true 确保不会抛出错误
  fs.mkdirSync(imageDir, { recursive: true });

  const savedImagePaths = [];

  try {
    if (Array.isArray(images) && images.length > 0) {
      for (const [index, imageBase64] of images.entries()) {
        // 从 base64 字符串中去掉前缀，并转换成 Buffer
        const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

        // 定义图片的文件名，确保文件名唯一
        const imageFileName = `${userId}_${Date.now()}_${index}.jpg`;

        // 构建图片的完整路径
        const imagePath = path.join(imageDir, imageFileName);

        // 将图片 Buffer 写入到文件
        await fs.promises.writeFile(imagePath, imageBuffer);

        // 保存图片的 HTTP 访问路径到数组中
        savedImagePaths.push(`${serverAddress}/image/textImage/${imageFileName}`);
        console.log(`图片已成功保存为: ${imagePath}`);
      }
    }

    // 构建 SQL 插入语句，将帖子信息和图片路径保存到数据库
    const sql = `INSERT INTO post (userId, theme, title, content, linkUrl, image) VALUES (?, ?, ?, ?, ?, ?)`;
    conn.query(sql, [userId, theme, title, content, linkUrl, JSON.stringify(savedImagePaths)], (err, results) => {
      if (err) {
        console.error('保存帖子数据时出错:', err);
        return res.status(500).send('保存帖子数据时出错');
      }
      res.status(200).send({ message: 'Post uploaded successfully', postId: results.insertId, images: savedImagePaths });
    });
  } catch (error) {
    console.error('保存图片时出错:', error);
    res.status(500).send('保存图片时出错');
  }
});
// -----------------------------------------首页渲染

// 获取帖子和用户信息接口
app.post('/myland/index', (req, res) => {
  console.log(req.body);
  const sql = `
    SELECT 
      post.id AS postId,
      post.theme,
      post.title,
      post.content,
      post.userId AS userId,
      users.avatarUrl AS avatar,
      users.name,
      post.image,
      256 AS likeNum,
      256 AS commentNum  
    FROM 
      post
    JOIN 
      users ON post.userId = users.userId
  `;

  conn.query(sql, (err, results) => {
    if (err) {
      console.error('查询帖子和用户信息时出错:', err);
      res.status(500).send('查询帖子和用户信息时出错');
    } else {
      res.json(results);
      // console.log(results)
    }
  });
});
//-----------------------------------------详情页渲染
app.post('/myland/detail', (req, res) => {
  const { postId } = req.body; // 添加 filename 和 filesize 的解构赋值
  const filename = "download.txt";
  const filesize = "9424962";
  console.log(req.body);

  const sql = `
    SELECT 
      post.id AS postId,
      post.theme,
      post.title,
      post.content,
      post.userId AS userId,
      users.avatarUrl AS avatar,
      users.name,
      post.image,
      '${filename}' AS filename,
      ${filesize} AS filesize,
      256 AS likeNum,
      256 AS commentNum,
      '2024-07-03 02:03:30' AS updated 
    FROM 
      post
    JOIN 
      users ON post.userId = users.userId
    WHERE 
      post.id = ?`;
       // 注意这里使用 post.id 而不是 postId
      // 上面有文件，下面无文件
  // const sql = `
  //     SELECT 
  //       post.id AS postId,
  //       post.theme,
  //       post.title,
  //       post.content,
  //       post.userId AS userId,
  //       users.avatarUrl AS avatar,
  //       users.name,
  //       post.image,
  //       1 AS status
  //     FROM 
  //       post
  //     JOIN 
  //       users ON post.userId = users.userId
  //     WHERE 
  //       post.id = ?`;

  conn.query(sql, [postId], (err, results) => {
    if (err) {
      console.error('查询特定帖子时出错:', err);
      res.status(500).send('查询特定帖子时出错');
    } else if (results.length === 0) {
      res.status(404).send('帖子不存在');
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

// ----------------------------------------用户关注
app.post('/myland/follow', (req, res) => {
  console.log(req.body)
  const followedList = [1, 2, 3, 4, 5, 6];
  res.json(followedList);
});
// ----------------------------------------------下载接口
app.get('/myland/download/:postId', async (req, res) => {
  const postid = req.params.postId;
  console.log(postid)
  // 设置响应头
  res.setHeader('Content-Disposition', 'attachment; filename="download.txt"');
  res.setHeader('Content-Type', 'text/plain');

  // 创建文件流
  const filePath = path.join(__dirname, 'files', 'download.txt');
  const fileStream = fs.createReadStream(filePath);

  // 将文件流管道到响应
  fileStream.pipe(res); // 这里添加了.pipe(res)
});
// ----------------------------------------------下载接口限速版

// // 设置限速（每秒 100KB）
// const speedLimit = 100 * 1024; // 100KB
// const throttleInterval = 1000; // 1秒

// app.get('/download', (req, res) => {
//   // 设置响应头
//   res.setHeader('Content-Disposition', 'attachment; filename="download.txt"');
//   res.setHeader('Content-Type', 'text/plain');

//   // 创建文件流
//   const filePath = path.join(__dirname, 'files', 'download.txt');
//   const fileStream = fs.createReadStream(filePath);

//   // 限速传输
//   let transferredBytes = 0;
//   const throttle = setInterval(() => {
//     const chunk = fileStream.read(speedLimit);
//     if (chunk) {
//       transferredBytes += chunk.length;
//       res.write(chunk); // 将数据块写入响应
//     } else {
//       clearInterval(throttle);
//       res.end(); // 结束响应
//     }
//   }, throttleInterval);

//   // 监听文件流结束事件
//   fileStream.on('end', () => {
//     clearInterval(throttle);
//     res.end(); // 确保在文件流结束时结束响应
//   });
// });


//-----------------------------------------关注页
app.post('/myland/atten', async (req, res) => {
  console.log(req.body)
  const { followId } = req.body;
  const [firstUserId] = followId;
  console.log("followId:" + followId)
  console.log("firstUserId" + firstUserId)
  // 查询 users 表
  const usersSql = `
  SELECT
    avatarUrl as avatar,
    name
  FROM
    users
  WHERE
    userId IN (?)
`;

  // 查询 post 表
  const postSql = `
  SELECT
    *,
    256 AS likeNum,
    256 AS commentNum  
  FROM
    post
  WHERE
    userId = 15
`;
  try {
    conn.query(usersSql, [followId], (err, usersResults) => {
      if (err) {
        console.error('查询用户帖子信息时出错:', err);
        res.status(500).send('查询用户帖子信息时出错');
      } else {
        conn.query(postSql, [firstUserId], (err, postResults) => {
          if (err) {
            console.error('查询用户帖子信息时出错:', err);
            res.status(500).send('查询用户帖子信息时出错');
          } else {
            res.json({ users: usersResults, posts: postResults });
          }
        });
      }
    });
  } catch (err) {
    console.error('查询用户帖子信息时出错:', err);
    res.status(500).send('查询用户帖子信息时出错');
  }
});
//-----------------------------------------个人页帖子渲染
app.post('/myland/myself', (req, res) => {
  const { userId } = req.body;

  const sql = `
    SELECT
      post.theme,
      post.title,
      post.content,
      post.userId AS userId,
      users.avatarUrl as avatar,
      users.name,
      post.image,
      2 AS postId
    FROM
      post
    JOIN
      users ON post.userId = users.userId
    WHERE
      post.userId = ?
  `;

  conn.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('查询用户帖子信息时出错:', err);
      res.status(500).send('查询用户帖子信息时出错');
    } else {
      res.json(results);
    }
  });
});
// -----------------------------------------load
app.post('/myland/load', (req, res) => {
  const body = req.body;
  console.log("load");
  console.log(body);
});
// -----------------------------------------myland/deletepost'
app.post('/myland/deletepost', (req, res) => {
  const body = req.body;
  console.log("deletePostid");
  console.log(body);
  res.send("成功")
});
// -----------------------------------------myland/history浏览历史
app.post('/myland/history', (req, res) => {
  const { postId } = req.body;
  console.log(postId)
  const sql = `
    SELECT
      post.theme,
      post.title,
      post.content,
      post.userId AS userId,
      users.avatarUrl as avatar,
      users.name,
      post.image,
      1 AS postId
    FROM
      post
    JOIN
      users ON post.userId = users.userId
    WHERE
      post.id IN (?)
  `;

  conn.query(sql, [postId], (err, results) => {
    if (err) {
      console.error('查询用户帖子信息时出错:', err);
      res.status(500).send('查询用户帖子信息时出错');
    } else {
      res.json(results);
    }
  });
});

// -----------------------------------------数据库连接
// 定义路由(说白了就是网址)     
// app.get('/a',(req,res)=>{
//     let sqlStr =  "INSERT INTO student ( s_no, s_name )VALUES(20150015,'大帅比')"
//        //执行mysql 语句
//        conn.query(sqlStr,(err)=>{
//            console.log(err,'如果为null，sql语句执行成功')
//        })
//        res.send('插入成功')
// })
const conn = mysql.createConnection({
  user: 'root',          //用户名
  password: '123456',	//密码
  host: 'localhost',		//主机（默认都是local host）
  database: 'student'    //数据库名
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
  console.log(err, 'null即连接成功');
})
// 开启服务器
app.listen(8080, () => {
  console.log('服务器在8080端口开启......');
})