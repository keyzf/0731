# Radmin
An enterprise-class front-end framework of management system and React-based implementation.

### Install

Install the project creation tool.
```sh
$ npm install radmin-tool -g
```

Create the project (may need sudo), and install the dependencies.
```sh
$ radmin-tool demo project-name
$ cd [project-name]
$ npm install
```

Start webpack development server, and which enables hot module replacement.
```sh
$ npm start
```

Additionally, use __npm run build__ to publish (compressed).

Visit http://127.0.0.1:80 to view your web pages. If you want to use qq or oa login component, please configure qq domain in the hosts file.

### Usage
If you're new to radmin, check out the resources on [radmin.qq.com](http://radmin.qq.com).

### Directory Structure

```sh
radmin project
├── README.md
├── package.json    # package.json
├── docs    # documents
├── src    # source code folder
├── web    # publish folder
├── webpack.dev.server.js    # webpack hot server
├── webpack.hot.config.js    # webpack hot server config
└── webpack.production.config.js    # build config
```

### License

The MIT License([http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT))

### Suggestion

We welcome all suggestions. Please send [mail](mailto:yuxingyang@tencent.com,mokang@tencent.com,nateji@tencent.com) to us.
