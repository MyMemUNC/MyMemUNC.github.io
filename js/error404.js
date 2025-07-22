const path = window.location.pathname;

if (path.includes("/unc")) {
    document.getElementById("main-error").innerHTML = `
        <h1>Docs 404</h1>
        <p>The documentation page you’re looking for doesn’t exist.</p>`;
}