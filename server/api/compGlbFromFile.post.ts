import { processGlb } from '../utils/gltf'

export default defineEventHandler(async (event) => {
  try {
    const multiForms = await readMultipartFormData(event)
    if (!multiForms || multiForms.length === 0) {
      console.error('No multiForms data')
      throw createError({ statusCode: 400 })
    }
    const dat = multiForms[0].data
    console.log(`Received file, size: ${dat.length} bytes`)

    const compModel = await processGlb(dat, true)
    console.log('Compression successful')

    setResponseHeader(event, 'content-type', 'application/octet-stream')
    setResponseHeader(event, 'Content-Length', compModel.length)
    setResponseHeader(event, 'Content-Disposition', 'attachment; filename=compressed.glb')

    return compModel
  } catch (err: any) {
    console.error('API Error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Internal Server Error'
    })
  }
})
