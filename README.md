# ChatVRM

これはPixiv様の[ChatVRM](https://github.com/pixiv/ChatVRM)をフォークし、ChatGPTをOllamaに、KoemotionをVOICEVOXに変更してバックエンドをOSSで再構成したものです。

ユーザの音声認識には引き続きWeb Speech API(SpeechRecognition)を使用しているため、プライバシー保護を主眼として本OSSを用いるのであればテキストによる入力を使用してください。

## 事前準備

1. [Ollama](https://ollama.com)をインストールおよび起動し、必要なモデルをpullしてください
2. [VOICEVOX](https://voicevox.hiroshiba.jp)をインストールおよび起動してください
  - 技術的にはVOICEBOXのエンジンさえ起動していれば動作するため、GUIの起動は必須ではありません

Ollama、VOICEVOXともに仕様や利用規約については公式サイトをご確認ください。

## 実行

ローカル環境で実行する場合はこのリポジトリをクローンするか、ダウンロードしてください。

```bash
git clone git@github.com:xorphitus/ChatVRM.git
```

必要なパッケージをインストールしてください。

```bash
npm install
```

パッケージのインストールが完了した後、以下のコマンドで開発用のWebサーバーを起動します。

```bash
npm run dev
```

実行後、以下のURLにアクセスして動作を確認して下さい。

[http://localhost:3000](http://localhost:3000)

### デフォルトパーソナリティの変更

```bash
cp env.example .env
```

`.env`ファイルを編集し、`NEXT_PUBLIC_PERSONALITY`環境変数を変更してください。

### Docker での実行
`next dev` を走らせているので production でそのまま使用しないこと。

```bash
docker build -f Dockerfile.dev -t chatvrm:latest
docker run -d -p 3000:3000 --name chatvrm chatvrm:latest
```
