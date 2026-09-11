export default async function handleImageUpload(e) {
  e.preventDefault();
  // const fileInput = e.target.file_image.files[0];
  const formData = new FormData(e.target);
  const image = formData.file_image;
  await fetch("/upload", {
    method: "POST",
    body: formData,
  })
}

// export default async function handleImageUpload(e) {
//   console.log("handleImageUpload called");
// }