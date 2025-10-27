export function showGogoLamp(type = "normal") {
  const lamp = document.getElementById("gogo-lamp");
  lamp.classList.add("on");

  if (type === "rainbow") lamp.classList.add("rainbow");

  setTimeout(() => lamp.classList.remove("on", "rainbow"), 3000);
}
