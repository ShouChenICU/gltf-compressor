// @ts-ignore
import { pack } from "gltfpack";

/**
 * 处理 GLB 模型的高级工具函数
 * @param buffer 输入模型的二进制数据
 * @param compress 是否启用 Meshopt 压缩 (-cc)
 * @returns 处理后的二进制数据
 */
export async function processGlb(
  buffer: Uint8Array,
  compress: boolean = true
): Promise<Uint8Array> {
  return new Promise<Uint8Array>(async (resolve, reject) => {
    try {
      const iface = {
        read: function () {
          return buffer;
        },
        write: function (path: string, data: Uint8Array) {
          resolve(data);
        },
      };

      const args = ["-i", "in.glb", "-o", "out.glb"];
      if (compress) {
        args.push("-cc");
      }

      await pack(args, iface);
    } catch (error) {
      reject(error);
    }
  });
}
