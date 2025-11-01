   import type { NextConfig } from "next";

   const isProd = process.env.NODE_ENV === "production";
   const repositoryName = "Felis";

   const nextConfig: NextConfig = {
     reactCompiler: true,
     output: "export",
     basePath: isProd ? `/${repositoryName}` : "",
     assetPrefix: isProd ? `/${repositoryName}/` : undefined,
     images: {
       unoptimized: true,
     },
     env: {
       NEXT_PUBLIC_BASE_PATH: isProd ? `/${repositoryName}` : "",
     },
   };

   export default nextConfig;
   ```

3. 保存结果窗格（`Ctrl+S`），然后在合并编辑器顶部点击 “完成 (Done)” 或“标记为已解决”。
4. 这时 `next.config.ts` 会出现在 “更改” 列表而不是 “合并冲突” 里，就可以正常提交了。

如果你现在打算直接把仓库清空重新上传，那 `next.config.ts` 冲突解决完后就可以提交删除，然后把新打包的项目上传。S