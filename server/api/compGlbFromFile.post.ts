// @ts-ignore
import gltfpack from "gltfpack";

export default defineEventHandler(async (event) => {
  const multiForms = await readMultipartFormData(event);
  if (!multiForms || multiForms.length === 0) {
    throw createError({ statusCode: 400 });
  }
  const dat = multiForms[0].data;

  const compModel = await new Promise<Uint8Array>(async (resolve, reject) => {
    const iface = {
      read: function () {
        return dat;
      },
      write: function (path: string, data: Uint8Array) {
        resolve(data);
      },
    };

    await gltfpack.pack(["-i", "in.glb", "-o", "out.glb", "-cc"], iface);
  });

  //   console.log(compModel);

  setResponseHeader(event, "content-type", "application/octet-stream");
  setResponseHeader(event, "Content-Length", compModel.length);
  setResponseHeader(
    event,
    "Content-Disposition",
    "attachment; filename=compressed.glb"
  );

  return compModel;
});
