export const TransformImage = (image: Buffer) => {
  return (
    `data:image/jpeg;base64,${image}`
  )
}