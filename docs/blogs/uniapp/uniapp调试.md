---
title:   
date: 2023-08-16
categories:  
    - uniapp
tags: 
  - uniapp 
  - 调试uniapp
sticky: 1
---

## 调试uniapp  


### win调试安卓
自行百度


### win调试ios
1. 这里用的是自带的ipa进行签名的，适合我这种穷人


### 步骤
1. 邮件桌面的 \HBuilderX  并且打开文件所在文件夹
2. 打开 \plugins\launcher\base  文件夹
3. 下载爱思助手
4. 使用数据线连接您的苹果手机
5. 下载  iTunes 这个软件，此时手机上会弹出是否信任该电脑
6. 点击信任该电脑
7. 打开爱思助手 工具箱  ipa签名  使用 apple id 签名  输入appleid的账号密码，ps:有苹果手机基本都有的
8. 签名完成之后 爱思助手左上角会有一个 打开已签名的ipa位置 点击之后 将ipa文件改成  iPhone_base_signed.ipa  复制粘贴到   \plugins\launcher\base 文件夹下
9. 此时真机调试就可以调试ios的应用

注意： appleid 每次签名只有七天，七天后需要重新签名，不过对于调试ios应用来说已经够用了


