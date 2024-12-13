document.getElementById("idme-auth-button").addEventListener("click", () => {
    const clientId = "28bf5c72de76f94a5fb1d9454e347d4e";
    const redirectUri = encodeURIComponent("https://justjacob77.github.io/idme-auth-integration/callback.html");
    const authorizationEndpoint = "https://api.id.me/oauth/authorize";
    const scope = "login";

    const authUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
});
