// =================================
// ログイン
// 担当：B
// =================================


ログイン処理
async function login() {

    // 入力値取得
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // エラーメッセージ表示用
    const message = document.getElementById("login-message");

    // 未入力チェック
    if (email === "" || password === "") {

        message.textContent =
            "ユーザー名とパスワードを入力してください";

        message.style.color = "red";

        return;
    }

    try {

        // PHPへ送信
        const result = await post(
            "php/login.php",
            {
                email: email,
                password: password
            }
        );

        // ログイン成功
        if (result.status === "success") {

            message.textContent = "ログイン成功";

            message.style.color = "green";

            // カレンダー画面へ移動
            showCalendar();
            showSchedule();
            showPopup();

        }
        // ログイン失敗
        else {

            message.textContent = result.message;

            message.style.color = "red";
        }

    } catch (error) {

        message.textContent =
            "通信エラーが発生しました";

        message.style.color = "red";

        console.error(error);
    }
}