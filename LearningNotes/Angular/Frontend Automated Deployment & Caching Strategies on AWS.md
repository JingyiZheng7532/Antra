### Architecture overview



##### 什么是前端自动化部署(Frontend Automated Deployment)？

当修改完代码并推送到仓库后，系统会自动完成构建、测试并将新版本发布到线上，无需人工干预；如果没有自动化部署，我们需要手动打包代码，然后通过FTP或者登陆服务器手动替换文件。



##### 什么是静态资源托管（Static Web Hosting）？

-> 将不需要服务器动态处理的文件存村粗在web服务器或者云端存储中

在web开发中资源通常分为两类：

- 静态资源(Static Assets): 文件内容在发送给用户之前已经确定，不会根据不同用户或请求实时改变；例如 index.html, app.css, 还有前端框架遍以后的bundle.js, logo图标等等
- 动态资源(Dynamic Assets): 需要服务器运行代码，根据数据库信息实时生成的页面



##### 为什么选择Amazon S3而非服务器托管？

传统服务器指EC2或者物理机

1. Serverless vs Server
   - 传统服务器(EC2/Nginx): 你需要负责操作系统的补丁、Nginx的配置、磁盘空间的监控以及服务器的扩容，即使没有用户访问，也要为运行中的实例付费
   - Amazon S3 是serverless -> 主要目的是存储
2. Availability & Durability
   * 空间纬度的冗余： 文件自动冗余存储在同一个区域内的至少3个可用区，即便其中一个数据中心完全瘫痪，S3的控制系统会自动切换到另外两个备份点，让用户完全感知不到异常；
   * 99.99%：每年累计无法访问的时间不超过52.56分钟。通过底层的冗余架构，确保了即使部分物理设备损坏，用于依然可以访问到文件
3. Scalability in time dimension
   - S3是一个巨大的分布式资源池。它能自动感知流量压力并横向扩展计算资源。无需额外配置复杂的Auto Scaling Group, S3能够自动处理瞬间的峰值



##### 什么是CloudFront？

* 是Amazon提供的内容分发网络 (Content Delivery Network, CDN)

  * CDN是一组分布在世界各地由成百上千台服务器组成的全球分布式网络，通过将你的网站内容缓存到里用户最近的服务器上让网页加载得更快
  * CDN如何工作？
    * 第一次访问冷启动：当某个地区的第一个用户请求资源时，CDN节点发现自己没有这个文件，便会想源站请求一份副本
    * 缓存存储：CDN节点将拿到的文件存在自己的硬盘上
    * 后续访问：之后该地区再次请求同一个文件的时候CDN节点直接从自己的缓存里拿出来发给用户，这将会极大减少对源站S3的请求次数，同时也降低了从S3流出的流量成本
    * 在自动化部署流程的最后一步，必须触发一个CloudFront Invalidation，通知所有的节点更新。

  

### Automated Deployment - CI/CD



##### Github Action

* Ubuntu是Github Actions的默认运行环境，免费
* 功能和Jenkins相同，但Jenkins的学习曲线较陡，适合大厂、私有部署和一些复杂的定制化流水线





### Caching strategies