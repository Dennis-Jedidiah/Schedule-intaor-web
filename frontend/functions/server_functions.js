export default async function handleImageUpload(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch("/upload", {
    method: "POST",
    body: formData,
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "schedule.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  return "Schedule downloaded!";
}