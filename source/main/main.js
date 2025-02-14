window.onload = function () {
  const timeout = 1000;
  const playButton = document.getElementById("playButton");
  const appleButton = document.getElementById("appleButton");

  const closeDialogBtn = document.getElementById("closeDialogBtn");
  const dialogOverlay = document.getElementById("dialogOverlay");

  const qrCodeView = document.getElementById("qrCodeView");

  const urlParams = new URLSearchParams(window.location.search);
  const groupCode = urlParams.get("groupcode");

  const androidStoreLink = `intent://play.google.com/store/apps/details?id=com.sw.katinatkafe&referrer=utm_groupcode%3D${groupCode}#Intent;scheme=https;package=com.android.vending;end`;
  const androidStoreDesktopLink = `https://play.google.com/store/search?q=katinat&c=apps`;
  const iosStoreLink = `https://apps.apple.com/app/id6462999997`;

  const deepLink = `katinatdev://app?groupcode=${groupCode}`;

  const os = getMobileOperatingSystem();

  var qrcode = new QRCode(qrCodeView, {
    text: window.location.href,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  if (os === "Android") {
    window.location = deepLink;
    document.getElementById("appleButton").style.visibility = "hidden";
    document.getElementById("playButton").style.visibility = "hidden";
  }

  if (os === "ios") {
    document.getElementById("playButton").style.visibility = "hidden";
  }

  if (os !== "ios" && os !== "Android") {
    document.getElementById("appleButton").style.visibility = "hidden";
    document.getElementById("playButton").style.visibility = "hidden";
    dialogOverlay.style.display = "block";
  }

  appleButton.addEventListener("click", () => {
    if (groupCode != null) {
      navigator.clipboard.writeText(groupCode);
    }
    window.location = iosStoreLink;
  });

  playButton.addEventListener("click", () => {
    window.location = androidStoreDesktopLink;
  });

  // Sự kiện khi nhấn đóng dialog
  closeDialogBtn.addEventListener("click", function () {
    dialogOverlay.style.display = "none";
    window.location = "https://katinat.vn/";
  });
  // Đóng dialog khi nhấn ra ngoài khu vực dialog
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
      window.location = deepLink;
    } else {
      // document.body.innerHTML = "<h1>Unsupported device</h1>";
    }
  }, timeout);
};

// Hàm kiểm tra hệ điều hành
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
