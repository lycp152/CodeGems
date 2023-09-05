# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Tip.create(text:"C言語の影響:C言語は1972年に開発され、それから数十年にわたり広く使われ続けている。そのため、現代の多くのプログラミング言語の基盤となっており、その影響は非常に大きい。")
Tip.create(text:"C++はC言語の拡張: C++はC言語を拡張した言語であり、Cとの高い互換性を持っている。C++ではCのコードをそのまま利用でき、C++言語の機能を追加できる。これは、既存のCプロジェクトをC++に移行する際に役立つ。")
Tip.create(text:"C#とMicrosoft: C#はMicrosoftによって開発され、プラットフォームでのアプリケーション開発に特に適している。.NET Coreはクロスプラットフォーム対応であり、LinuxやmacOSでもC#アプリケーションを実行できる。")
Tip.create(text:"Goはコンテナ技術の開発に関与: GoはGoogleによって開発され、非常に高速なコンパイルを実現している。またDockerのコンテナ技術は、Go言語で開発された。Goのシンプルで効率的な特性が、Dockerの成功に寄与した。")
Tip.create(text:"最初はオーク: Javaは当初、「オーク」（Oak）という名前で開発された。しかし、コンピュータ産業で同名の商標が既に存在していたため、後にJavaに名前が変更された。この名前はコーヒー豆に由来している。")
Tip.create(text:"カレンダーシステムのバグ: 2003年に発見されたJavaのカレンダーシステムのバグにより、特定の日付が正しく表示されないという問題が発生した。これは、複雑な日付計算の難しさを示している。")
Tip.create(text:"初めはMochaから始まった: JavaScriptは最初「Mocha」という名前で開発されたが、後に「LiveScript」に改名され、最終的に「JavaScript」に変更された。この名前の変更は、当時のJavaの人気に乗じるための戦略的な決定だった。")
Tip.create(text:"Microsoftが開発: TypeScriptはMicrosoftによって開発された。TypeScriptの主要な設計者の一人は、C#の設計者であるAnders Hejlsberg。この言語は、JavaScriptの静的型システムを追加して、大規模なアプリケーションの開発を支援することを目的としている。")
Tip.create(text:"個人プロジェクトから始まった: PHPは当初、個人プロジェクトとしてRasmus Lerdorfによって開発された。最初のバージョンは、彼が自身のウェブサイトを管理するために作成したスクリプト言語だった。")
Tip.create(text:"松本行弘（Matz）による開発: Rubyは日本のプログラマーである松本行弘（通称：まつもとゆきひろ、またはMatz）によって開発された。彼はプログラミング言語の設計において、プログラマの幸福と可読性を重要視しており、Rubyの設計哲学はこの思想に基づいている。")
Tip.create(text:"Practical Extraction and Reporting Languageの略: Perlの名前は「Practical Extraction and Reporting Language」の略で、初期のバージョンではテキストデータの抽出と報告を主な目的としていた。しかし、Perlはその柔軟性から汎用のスクリプト言語として広く使用されるようになった。")
Tip.create(text:"Evan Youによる個人プロジェクト: Vue.jsはEvan Youによって開発され、2014年に最初のバージョンがリリースされた。最初は個人プロジェクトとして始まりましたが、急速にコミュニティに受け入れられた。")
Tip.create(text:"Reactはフレームワークではなくライブラリ: 単独でUIコンポーネントのビルディングをサポートする。一方で、AngularやVue.jsなどはフレームワーク。")
Tip.create(text:"CSSのバージョン: CSS3は実際にはバージョン番号が存在しない、非公式な用語。CSSは連続的に進化しており、新しい機能が追加されているが、公式にはCSS仕様のレベル（Level）が指定されている。CSS3はCSSのレベル3の機能を指す言葉として広まった。")
Tip.create(text:"HTML5の統一規格: HTML5はHTML、CSS、JavaScriptを含むウェブ技術の統合規格であり、ウェブ開発者がさまざまなメディアやプラットフォームに適したコンテンツを作成するための多くの新機能を提供している。また、オーディオやビデオのネイティブサポートなど、多くの優れた機能が導入された。")

GemSkin.create(name:"C", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"C#", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"Go", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"Java", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"JavaScript", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"TypeScript", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"PHP", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"Ruby", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"Perl", categoryId:1, imageUrl:"/front/public/images/")
GemSkin.create(name:"Vue.js", categoryId:2, imageUrl:"/front/public/images/")
GemSkin.create(name:"React", categoryId:2, imageUrl:"/front/public/images/")
GemSkin.create(name:"CSS3", categoryId:2, imageUrl:"/front/public/images/")
GemSkin.create(name:"HTML5", categoryId:2, imageUrl:"/front/public/images/")