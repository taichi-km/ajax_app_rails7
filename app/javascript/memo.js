function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
  // 第一引数にsubmitイベント、第二引数に実行したい処理
    e.preventDefault();
    const formData = new FormData(form);
    // フォームに入力された値をformDataに格納する
    const XHR = new XMLHttpRequest();
    // JavaScriptがサーバーサイドにリクエストを送信するのに必要なXMLHttpRequestオブジェクトを生成
    XHR.open("POST", "/posts", true)
    // openメソッドを用いてHTTPメソッドの指定、パスの指定、非同期通信のON/OFFを指定する
    XHR.responseType = "json";
    // レスポンスのデータフォーマットをjsonに指定する
    XHR.send(formData);
  });
};
  
window.addEventListener('turbo:load', post);
// 第一引数にloadイベント、第二引数に実行したい処理