# techmoney

子どもたちが「おかね」について学ぶことができる総合サービス

## Features

子どもが事前に指定されたお手伝いを実施→親から承認を受ければ口座にお金が振り込まれる一連の流れを実装
- サインアップ、ログイン、ログアウト
- カレンダー機能
- お手伝い一覧、お手伝い実施状況の確認（子ども側のTODO管理）
- 実施されたお手伝い一覧の確認と承認機能
- 各口座残高確認

## Built With

- JavaScript
- [Next.js](https://nextjs.org/): 12.2.5
- [Firebase](https://firebase.google.com/?hl=ja): 9.9.3
- [bootstrap](https://getbootstrap.jp/): 5.2.0
- [Node.js](https://nodejs.org/ja/): 16.16.0
- [Prisma](https://www.prisma.io/): 4.3.0
- [MySQL](https://www.mysql.com/jp/): 8.0
- [Docker](https://www.docker.com/): 20.10.17

## Getting Started

1.Clone this repository

```bash
$ git clone https://github.com/suuuuetsugu/techmoney.git
```

2.Move to the root directory

```bash
$ cd techmoney
```

3.Download dependencies

```bash
$ docker-compose run -w /src/frontend --rm frontend npm install
$ docker-compose run -w /src/backend --rm backend npm install
```

4.Run the App

```bash
$ docker-compose up -d
```

5.Open http://localhost:3000 with your browser to see the App

## Author

[suuuuetsugu](https://github.com/suuuuetsugu) /  [7oooomi](https://github.com/7oooomi)
