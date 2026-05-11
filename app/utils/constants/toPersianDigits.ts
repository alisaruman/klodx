export const toPersianDigits = (num: string) => {
  const formattedNum = num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)])
  return formattedNum
}
