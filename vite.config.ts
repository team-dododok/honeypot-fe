import * as path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgrPlugin()],
    server: {
      port: 3000,
      proxy: {
        '/nooki': {
          target: 'https://api.nookipedia.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/nooki/, ''),
        },
        '/img': {
          target: 'https://dodo.ac',
          changeOrigin: true,

          rewrite: (path) => path.replace(/^\/img/, ''),
        },
      },
    },
//   server: {
//     port: 3000,
//     proxy: {
//       // S3 버킷에 대한 프록시 설정 추가
//       '/s3-bucket': {
//         target: 'https://dodok-s3-bucket.s3.ap-northeast-2.amazonaws.com',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/s3-bucket/, ''),
//       },
//     },
//   },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});