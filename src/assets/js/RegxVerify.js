/**
 * @return {boolean}
 */
function RegxVerify(string, type) {
  let reg;
  if (type === "pid") {
    reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  }
  if (type === "name") {
    reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
  }
  if (type === "mobile") {
    reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
  }
  if (type === "postcode") {
    reg = /^[1-9]\d{5}$/g;
  }
  if (type === "email") {
    reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  }
  // 判断并返回
  if (string.length !== 0) {
    if (reg.test(string) === false) {
      return false;
    }
  }
  return true;
}
export { RegxVerify };
