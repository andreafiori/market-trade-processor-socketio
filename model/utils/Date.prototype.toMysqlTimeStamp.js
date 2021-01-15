function twoDigits(d) {
  if (0 <= d && d < 10) return "0" + d.toString();
  if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
  return d.toString();
}

if (!Date.prototype.toMysqlTimeStamp) {
  Date.prototype.toMysqlTimeStamp = function () {
    return this.getUTCFullYear() + "_" + twoDigits(1 + this.getUTCMonth()) + "_" + twoDigits(this.getUTCDate()) + "-" + twoDigits(this.getUTCHours()) + "" + twoDigits(this.getUTCMinutes()) + "" + twoDigits(this.getUTCSeconds());
  };
}