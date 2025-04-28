window.onload = function () {
  // Initialize elements
  const storeContainer = document.getElementById("storeContainer");
  const playButton = document.getElementById("playButton");
  const appleButton = document.getElementById("appleButton");
  const closeDialogBtn = document.getElementById("closeDialogBtn");
  const dialogOverlay = document.getElementById("dialogOverlay");
  const qrCodeView = document.getElementById("qrCodeView");
  document.querySelector('meta[property="og:url"]').content = location.href;

  const timeout = 500;
  const urlParams = new URLSearchParams(location.search);
  const groupCode = urlParams.get("groupcode");
  const homeURL = "https://katinat.vn/";
  const packageName = "com.sw.katinatkafe";
  const scheme = "katinat";
  const host = "grouporder";
  const params = `groupcode=${groupCode}`;
  const androidStoreLink = `https://play.google.com/store/apps/details?id=${packageName}&referrer=utm_groupcode%3D${groupCode}#Intent;scheme=https;package=com.android.vending;end`;
  const iosStoreLink = `https://apps.apple.com/app/id6462999997`;
  // const deepLinkIntent = `intent://${host}?${params}#Intent;scheme=${scheme};package=${packageName};S.browser_fallback_url=${androidStoreLink}end`;
  const deepLinkIntent = `intent://${host}?${params}#Intent;scheme=${scheme};package=${packageName};end`;
  const deepLink = `${scheme}://${host}?${params}`;
  const os = getMobileOperatingSystem();

  new QRCode(qrCodeView, {
    text: location.href,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  if (os === "Android") {
    location.href = deepLink;
    storeContainer.style.display = "inline-block";
    playButton.style.display = "inline-block";
  }

  if (os === "IOS") {
    location.href = deepLink;
    storeContainer.style.display = "inline-block";
    appleButton.style.display = "inline-block";
  }

  if (os !== "IOS" && os !== "Android") {
    dialogOverlay.style.display = "block";
  }

  appleButton.addEventListener("click", () => {
    location.href = iosStoreLink;
  });

  playButton.addEventListener("click", () => {
    location.href = androidStoreLink;
  });

  closeDialogBtn.addEventListener("click", function () {
    dialogOverlay.style.display = "none";
    location.href = homeURL;
  });

  dialogOverlay.addEventListener("click", function (event) {
    if (event.target === dialogOverlay) {
      dialogOverlay.style.display = "none";
    }
    location.href = homeURL;
  });

  setTimeout(function () {
    if (os === "Android") {
      location.href = deepLinkIntent;
    } else if (os === "IOS") {
      // location.href = iosStoreLink;
    } else {
      //
    }
  }, timeout);
};

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "IOS";
  }

  return "unknown";
}
