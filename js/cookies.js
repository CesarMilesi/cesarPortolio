const cookieBox = document.querySelector(".cookiesWrapper");
const accept = document.querySelector(".acceptButton");
const decline = document.querySelector(".declineButton");

const cookieCode = () => {
    // If cookie accepted, won't appear again
    if (document.cookie.includes("César")) {
        return;
    }
    cookieBox.classList.add("show");
    accept.addEventListener("click", () => {
        cookieBox.classList.remove("show");

        // Set cookie for 1 month
        document.cookie = "cookieBy = César; max-age=" + 60 * 60 * 24 * 30;
    });
    decline.addEventListener("click", () => {
        cookieBox.classList.remove("show");
    });
};

window.addEventListener("load", cookieCode);