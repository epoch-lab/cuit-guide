**本模块是公共类课程，适合绝大部分计算机岗位。但服务端岗位只需要简单学习 HTTP，不需要了解 TLS 协议具体内容**

## 讲讲 Http 和 Https 的区别

HTTP（HyperText Transfer Protocol）和 HTTPS（HyperText Transfer Protocol Secure）是两种网络传输协议，主要区别如下：

1. HTTP 是明文传输，HTTPS 是加密传输：HTTP 是明文传输，数据不加密，安全性较低，容易被窃听和篡改；HTTPS 是加密传输，数据加密传输，安全性较高，可以防止窃听和篡改。
2. HTTP 默认端口是 80，HTTPS 默认端口是 443：HTTP 默认端口是 80，HTTPS 默认端口是 443，通过端口可以区分 HTTP 和 HTTPS。
3. HTTP 不需要证书，HTTPS 需要证书：HTTP 不需要证书，直接传输数据；HTTPS 需要证书，需要向 CA 机构申请证书，用于加密传输数据。
4. HTTP 的连接速度快，HTTPS 的连接速度慢：HTTP 的连接速度快，数据传输快；HTTPS 的连接速度慢，数据传输慢，因为需要加密和解密数据。
5. HTTP 和 HTTPS 使用的是不同的 URL：HTTP 使用`http://`开头的 URL，HTTPS 使用`https://`开头的 URL，通过 URL 可以区分 HTTP 和 HTTPS。

HTTP 和 HTTPS 的主要区别是安全性和速度，根据不同的需求选择合适的传输协议。

## ws 和 wss(WebSocket Secure) 有什么区别？

WebSocket 是一种全双工通信协议，它可以在客户端和服务器之间建立持久连接，实现实时通信。WebSocket 的数据传输是明文传输的，不安全，容易被中间人攻击。wss 是 WebSocket 的加密版本，它使用 TLS/SSL 协议对数据进行加密传输，安全性更高，不易被中间人攻击。

在实际应用中，如果需要保护数据的安全性，可以使用 wss 协议，如果不需要保护数据的安全性，可以使用 WebSocket 协议。

## 讲讲`GET`和`POST`的区别

`GET`和`POST`是 HTTP 协议中的两种请求方法，主要区别如下：

1. `GET`请求：`GET`请求是一种幂等的请求方法，用于从服务器获取资源，通过 URL 传递参数，参数会显示在 URL 中，有长度限制，不安全，不适合传输敏感数据。
2. `POST`请求：`POST`请求是一种非幂等的请求方法，用于向服务器提交数据，通过请求体传递参数，参数不会显示在 URL 中，没有长度限制，安全，适合传输敏感数据。
3. `GET`请求的参数会显示在 URL 中，`POST`请求的参数不会显示在 URL 中。
4. `GET`请求的参数有长度限制，`POST`请求的参数没有长度限制。
5. `GET`请求的参数不安全，`POST`请求的参数相对安全。

`GET`和`POST`的主要区别是传递参数的方式、参数的安全性和长度限制，根据不同的需求选择合适的请求方法。

## 讲讲常见的 HTTP 状态码

HTTP 状态码是 HTTP 协议中的一种响应状态码，主要有以下几种状态码：

1. 1xx：信息状态码，表示请求已接收，继续处理。
2. 2xx：成功状态码，表示请求已成功接收、理解、接受。
   - 200 OK：请求成功。
   - 201 Created：请求已创建。
   - 202 Accepted：请求已接受。
3. 3xx：重定向状态码，表示需要进一步操作以完成请求。
   - 301 Moved Permanently：永久重定向。
   - 302 Found：临时重定向。
   - 304 Not Modified：未修改，已缓存。
4. 4xx：客户端错误状态码，表示请求包含语法错误或无法完成请求。
   - 400 Bad Request：请求错误。
   - 401 Unauthorized：未授权。
   - 403 Forbidden：禁止访问。
   - 404 Not Found：未找到。
   - 405 Method Not Allowed：方法不允许。
5. 5xx：服务器错误状态码，表示服务器无法完成明显有效的请求。
   - 500 Internal Server Error：服务器错误。
   - 501 Not Implemented：未实现。
   - 503 Service Unavailable：服务不可用。

HTTP 状态码主要是为了表示请求的处理结果，根据不同的状态码进行不同的处理。

## 讲讲 WebSocket 连接建立的详细过程。

WebSocket 连接建立的详细过程如下：

1. 客户端发起 HTTP 请求，请求头中包含`Upgrade: websocket，Connection: Upgrade，Sec-WebSocket-Key`等字段。
2. 服务器返回 HTTP 响应，响应头中包含`Upgrade: websocket，Connection: Upgrade，Sec-WebSocket-Accept`等字段，状态码为 101。
3. 客户端收到 HTTP 响应，校验`Sec-WebSocket-Accept`字段，如果校验通过，连接建立成功。
4. 客户端和服务器之间可以进行全双工通信，实时传输数据。

总的来说，进行了一次握手，不过如果算上 TCP 的三次握手，其实是四次握手。

## 讲讲 WebSocket 连接断开的详细过程。

WebSocket 连接断开的详细过程如下：

1. 客户端或服务器发起关闭连接请求，请求头中包含`Connection: close`字段。
2. 对方返回关闭连接响应，响应头中包含`Connection: close`字段。
3. 客户端或服务器收到关闭连接响应，连接断开成功。

总的来说，进行了一次握手，不过如果算上 TCP 的四次挥手，其实是五次挥手。