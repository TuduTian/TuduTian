---
title:   
date: 2023-02-16
categories:  
    - uniapp
tags: 
  - uniapp 
  - wgt升级方案
sticky: 1
---

## uniapp wgt升级方案


### 准备工作 
1. 一部手机
2. 会写简单的后端服务
3. 懂前端工程化和uniapp的一些api



### 后端代码（nest 举例） 

1. 后端服务代码
```ts  
//app.service  
    import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getVersion(version: string): { url: string, version: string } {
        if (version == '1.0.1') {
            return {
                url: '',
                version: '1.0.1'
            }
        }
        console.log(version)
        return {
            url: 'http://192.168.0.108:3000/1.0.1.wgt',
            version: '1.0.1'
        }
    }
}
```

2.后端入口代码
```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 1.引入NestExpressApplication
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    // 2.加入到create
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors() //解决跨域
    // 3.配置静态资源目录
    // 可以通过  'http://192.168.0.108:3000/1.0.1.wgt' 访问到静态资源
    app.useStaticAssets('public');
    await app.listen(3000);
}
bootstrap();
```

### 前端代码（核心）
```ts
const initVersion = () => {
    //plus 获取应用信息
  plus.runtime.getProperty(plus.runtime.appid as string, async (data) => {
    //输入一下当前的版本
    uni.showModal({
      title: "当前版本" + data.version,
    });

    // 请求本机接口 这里换成自己的 吧您的当前版本发送给后端 后端根据情况判断您是否需要更新
    uni.request({
      url: "http://192.168.0.108:3000/wgt",
      data: {
        version: data.version,
      },
      //不验证ssl证书，不然的话会验证https 
      sslVerify: false, //不验证 ssl 证书
      method: "POST",
      success: (res) => {
        const version = data.version;
        const wgtURL = res.data.url;
        if (version && res.data!.version > version) {
          uni.showModal({
            title: "版本更新",
            confirmText: "下载",
            success: (res) => {
              if (res.confirm) {
                let showLoading = plus.nativeUI.showWaiting("正在下载");
                console.log(wgtURL);
                //使用uni自带的下载文件的方法 
                uni.downloadFile({
                  url: wgtURL, //要下载的地址 后端返回的地址
                  success: (downloadResult) => {
                    showLoading.close();
                    const install = plus.nativeUI.showWaiting("正在安装");
                    if (downloadResult.statusCode === 200) {

                        //把这个地址给puls 他会进行自动安装
                      plus.runtime.install(
                        downloadResult.tempFilePath,
                        {
                          force: true,
                        },
                        function () {
                          console.log("install success...");
                          install.close();
                          plus.runtime.restart();//重启app应用
                        },
                        function (e) {
                          console.error("install fail...");
                        }
                      );
                    }
                  },
                });
              }
            },
          });
        }
      },
      fail(err) {
        console.log(err, "err");
      },
    });
  });
};

initVersion();
</script>

```
