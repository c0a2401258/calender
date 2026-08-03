//-------------------------------------
// APIへPOST通信
//-------------------------------------
async function post(url, data) {

    const res = await fetch(url, {  //指定したURLへHTTP通信をする

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)  //JSON文字列に変換して送信

    });

    return await res.json();

}


//-------------------------------------
// APIへGET通信
//-------------------------------------
async function get(url) {


    const res = await fetch(url);

    return await res.json();

}