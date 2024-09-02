export const getRandomName = async () => {
  const response = await fetch(`https://api.randomdatatools.ru/?unescaped=false&params=FirstName`)
  const { FirstName } = await response.json()
  return FirstName.toLowerCase()
}