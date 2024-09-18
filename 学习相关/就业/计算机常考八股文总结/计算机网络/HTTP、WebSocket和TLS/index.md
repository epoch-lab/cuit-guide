**本模块是公共类课程，适合绝大部分计算机岗位。但部分内容若非`前端开发`、`移动端开发`、`客户端（桌面应用、游戏开发）`等“大前端”岗位则了解即可。**

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

HTTP 状态码是 HTTP 协议中的一种响应状态码，主要有以下几种状态码：（没必要背，了解即可，面试要是考这些死记硬背的东西就太蠢了）

1. 1xx：信息状态码，表示请求已接收，继续处理。
   - 101 Switching Protocols：切换协议，比如 HTTP 升级为 WebSocket 协议。
2. 2xx：成功状态码，表示请求已成功接收、理解、接受。
   - 200 OK：请求成功。
   - 201 Created：请求已创建。
   - 202 Accepted：请求已接受。
   - 204 No Content：无内容。（没有 body 内容）
   - 206 Partial Content：部分内容。（分块传输）
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
   - 406 Not Acceptable：资源满足不了请求头中的条件。
   - 408 Request Timeout：请求超时。
   - 409 Conflict：多个请求发生冲突。
   - 413 Payload Too Large：请求体太大。
   - 414 URI Too Long：URI 太长。
   - 429 Too Many Requests：请求过多。
   - 431 Request Header Fields Too Large：请求头字段太大。
5. 5xx：服务器错误状态码，表示服务器无法完成明显有效的请求。
   - 500 Internal Server Error：服务器错误。
   - 501 Not Implemented：未实现。
   - 502 Bad Gateway：网关错误。
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

## 讲讲 HTTP 报文的结构（非“大前端”岗位了解即可）

HTTP/1.1 报文主要分为请求报文和响应报文，结构如下：

1. 请求报文：
   - 请求行：包含请求方法、请求 URL、HTTP 版本。格式为`<method> <URL> <version>`，如`GET /index.html HTTP/1.1`。
   - 请求头：包含请求头字段和请求头值。格式为`<header>: <value>`，如`Host: www.example.com`，不止一行，多个不同的请求头会用换行符分隔。
   - 空行：请求头和请求体之间的空行。
   - 请求体：包含请求参数和请求数据。

2. 响应报文：
   - 状态行：包含 HTTP 版本、状态码、状态消息。格式为`<version> <status code> <status message>`，如`HTTP/1.1 200 OK`。
   - 响应头：包含响应头字段和响应头值。格式为`<header>: <value>`，如`Content-Type: text/html`，不止一行，多个不同的响应头会用换行符分隔。
   - 空行：响应头和响应体之间的空行。
   - 响应体：包含响应数据和响应结果。

报文头总体结构遵守以下规则：

1. 字段名不区分大小写
2. 字段名不允许出现空格和下划线
3. 字段名后面紧跟一个冒号

此外，每一行后都以遵守`ABNF`规则的`CRLF`（回车换行）结尾。

## 讲讲 URI 的结构（非“大前端”岗位了解即可）

URI（Uniform Resource Identifier）是统一资源标识符，用于标识互联网上的资源，主要包括 URL 和 URN 两种形式。

URI 的结构：`scheme://authority/path?query#fragment`，具体如下：
- `scheme`：协议名称，如`http`、`https`。
- `authority`：资源的所有者或者管理者，结构为`[user:password@]host[:port]`。
- `path`：资源的路径，如`/index.html`。
- `query`：查询参数，如`?id=1`。
- `fragment`：片段标识符，如`#section1`。

但要注意，直接在 URI 当中包含用户名和密码是不安全的，请尽可能避免这种情况，即便在内网环境下也要注意。

URI 的编码是 ASCII 字符集的超集，所有非 ASCII 字符和界定符都转为`%`加上两位十六进制数，如空格转为`%20`。

## 如何在 HTTP/1.1 解决队头阻塞问题（非“大前端”岗位了解即可）

队头阻塞是指在 HTTP/1.1 中，传输是一问一答的，每个任务都放在队列中，只有前一个任务完成后，才能进行下一个任务，一旦前一个任务耗时过长，会导致后续任务等待时间过长，影响性能。

如果要在 HTTP/1.1 中解决队头阻塞问题，可以采用以下几种方法：

