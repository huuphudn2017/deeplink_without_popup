window.onload = function () {
  const timeout = 500;

  const storeContainer = document.getElementById("storeContainer");
  const playButton = document.getElementById("playButton");
  const appleButton = document.getElementById("appleButton");

  const openDeepLink = document.getElementById("openDeepLink");

  const closeDialogBtn = document.getElementById("closeDialogBtn");
  const dialogOverlay = document.getElementById("dialogOverlay");

  const qrCodeView = document.getElementById("qrCodeView");

  const urlParams = new URLSearchParams(window.location.search);
  const groupCode = urlParams.get("groupcode");

  const androidStoreLink = `intent://play.google.com/store/apps/details?id=com.sw.katinatkafe&referrer=utm_groupcode%3D${groupCode}#Intent;scheme=https;package=com.android.vending;end`;
  // const androidStoreDesktopLink = `https://play.google.com/store/search?q=katinat&c=apps`;
  const iosStoreLink = `https://apps.apple.com/app/id6462999997`;

  // const deepLink = `katinat://grouporder?groupcode=${groupCode}`;
  const deepLink = `intent://grouporder?groupcode=${groupCode}#Intent;scheme=katinat;package=com.sw.katinatkafe;end`;

  const os = getMobileOperatingSystem();

  new QRCode(qrCodeView, {
    text: window.location.href,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  if (os === "Android") {
    window.location = deepLink;
    storeContainer.style.display = "inline-block";
    playButton.style.display = "inline-block";
  }

  if (os === "ios") {
    window.location = deepLink;
    storeContainer.style.display = "inline-block";
    appleButton.style.display = "inline-block";
  }

  if (os !== "ios" && os !== "Android") {
    dialogOverlay.style.display = "block";
  }

  appleButton.addEventListener("click", () => {
    window.location = iosStoreLink;
  });

  playButton.addEventListener("click", () => {
    window.location = androidStoreLink;
  });

  closeDialogBtn.addEventListener("click", function () {
    dialogOverlay.style.display = "none";
    window.location = "https://katinat.vn/";
  });

  dialogOverlay.addEventListener("click", function (event) {
    if (event.target === dialogOverlay) {
      dialogOverlay.style.display = "none";
    }
    window.location = "https://katinat.vn/";
  });

  setTimeout(function () {
    if (os === "Android") {
      window.location = androidStoreLink;
    } else if (os === "ios") {
      window.location = iosStoreLink;
    } else {
      //
    }
    // openDeepLink.click();
  }, timeout);
};

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }

  return "unknown";
}
