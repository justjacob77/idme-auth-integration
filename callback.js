document.addEventListener("DOMContentLoaded", function () {
    const IDme = {
        access_token: null,

        // Extract the access token from the URL fragment
        extractAccessToken: function () {
            const hash = window.location.hash;
            if (hash.includes("access_token=")) {
                this.access_token = hash.split("access_token=")[1].split("&")[0];
            } else {
                console.error("Access token not found in URL.");
            }
        },

        // Generate the request parameters for the user info fetch
        params: function () {
            return {
                url: `https://api.id.me/api/public/v3/attributes.json?access_token=${this.access_token}`,
            };
        },

        // Perform the user info request
        request: async function () {
            if (this.access_token) {
                try {
                    const response = await fetch(this.params().url);
                    const data = await response.json();

                    // Process the response
                    if (data.status && data.status[0]?.verified) {
                        const name = data.attributes?.[0]?.value || "User";
                        const subgroup = data.status[0]?.subgroups?.[0] || "group";

                        document.getElementById("response").innerHTML = `
                            <span>Thank you, ${name}, for verifying your ${subgroup} status with ID.me.</span>
                        `;
                    } else {
                        document.getElementById("response").textContent =
                            "Verification failed or data unavailable.";
                    }

                    console.log(data);
                } catch (error) {
                    console.error("Error fetching user info:", error);
                    document.getElementById("response").textContent = "An error occurred while fetching user info.";
                }
            } else {
                document.getElementById("response").textContent = "Access token is missing.";
            }
        },
    };

    // Initialize the process
    IDme.extractAccessToken();
    IDme.request();
});
