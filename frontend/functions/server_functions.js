export default async function handleImageUpload(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch("/upload", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.server_message;
}