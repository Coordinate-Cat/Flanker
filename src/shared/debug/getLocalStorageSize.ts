// 本番環境では使用しない
export const getLocalStorageSize = () => {
  let total = 0;
  for (let key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      const value = window.localStorage.getItem(key);
      if (value !== null) {
        // キーと値のペアのサイズを合計
        total += key.length + value.length;
      }
    }
  }
  let totalInKilobytes = total / 1024;
  console.log("現在使用量: " + totalInKilobytes + "KB");
  console.log("残り容量: " + (5120 - totalInKilobytes) + "KB");
  return total;
};
