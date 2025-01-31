/* 
    <link rel="preload" as="image" id="loaderImg" href="https://frankgp.com/favicon.ico" />
    <script src="https://frankgp.com/component/loader.js"></script>
    <img src="https://source.unsplash.com/1080x1080" alt="" />
*/

var loaderImgElement = document.getElementById("loaderImg");
var loaderImg = loaderImgElement ? loaderImgElement.href : "/vite.svg";

document.addEventListener("DOMContentLoaded", function () {
  let loaderHTML = /* html */ `<div class="loader">
<div class="img"></div>

<style>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9;
}

.loader > .img {
  position: fixed;
  inset: 0;
  z-index: 9;
  background-image: url(${loaderImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20rem;
  animation: opacity 1s linear infinite;
}

.loader {
  content: "";
  inset: 0;
  background-color: #fffe;
  position: fixed;
  z-index: 0;
}

@keyframes opacity {
  50% {
    opacity: 0.7;
  }
}

img {
  width: 100rem;
}
</style>
</div>
`;
  document.body.insertAdjacentHTML("beforeend", loaderHTML);

  window.onload = function () {
    document.querySelector(".loader").style.display = "none";
  };
});