1. **并发连接**：通过并发连接，可以同时发送多个请求，提高并发性能。Chrome 浏览器默认支持 6 个并发连接。
2. **域名分片**：通过域名分片，可以将资源分散到不同的域名下，提高并发性能。如`www.example.com`、`static.example.com`，不同二级域名都指向同一个服务器。

## 讲讲 HTTP/2 的改进点（非“大前端”岗位了解即可）

HTTP/2 是 HTTP/1.1 的升级版本，主要改进点如下：

1. **头部压缩**：HTTP/2 使用 HPACK 算法对头部进行压缩，减少头部大小，提高传输效率。客户端和服务端各自维护一个哈希索引表，用于存储头部字段和值，对于出现过的头部字段和值，只需要发送索引值（如`1`、`2`）即可，减少重复传输。此外，整数和字符串被进行了 Huffman 编码，减少了传输大小。
2. **多路复用**：HTTP/2 使用多路复用技术，可以在一个连接上同时传输多个请求和响应，避免队头阻塞问题，提高传输效率。多路复用是通过二进制分帧（Binary Framing）实现的，将请求和响应拆分为多个帧，每个帧通过流 ID 标识，不同流的帧可以混合在一起传输，没有先后顺序（同一个流的帧保持顺序），解决了排队等待的问题。
3. **服务器推送**：HTTP/2 支持服务器推送技术，服务器可以在客户端请求之前主动推送 HTML 引用的其他资源，提高性能。服务器推送是通过 PUSH_PROMISE 帧实现的，服务器在收到客户端请求后，可以主动推送资源，客户端可以选择接收或拒绝。

## 讲讲什么是 TLS/SSL 协议（非“大前端”岗位了解即可）

SSL（Secure Sockets Layer）是安全套接字层协议，在 OSI 模型中位于会话层，用于保护网络通信的安全性。SSL 发展到第三个大版本后，改名为 TLS（Transport Layer Security），TLS 1.0 实际上就是 SSL 3.1 版本。

不管是 HTTPS、WSS 还是 FTPS，只要后面多跟了一个 S，就表示是原有协议附上了 SSL/TLS 加密。

## TLS 1.2 是如何握手的（非“大前端”岗位了解即可）

TLS 1.2 一般使用 `ECDHE` （Elliptic Curve Diffie-Hellman Ephemeral）算法进行密钥交换，这个算法是一种基于椭圆曲线的密钥交换算法，可以实现前向保密性，保护通信的安全性。

过程主要分为以下几个步骤：

1. **客户端发送 ClientHello**：客户端向服务器发送 ClientHello 消息，包含支持的 TLS 版本、加密套件列表、随机数（client_random）等信息。
   
   所谓加密套件，就是加密算法和哈希算法的组合，如`TLS_RSA_WITH_AES_128_CBC_SHA256`。意思是在 TLS 协议下，使用 RSA 算法进行密钥交换，128 位的 AES 算法进行对称加密，通过 CBC 分组模式，SHA256 哈希算法进行消息摘要。

2. **服务器发送 ServerHello**：服务器向客户端发送 ServerHello 消息，包含选择的 TLS 版本、加密套件、服务器证书、随机数（server_random）、参数（server_params）等信息。
   
3. **客户端验证服务器证书和签名**：客户端验证服务器证书的有效性，包括证书是否过期、证书是否被吊销、证书是否与域名匹配等。如果验证通过，传递 `client_params` 给服务器。此时可以提前抢跑，发送 HTTP 请求，节省一个 RTT，这个过程叫做`TLS False Start`。

4. **双端生成密钥**：接下来，通过传入两个 `params` 参数，使用 `ECDHE` 算法生成 `pre_random`。最后通过三个随机数生成 `secret`，之后的通信都是通过这个 `secret` 进行加密解密。

值得一提的是，在之前的 TLS 加密协议中，主要以 RSA 算法为主。

RSA 算法是一种非对称加密算法，可以实现加密和解密，数字签名和验证，主要特点是公钥加密、私钥解密，公钥验证、私钥签名。

但由于 RSA 算法速度慢，且有安全隐患，在存在漏洞的情况下，如果被攻击者计算出了私钥，那么整个通信过程就会被破解。相比之下，即便攻击者计算出了 ECDHE 算法中的私钥，也只能破解当前通信，不会影响到其他通信。

因此，在 TLS 1.3 中，已经将 RSA 算法移除。