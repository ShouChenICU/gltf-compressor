import { processGlb } from '../utils/gltf'

export default defineEventHandler(async (event) => {
  const multiForms = await readMultipartFormData(event)
  if (!multiForms || multiForms.length === 0) {
    throw createError({ statusCode: 400 })
  }
  const dat = multiForms[0].data

  const decompModel = await processGlb(dat, false)

  setResponseHeader(event, 'content-type', 'application/octet-stream')
  setResponseHeader(event, 'Content-Length', decompModel.length)
  setResponseHeader(event, 'Content-Disposition', 'attachment; filename=decompressed.glb')

  return decompModel
})
