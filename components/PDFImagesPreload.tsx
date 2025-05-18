"use client";

export default function PDFImagesPreload() {
  return (
    <>
      <img
        id="pdf-logo-img"
        src="/logo.PNG"
        style={{ display: "none" }}
        alt="logo"
      />
      <img
        id="pdf-entete-img"
        src="/ENTETE.PNG"
        style={{ display: "none" }}
        alt="entete"
      />
    </>
  );
}
