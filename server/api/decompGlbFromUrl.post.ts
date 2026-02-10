import { processGlb } from '../utils/gltf'

export default defineEventHandler(async (event) => {
  const form = await readBody(event)
  const url = form?.url
  const filename = form?.filename || 'decompressed'

  if (!url) {
    throw createError({ statusCode: 400 })
  }

  const dat = await $fetch<ArrayBuffer>(form.url, {
    responseType: 'arrayBuffer'
  })

  const decompModel = await processGlb(new Uint8Array(dat), false)

  setResponseHeader(event, 'content-type', 'application/octet-stream')
  setResponseHeader(event, 'Content-Length', decompModel.length)
  setResponseHeader(event, 'Content-Disposition', `attachment; filename=${filename}.glb`)

  return decompModel
})
