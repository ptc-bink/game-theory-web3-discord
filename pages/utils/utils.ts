export const firUppercase = (res: string) => {
  const words = res?.split(' ');
  const capitalizedWords = words?.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  const result = capitalizedWords?.join(' ');

  return result;
}

// export const jsonFileDownload = (json_data: any) => {
export const jsonFileDownload = () => {
  const json_data = {
    name: "Dedar",
    age: "14",
    address: "House #28",
  };
  const fileName = "finename.json";
  const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
  const jsonURL = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.href = jsonURL;
  link.setAttribute("download", fileName);
  link.click();
  document.body.removeChild(link);
};