SET NAMES UTF8;
DROP DATABASE IF EXISTS bok;
CREATE DATABASE bok CHARSET=UTF8;
USE bok;

/*文章 内容 列表*/ 
CREATE TABLE bok_article(
  id INT PRIMARY KEY AUTO_INCREMENT DEFAULT NULL,  /*列表id*/
  title VARCHAR(128) NOT NULL,                     /*标题*/
  content VARCHAR(2560) NOT NULL,                  /*文章内容*/
  likes INT NOT NULL,                              /*喜欢/人气*/
  comment INT NOT NULL,                            /*评论*/
  data VARCHAR(24) NOT NULL,                       /*发表时间*/
  upuser VARCHAR(64) NOT NULL,                     /*发表用户*/
  isDel CHAR(1) DEFAULT '0'                        /*是否删除*/
);
/*插入文章 内容 列表 */
INSERT INTO bok_article VALUES (NULL, '关于一道promise的面试题', '之前说过，在定时器，事件，ajax等操作的时候，会使一个异步操作，会把该操作放到一个task queue里，需要等当前主线程的任务完成后，会读取任务队列(task queue)中的是事件。那么，setTimeout会放到任务队列中，代码继续往下走。所以先输出2 3。promise中的then操作是放在执行栈，也就是主线程的最后。 那么主线程会继续往下走咯。所以输出 5 4 最后主线程的任务搞完了，才会去执行task queue中的任务。所以最后执行1// 2， 3， 5， 4， 1', '44', '445', '2017-12-4 08:52:44', 'admin', '0');

/*用户信息 user*/
CREATE TABLE bok_user (
  uid INT PRIMARY KEY AUTO_INCREMENT DEFAULT NULL, /*用户id*/
  username VARCHAR(50) NOT NULL,                       /*用户名称*/
  password VARCHAR(50) NOT NULL,                       /*密码*/
  email VARCHAR(50) DEFAULT NULL,                      /*邮箱*/
  phone CHAR(11) NOT NULL,                             /*手机*/
  Label VARCHAR(128) ,                                 /*宣言(个性签名)*/
  address VARCHAR(24) DEFAULT NULL,                    /*地址*/
  createTime CHAR(10) NOT NULL,                        /*创建时间*/
  userIco   VARCHAR(128) DEFAULT NULL,                 /*头像*/
  articleCount INT DEFAULT 0                           /*发表文章数量*/
 );

INSERT INTO bok_user VALUES (NULL, 'admin', 'admin', '88888@admin.com', '88888888888', '管理权最大者', 'box社区', '2018-11-17', NULL, '0');


 /*文章 评论信息*/
CREATE TABLE bok_comment (
  cid INT PRIMARY KEY AUTO_INCREMENT DEFAULT NULL,   /*评论id*/
  id INT NOT NULL,                                   /*绑定文章id*/
  uid INT NOT NULL,                                  /*绑定用户id*/
  content VARCHAR(258),                              /*评论内容*/
  FOREIGN KEY(id) REFERENCES bok_article(id),
  FOREIGN KEY(uid) REFERENCES bok_user(uid)
);

