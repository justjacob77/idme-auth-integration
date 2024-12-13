const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

if (code) {
    const tokenEndpoint = "https://api.id.me/oauth/token";
    const clientId = "28bf5c72de76f94a5fb1d9454e347d4e";
    const clientSecret = "3e9f2e9716dba6ec74a2e42e90974828";
    const redirectUri = "http://localhost:5500/callback.html";

    const tokenData = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
    };

    fetch(tokenEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(tokenData),
    })
        .then((response) => response.json())
        .then((data) => {
            const userinfoEndpoint = "https://api.id.me/api/public/v3/userinfo";
            return fetch(userinfoEndpoint, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },
            });
        })
        .then((response) => response.json())
        .then((userInfo) => {
            document.getElementById("response").textContent = JSON.stringify(userInfo, null, 2);
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("response").textContent = `Error: ${error.message}`;
        });
}
