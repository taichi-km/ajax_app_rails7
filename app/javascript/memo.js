const buildHTML = (XHR) => {
  const item = XHR.response.post;
  // レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納する
  // postsコントローラーのcreateアクションでpostというキーと投稿されたメモの内容が紐付いている
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
  // 第一引数にsubmitイベント、第二引数に実行したい処理
    e.preventDefault();
    // 「投稿ボタンをクリックした」というイベントを無効化し、勝手にリクエストが送信されるのを防ぐ
    const formData = new FormData(form);
    // フォームに入力された値をformDataに格納する
    const XHR = new XMLHttpRequest();
    // JavaScriptがサーバーサイドにリクエストを送信するのに必要なXMLHttpRequestオブジェクトを生成
    XHR.open("POST", "/posts", true);
    // openメソッドを用いてHTTPメソッドの指定、パスの指定、非同期通信のON/OFFを指定する
    XHR.responseType = "json";
    // レスポンスのデータフォーマットをjsonに指定する
    XHR.send(formData);
    XHR.onload = () => {
    // リクエストの送信が成功したときに処理が実行される
      if (XHR.status != 200) {
      // HTTPステータスコードが200以外（リクエストが失敗）の場合
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
        // JavaScriptの処理から抜け出し、これ以降の処理を行わないようにする
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      // item内に格納されたメモの情報を元に、ブラウザに描画するためのHTMLを生成し、変数htmlに格納
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // 変数listに格納された要素の直後に生成したHTMLを挿入する
      formText.value = "";
      // formTextのvalue属性に空の文字列を指定することで、フォームの中身をリセットする
    };
  });
};
  
window.addEventListener('turbo:load', post);
// 第一引数にloadイベント、第二引数に実行したい処理