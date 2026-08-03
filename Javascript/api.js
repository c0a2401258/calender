//-------------------------------------
// APIへPOST通信
//-------------------------------------
async function post(url, data) {

    const res = await fetch(url, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

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